import mongoose from "mongoose";

const connectDb = async () => {
  // await mongoose.connect(process.env.URI);
  await mongoose.connect("mongodb://localhost:27017/e_comm_dashboard");

  console.log("Database Connected sucessfully");
};

export default connectDb;
