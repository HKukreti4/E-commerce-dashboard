import axios from "axios";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPass] = useState("");
  const navigate = useNavigate();
  useEffect(() => {
    const auth = localStorage.getItem("user");
    if (auth) {
      navigate("/");
    }
  }, []);
  const loginUser = async (e) => {
    e.preventDefault();
    try {
      let result = await axios.post("http://localhost:5000/login", {
        email,
        password,
      });

      if (result.data.auth) {
        localStorage.setItem("user", JSON.stringify(result.data.user));
        localStorage.setItem("token", JSON.stringify(result.data.auth));

        navigate("/");
      } else {
        alert("Enter correct details");
      }
    } catch (error) {
      console.log(error.message);
    }
  };
  return (
    <>
      <form className="form-details" onSubmit={loginUser}>
        <div className="container">
          <h2>Already registered </h2>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter Your email"
            required
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPass(e.target.value)}
            placeholder="Enter Your password"
            required
          />
          <button type="submit" className="btn">
            Login
          </button>
        </div>
      </form>
    </>
  );
};

export default Login;
