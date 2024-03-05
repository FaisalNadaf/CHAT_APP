import User from "../models/userModel.js";

export const getUsersForSideBar = async (req, res) => {
  try {
    const loggedUserId = req.user._id;

    const filteredUsesr = await User.find({
      _id: { $ne: loggedUserId },
    }).select("-password");

    res.status(201).json(filteredUsesr);
  } catch (error) {
    console.log("Error in getUsersForSideBar conntroler", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};
