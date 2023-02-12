import React from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
const Login = () => {
  const navigate = useNavigate();
  const submitHandler = async () => {
    const email = document.getElementById("email");
    const password = document.getElementById("password");
    const user = await axios.post(
      "https://groovybackend-shauryag2002.vercel.app/auth/login",
      {
        email: email.value,
        password: password.value,
      }
    );
    if (user.data.error) {
    } else {
      localStorage.setItem("email", email.value);
      localStorage.setItem("password", password.value);
      localStorage.setItem("username", user.data.username);
      localStorage.setItem("userId", user.data._id);
      navigate("/");
    }
  };
  return (
    <div>
      <label htmlFor="email">Email:</label>
      <input className="inp" type="email" id="email" placeholder="Email" />
      <br />
      <label htmlFor="password">Password:</label>
      <input
        className="inp"
        type="password"
        id="password"
        placeholder="Password"
      />
      <br />
      <button onClick={submitHandler} className="edit">
        Login
      </button>
      <Link to={"/register"}>Don't have an account? Register</Link>
    </div>
  );
};

export default Login;
