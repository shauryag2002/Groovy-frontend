import axios from "axios";
import React, { useState } from "react";
import { Link } from "react-router-dom";
// import {useHistory}
const Register = () => {
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
        console.log(res.data.url);
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
  };
  const [error, setError] = useState("");
  const [user1, setUser] = useState("");
  return (
    <div>
      <label htmlFor="name">Name:</label>
      <input className="inp" type="text" id="name" placeholder="Name" />
      <br />
      <label htmlFor="username">Username:</label>
      <input className="inp" type="text" id="username" placeholder="Username" />
      <br />
      <label htmlFor="email">Email:</label>
      <input className="inp" type="email" id="email" placeholder="email" />
      <br />
      <label htmlFor="password">Password:</label>
      <input
        className="inp"
        type="password"
        id="password"
        placeholder="password"
      />
      <br />
      <label htmlFor="profilePicture">Profile Picture:</label>
      <input
        className="inp"
        type="file"
        id="profilePicture"
        placeholder="Profile picture"
        onChange={(event) => {
          const file = event.target.files[0];
          setImage(file);
          // console.log(file);
        }}
        accept="image/*"
      />
      <br />
      <label htmlFor="desc">Description:</label>
      <input className="inp" type="text" id="desc" placeholder="description" />
      <br />
      <label htmlFor="city">City:</label>
      <input className="inp" type="text" id="city" placeholder="city" />
      <br />
      <label htmlFor="relationship">Relationship:</label>
      <input
        className="inp"
        type="number"
        id="relationship"
        placeholder="relationship"
      />
      <br />
      <button onClick={registerHandler} className="edit">
        Register
      </button>
      <Link to="/login">Have an account? Login</Link>
      {error && <h1>{error}</h1>}
    </div>
  );
};

export default Register;
