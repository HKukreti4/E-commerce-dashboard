import axios from "axios";
import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";

const Products = () => {
  const [product, setProduct] = useState([]);
  useEffect(() => {
    getData();
  }, []);
  const getData = async () => {
    let result = await axios.get("http://localhost:5000/products", {
      headers: {
        authorization: `bearer ${JSON.parse(localStorage.getItem("token"))}`,
      },
    });
    let data = await result.data;
    setProduct(data);
  };
  const deleteProducts = async (id) => {
    await axios.delete(`http://localhost:5000/products/${id}`, {
      headers: {
        authorization: `bearer ${JSON.parse(localStorage.getItem("token"))}`,
      },
    });
    getData();
  };
  const searchProduct = async (e) => {
    let key = e.target.value;

    if (key.length > 0) {
      let result = await axios.get(`http://localhost:5000/search/${key}`, {
        headers: {
          authorization: `bearer ${JSON.parse(localStorage.getItem("token"))}`,
        },
      });
      setProduct(result.data);
    } else {
      getData();
    }
  };
  if (product.legth < 0) {
    return <div>No product found</div>;
  }
  return (
    <div className="productspage">
      <div className="searchField">
        <input
          type="text"
          placeholder="serach products"
          onChange={searchProduct}
        />
      </div>

      <div className="container product">
        {product.length > 0 ? (
          product.map((product) => {
            return (
              <div className="card" key={product._id}>
                <div className="cardImage">
                  <img
                    src="https://cdn1.smartprix.com/rx-ioKTQfBn2-w1200-h1200/oKTQfBn2.jpg"
                    alt="product"
                  />
                </div>
                <div className="cardData">
                  <h3>{product.name}</h3>
                  <p>Price:₹ {product.price}</p>
                  <p>Category : {product.category}</p>
                  <p>Company : {product.company}</p>
                </div>
                <div className="btn-group">
                  <button
                    className="btn"
                    onClick={() => deleteProducts(product._id)}
                  >
                    Delete
                  </button>
                  <NavLink
                    className="btn"
                    to={`/update/${product._id}`}
                    style={{ fontSize: "0.7rem" }}
                  >
                    Update
                  </NavLink>
                </div>
              </div>
            );
          })
        ) : (
          <div style={{ textAlign: "center" }}>
            <h2>No result Found</h2>
          </div>
        )}
      </div>
    </div>
  );
};

export default Products;
