import React, { useState, useEffect } from "react";
import { json, useNavigate } from "react-router-dom";
import axios from "axios";
import Footer from "./Footer";
const AddProduct = () => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [company, setCompany] = useState("");
  const [userId, setUserId] = useState("");
  const navigate = useNavigate();

  const submitForm = (e) => {
    e.preventDefault();
    postData();
    setName("");
    setPrice("");
    setCategory("");
    setCompany("");
  };

  const postData = async () => {
    try {
      let result = await axios.post(
        "http://localhost:5000/add-product",

        {
          name,
          price,
          category,
          company,
          userId,
        },
        {
          headers: {
            authorization: `bearer ${JSON.parse(
              localStorage.getItem("token")
            )}`,
          },
        }
      );
      alert("product added sucessfully");
    } catch (error) {
      alert(error.message);
    }
  };
  useEffect(() => {
    let auth = localStorage.getItem("user");
    setUserId(JSON.parse(auth)._id);
  }, []);
  return (
    <>
      <form className="form-details add" onSubmit={submitForm}>
        <div className="container">
          <h2>Add Products</h2>
          <input
            type="text"
            value={name}
            placeholder="Enter product Name"
            onChange={(e) => setName(e.target.value)}
            required
          />
          <input
            type="text"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            placeholder="Enter product price"
            required
          />
          <input
            type="text"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            placeholder="Enter product category"
            required
          />
          <input
            type="text"
            value={company}
            onChange={(e) => setCompany(e.target.value)}
            placeholder="Enter product company"
            required
          />
          <button type="submit" className="btn">
            Add
          </button>
        </div>
      </form>
    </>
  );
};

export default AddProduct;
