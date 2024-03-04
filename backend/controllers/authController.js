import bcrypt from "bcryptjs";
import User from "../models/userModel.js";
import generateTokenAndCookie from "../utils/generateToken.js";

export const signup = async (req, res) => {
  try {
    const { fullName, username, password, confirmPassword, gender } = req.body;

    if (!username) {
      return res.status(400).json({ error: "Username is required" });
    }

    if (password !== confirmPassword) {
      return res.status(400).json({ error: "Password don't match" });
    }

    // Check if the username already exists
    const existingUser = await User.findOne({ username });

    if (existingUser) {
      return res.status(400).json({ error: "Username already exists" });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10); // Increased rounds for better security
    const hashPassword = await bcrypt.hash(password, salt);

    // Avatar placeholder
    const boyProfilePic = `https://avatar.iran.liara.run/public/boy?username=${username}`;
    const girlProfilePic = `https://avatar.iran.liara.run/public/girl?username=${username}`;

    // Create a new user instance
    const newUser = new User({
      fullName,
      username,
      password: hashPassword,
      gender,
      profilePic: gender === "male" ? boyProfilePic : girlProfilePic,
    });

    // Save the new user
    if (newUser) {
      await newUser.save();
      generateTokenAndCookie(newUser._id, res);

      res.status(201).json({
        _id: newUser._id,
        fullName: newUser.fullName,
        username: newUser.username,
        profilePic: newUser.profilePic,
      });

      console.log("signup successful");
    }
  } catch (error) {
    console.error("Error in signup controller: ", error);
    res.status(500).json({ error: "Server Error" });
  }
};

export const login = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    const isPasswordCorrect = await bcrypt.compare(
      password,
      user.password || ""
    );
    if (!user || !isPasswordCorrect) {
      return res.status(401).json({ error: "Invalid username or password" });
    }
    generateTokenAndCookie(user._id, res);

    res.status(200).json({
      _id: user._id,
      fullName: user.fullName,
      username: user.username,
      profilePic: user.profilePic,
    });
  } catch (error) {
    console.error("Error in login controller: ", error);
    res.status(500).json({ error: "Server Error" });
  }
};

export const logout = (req, res) => {
  try {
    res.cookie("jwt", "", { maxAge: 0 });
    res.status(200).json({ message: "logout successfull" });
  } catch (error) {
    console.error("Error in loguot controller: ", error);
    res.status(500).json({ error: "Server Error" });
  }
};
