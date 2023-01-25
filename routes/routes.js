import express from "express";
import {
  registerUser,
  homePage,
  loginUser,
  addProduct,
  getProducts,
  deleteProducts,
  getSingleProduct,
  updateProduct,
  searchProductApi,
  verifyToken,
} from "./controllers/userController.js";
const route = express.Router();

route.get("/", homePage);
route.post("/register", registerUser);
route.post("/login", loginUser);
route.post("/add-product", verifyToken, addProduct);

route.get("/products", verifyToken, getProducts);
route.delete("/products/:id", verifyToken, deleteProducts);
route.get("/products/:id", verifyToken, getSingleProduct);
route.put("/products/:id", verifyToken, updateProduct);
route.get("/search/:key", verifyToken, searchProductApi);

export default route;
