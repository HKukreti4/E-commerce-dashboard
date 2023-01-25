import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
const UpdateProducts = () => {
  const params = useParams();
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [company, setCompany] = useState("");
  const navigate = useNavigate();
  const { id } = params;
  useEffect(() => {
    getData();
  }, []);
  const getData = async () => {
    let result = await axios.get(`http://localhost:5000/products/${id}`, {
      headers: {
        authorization: `bearer ${JSON.parse(localStorage.getItem("token"))}`,
      },
    });
    let product = await result.data[0];
    setName(product.name);
    setPrice(product.price);
    setCategory(product.category);
    setCompany(product.company);
  };
  const updateProduct = async (e) => {
    e.preventDefault();
    try {
      let result = await axios.put(
        `http://localhost:5000/products/${id}`,
        {
          name,
          price,
          category,
          company,
        },
        {
          headers: {
            authorization: `bearer ${JSON.parse(
              localStorage.getItem("token")
            )}`,
          },
        }
      );
      navigate("/");
    } catch (error) {
      alert(error.message);
    }
  };
  return (
    <>
      <form className="form-details update" onSubmit={updateProduct}>
        <div className="container">
          <h2>Update Products</h2>
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
            Update
          </button>
        </div>
      </form>
    </>
  );
};

export default UpdateProducts;
