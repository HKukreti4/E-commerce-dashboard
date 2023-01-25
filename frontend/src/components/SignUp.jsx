import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
const SignUp = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPass] = useState("");
  const navigate = useNavigate();
  const submitForm = (e) => {
    e.preventDefault();
    postData();
    setName("");
    setEmail("");
    setPass("");
  };
  useEffect(() => {
    const auth = localStorage.getItem("user");
    if (auth) {
      navigate("/");
    }
  }, []);
  const postData = async () => {
    try {
      let result = await axios.post("http://localhost:5000/register", {
        name,
        email,
        password,
      });

      if (result.data) {
        localStorage.setItem("user", JSON.stringify(result.data.result));
        localStorage.setItem("token", JSON.stringify(result.data.auth));
        navigate("/");
      }
    } catch (error) {
      console.log(error.message);
    }
  };
  return (
    <>
      <form className="form-details" onSubmit={submitForm}>
        <div className="container">
          <h2>Register</h2>
          <input
            type="text"
            value={name}
            placeholder="Enter Your Name"
            onChange={(e) => setName(e.target.value)}
            required
          />
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
            Sign Up
          </button>
        </div>
      </form>
    </>
  );
};

export default SignUp;
