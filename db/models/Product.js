import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  name: String,
  price: String,
  category: String,
  company: String,
  userId: String,
});

const Product = mongoose.model("products", productSchema);
export default Product;
