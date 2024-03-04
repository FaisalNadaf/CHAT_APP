import mongoose from "mongoose";

const conversionSchema = new mongoose.Schema(
  {
    participants: [
      {
        type: mongoose.Schema.Types.ObjectId,
        red: "User",
      },
    ],
    message: [
      {
        type: mongoose.Schema.Types.ObjectId,
        red: "Message",
        default: [],
      },
    ],
  },
  { timestamps: true }
);

const Consersation = mongoose.model("Conversation", conversionSchema);

export default Consersation;