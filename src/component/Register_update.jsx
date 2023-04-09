import React, { useState } from "react";
import "./register_update1.css";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
const Register_update = () => {
  const navigate = useNavigate();
  const [image, setImage] = useState(null);
  const registerHandler = async () => {
    const email = document.getElementById("email");
    const name = document.getElementById("name");
    const password = document.getElementById("password");
    const username = document.getElementById("username");
    const profilePicture = document.getElementById("profilePicture");
    const desc = document.getElementById("desc");
    const city = document.getElementById("city");
    const relationship = document.getElementById("relationship");
    const formData = new FormData();
    formData.append("file", image);
    formData.append("upload_preset", "zj2wibx6");
    await axios
      .post("https://api.cloudinary.com/v1_1/dxh9yv3mp/image/upload", formData)
      .then(async (res) => {
        const user = await axios.post(
          "https://groovybackend-shauryag2002.vercel.app/auth/register",
          {
            name: name.value,
            username: username.value,
            email: email.value,
            password: password.value,
            profilePicture: res.data.url,
            desc: desc.value,
            city: city.value,
            relationship: 1,
          }
        );
        if (user.data.error) {
          setError(user.data.error);
        }
      });
    navigate("/login");
  };
  const [error, setError] = useState("");

  const handleImageChange = (e) => {
    const selectedImage = e.target.files[0];
    setImage(selectedImage);
  };
  return (
    <div className="sign1up">
      <div className="logo1">
        {/* <img src="/images/Groovy_logo.png" alt="Groovy logo" className="logo_image" /> */}
        <div>Groovy</div>
      </div>
      <div className="main">
        <div className="signup_form_left">
          <div className="signup">
            <div className="signup_main">Sign up to Groovy</div>
            <div className="signup_form_main">
              <div className="name">
                <div className="name_text">Name</div>
                <input
                  type="text"
                  id="name"
                  placeholder="Enter your name"
                  className="inp"
                />
              </div>
              <div className="username">
                <div className="username_text">User name</div>
                <input
                  type="text"
                  id="username"
                  placeholder="Enter your user name"
                  className="inp"
                />
              </div>
              <div className="email">
                <div className="email_text">Email</div>
                <input
                  type="email"
                  id="email"
                  placeholder="Enter your email"
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
              {/* <div className="profile_pic">
              <div className="profile_text">Profile Picture</div>
              <input
              type="file"
              id="file"
              placeholder="Enter your profile picture"
              className="inp"
              accept="image/*"
              />
            </div> */}
              <div className="choose-image">
                <div className="profile_text">Profile Picture</div>
                <input
                  id="profilePicture"
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="choose-image-input"
                />
              </div>
              <div className="desc">
                <div className="desc_text">Description</div>
                <input
                  type="text"
                  id="desc"
                  placeholder="Enter Description"
                  className="inp"
                />
              </div>
              <div className="city">
                <div className="city_text">City</div>
                <input
                  type="text"
                  id="city"
                  placeholder="Enter your city"
                  className="inp"
                />
              </div>
              <button onClick={registerHandler} className="signup_button btn">
                <div className="signup_text btn">Register</div>
              </button>
            </div>
            <div className="register">
              have an Account ?{" "}
              <Link to="/login" className="register_text">
                Login
              </Link>
            </div>
          </div>
          {error && <h1>{error}</h1>}
        </div>
        <img
          src="/images/logo_image.png"
          alt="signup image"
          className="signup_image"
        />
      </div>
    </div>
  );
};

export default Register_update;
