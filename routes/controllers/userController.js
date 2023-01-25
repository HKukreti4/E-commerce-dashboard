import Users from "../../db/models/User.js";
import Product from "../../db/models/Product.js";
import Jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();
// const jwtkey = "ecomm";
const jwtkey = process.env.KEY;

export const homePage = (req, resp) => {
  resp.send("api in progress");
};
export const registerUser = async (req, resp) => {
  let user = new Users(req.body);

  let result = await user.save();
  // we do not send password in the response to remove it
  result = result.toObject();
  delete result.password;
  if (result) {
    Jwt.sign({ result }, jwtkey, { expiresIn: "2h" }, (err, token) => {
      if (err) {
        resp.send("something went wrong");
      }
      resp.send({ result, auth: token });
    });
  } else {
    resp.send({ result: "no user found" });
  }
};
export const loginUser = async (req, resp) => {
  let user = await Users.findOne(req.body).select("-password");
  if (req.body.email && req.body.password) {
    if (user) {
      Jwt.sign({ user }, jwtkey, { expiresIn: "2h" }, (err, token) => {
        if (err) {
          resp.send("something went wrong");
        }
        resp.send({ user, auth: token });
      });
    } else {
      resp.send({ result: "no user found" });
    }
  } else {
    resp.send({ result: "no user found" });
  }
};

export const addProduct = async (req, resp) => {
  let product = await new Product(req.body);
  let result = await product.save();
  resp.send(result);
};
export const getProducts = async (req, resp) => {
  let products = await Product.find();
  resp.send(products);
};
export const deleteProducts = async (req, resp) => {
  let result = await Product.deleteOne({ _id: req.params.id });
  resp.send(result);
};
export const updateProducts = async (req, resp) => {
  let result = await Product.updateOne({ _id: req.params.id });
  resp.send(result);
};

export const getSingleProduct = async (req, resp) => {
  let result = await Product.find({ _id: req.params.id });
  resp.send(result);
};
export const updateProduct = async (req, resp) => {
  let result = await Product.updateOne(
    { _id: req.params.id },
    {
      $set: req.body,
    }
  );
  resp.send(result);
};
export const searchProductApi = async (req, resp) => {
  let result = await Product.find({
    $or: [
      { name: { $regex: req.params.key } },
      { price: { $regex: req.params.key } },
      { company: { $regex: req.params.key } },
      { category: { $regex: req.params.key } },
    ],
  });
  resp.send(result);
};

// to verify token we use middle ware

export function verifyToken(req, resp, next) {
  let token = req.headers["authorization"];
  if (token) {
    token = token.split(" ")[1];

    // to verify token
    Jwt.verify(token, jwtkey, (err, valid) => {
      if (err) {
        resp.status(401).send({ resukt: "please provide valid token " });
      } else {
        next();
      }
    });
  } else {
    resp.status(403).send("please send token with header");
  }
}
