import mongoose from "mongoose";

const mongoConnect = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("DB CONNECTED");
  } catch (error) {
    console.log("error connecting to mongo ", error.message);
  }
};

export default mongoConnect;
