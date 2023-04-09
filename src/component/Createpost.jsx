import React, { useState, useEffect } from "react";
import Navbar from "./Navbar";
import axios from "axios";
// import { axios } from 'axios';
import { useNavigate } from "react-router";
const Createpost = () => {
  const navigate = useNavigate();
  const [image, setImage] = useState(null);
  useEffect(() => {
    if (!localStorage.getItem("email") || !localStorage.getItem("password")) {
      // history.push("/login");
      navigate("/login");
    } else {
      login();
    }
  }, []);
  const [user, setUser] = useState("");
  const login = async () => {
    // localStorage.getItem("email");
    // localStorage.getItem("password");
    // if()

    const userOne = await axios
      .post("https://groovybackend-shauryag2002.vercel.app/auth/login", {
        email: localStorage.getItem("email"),
        password: localStorage.getItem("password"),
      })
      .then((data) => {
        setUser(data.data);
        // console.log(data);
      });
    // return userOne
  };
  const createPost = async () => {
    const formData = new FormData();
    formData.append("file", image);
    formData.append("upload_preset", "zj2wibx6");
    await axios
      .post("https://api.cloudinary.com/v1_1/dxh9yv3mp/image/upload", formData)
      .then(async (res) => {
        console.log(res.data.url);
        const img = document.getElementById("img");
        const desc = document.getElementById("desc");
        const create = await axios.post(
          "https://groovybackend-shauryag2002.vercel.app/post/",
          {
            userId: user._id,
            img: res.data.url,
            desc: desc.value,
          }
        );
      });
    navigate("/");
  };
  const handleImageChange = (e) => {
    const selectedImage = e.target.files[0];
    setImage(selectedImage);
  };
  return (
    <div>
      <Navbar />
      {/* Createpost */}
      <h1 style={{ marginBottom: "20px" }}>Create Post</h1>
      <span>Image:</span>
      <input
        style={{ marginBottom: "20px" }}
        type="file"
        id="img"
        accept="image/*"
        placeholder="Image"
        onChange={handleImageChange}
        className="input inputt"
      />
      <br />
      <span>Description:</span>
      <input
        type="text"
        id="desc"
        placeholder="Description"
        className="input inputt"
      />
      <br />
      <button onClick={createPost}>Create Post</button>
    </div>
  );
};

export default Createpost;
