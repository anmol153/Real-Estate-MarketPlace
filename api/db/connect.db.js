import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();
console.log(process.env.MONGO_URL);
const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URL);
    return conn;
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
}
export default connectDB;