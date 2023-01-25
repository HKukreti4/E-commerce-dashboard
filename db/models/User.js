import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
});

const Users = mongoose.model("users", userSchema);
export default Users;
