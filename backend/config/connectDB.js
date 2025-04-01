import mongoose from "mongoose";

const connectDB = async () => {
  mongoose
    .connect(process.env.MONGO_URI)
    .then(() => console.log("MongoDB Connected"))
    .catch((err) => console.log("MongoDB Connected error: ", err));
}

export default connectDB;
