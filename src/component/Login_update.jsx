import React from "react";
import "./Login_update1.css";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
const Login_update = () => {
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
    <div className="login">
      <div className="logo1">
        {/* <img src="/images/Groovy_logo.png" alt="Groovy logo" className="logo_image" /> */}
        <div>Groovy</div>
      </div>
      <div className="main">
        <div className="login_form_left">
          <div className="signin">
            <div className="signin_main">Sign in to Groovy</div>
            <div className="login_form_main">
              <div className="username">
                <div className="username_text">Email</div>
                <input
                  type="email"
                  id="email"
                  placeholder="Enter your Email"
                  className="inp"
                />
              </div>
              <div className="password">
                <div className="password_text">Password</div>
                <input
                  type="password"
                  placeholder="Enter your Password"
                  id="password"
                  className="inp"
                />
              </div>
              <div className="remember">
                <div className="rememberWrapper">
                  <input type="checkbox" id="check" className="check" />
                  <label htmlFor="check" className="remember_text">
                    Remember me
                  </label>
                </div>
                <span className="forget">Forgot Password ?</span>
              </div>
              <button onClick={submitHandler} className="login_button btn">
                <div className="login_text btn">Login</div>
              </button>
            </div>
            <div className="register">
              Don’t have an Account ?{" "}
              <Link to={"/register"} className="register_text">
                Register
              </Link>
            </div>
          </div>
        </div>
        <img
          src="/images/logo_image.png"
          alt="Login image"
          className="login_image"
        />
      </div>
    </div>
  );
};

export default Login_update;
