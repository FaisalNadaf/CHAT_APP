import bcrypt from "bcryptjs"
import User from "../models/userModel.js";
export const signup = async (req, res) => {
  try {
    const { fullName, username, password, confirmPassword, gender } = req.body;
    if (password !== confirmPassword) {
      return res.status(400).json({ error: "Password don't match" });
    }

    const user = await User.findOne({ username });

    if (user) {
      return res.status(400).json({ error: "Username alredy exists" });
    }
    //hash password

    const salt =await bcrypt.genSalt(5);
    const hashPassword=await bcrypt.hash(password,salt);
    //avator place holder

    const boyProfilePic = `https://avatar.iran.liara.run/public/boy?username=${username}`;
    const girlProfilePic =  `https://avatar.iran.liara.run/public/girl?username=${username}`;

    const newUser = new User({
      fullName,
      username,
      password:hashPassword,
      gender,
      profilePic: gender === "male" ? boyProfilePic : girlProfilePic,
    });

    await newUser.save();

    res.status(201).json({
      _id: newUser._id,
      fullName: newUser.fullName,
      username: newUser.username,
      profilePic: newUser.profilePic,
    });
    console.log("sinup");
  } catch (error) {
    console.log("error in signup controller ",error.message);
    res.status(500).json({ error: "Server Error" });
  }

};

export const login = (req, res) => {
  console.log("login");
};

export const logout = (req, res) => {
  console.log("logout");
};
