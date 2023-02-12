import React, { useState, useEffect } from "react";
import Navbar from "./Navbar";
import axios from "axios";
// import { axios } from 'axios';
import { useNavigate } from "react-router";
const Createpost = () => {
  const navigate = useNavigate();
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
    const img = document.getElementById("img");
    const desc = document.getElementById("desc");
    const create = await axios.post(
      "https://groovybackend-shauryag2002.vercel.app/post/",
      {
        userId: user._id,
        img: img.value,
        desc: desc.value,
      }
    );
  };
  return (
    <div>
      <Navbar />
      {/* Createpost */}
      <input type="text" id="img" placeholder="Image" />
      <input type="text" id="desc" placeholder="Description" />
      <button onClick={createPost}>Create Post</button>
    </div>
  );
};

export default Createpost;
