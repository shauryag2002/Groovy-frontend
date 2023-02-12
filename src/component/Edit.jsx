import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router";

const Edit = () => {
  const [user, setUser] = useState("");
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState(localStorage.getItem("password"));
  const [propic, setPropic] = useState("");
  const [desc, setDesc] = useState("");
  const [city, setCity] = useState("");
  const [rela, setRela] = useState("");
  useEffect(() => {
    const userDetails = async () => {
      const user1 = await axios.post(
        "https://groovybackend-shauryag2002.vercel.app/auth/login",
        {
          email: localStorage.getItem("email"),
          password: localStorage.getItem("password"),
        }
      );
      setUser(user1.data);
      setName(user1.data.name);
      setUsername(user1.data.username);
      setEmail(user1.data.email);
      setPropic(user1.data.profilePicture);
      setDesc(user1.data.desc);
      setCity(user1.data.city);
      //   setPassword(user1.data.password);
    };
    userDetails();
  }, []);
  const params = useParams();
  const UpdateUser = async () => {
    const update = await axios.put(
      "https://groovybackend-shauryag2002.vercel.app/user/" + params.id,
      {
        userId: params.userId,
        name,
        email,
        password,
        city,
        desc,
        relationship: rela,
        username,
        profilePicture: propic,
      }
    );
  };
  return (
    <div>
      <label htmlFor="name">Name:</label>
      <input
        className="inp"
        type="text"
        placeholder="Name"
        value={name}
        id="name"
        onChange={(e) => {
          setName(e.target.value);
        }}
      />
      <br />
      <label htmlFor="username">Username:</label>
      <input
        className="inp"
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => {
          setUsername(e.target.value);
        }}
        id="username"
      />
      <br />
      <label htmlFor="email">Email:</label>
      <input
        className="inp"
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => {
          setEmail(e.target.value);
        }}
        id="email"
      />
      <br />
      <label htmlFor="password">Password:</label>
      <input
        className="inp"
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => {
          setPassword(e.target.value);
        }}
        id="password"
      />
      <br />
      <label htmlFor="profilePicture">Profile Picture:</label>
      <input
        className="inp"
        type="text"
        placeholder="ProfilePicture"
        value={propic}
        onChange={(e) => {
          setPropic(e.target.value);
        }}
        id="profilePicture"
      />
      <br />
      <label htmlFor="desc">Description:</label>
      <input
        className="inp"
        type="text"
        placeholder="Description"
        value={desc}
        onChange={(e) => {
          setDesc(e.target.value);
        }}
        id="desc"
      />
      <br />
      <label htmlFor="city">City:</label>
      <input
        className="inp"
        type="text"
        placeholder="City"
        value={city}
        onChange={(e) => {
          setCity(e.target.value);
        }}
        id="city"
      />
      <br />
      <label htmlFor="relationship">Relationship:</label>
      <input
        className="inp"
        type="number"
        placeholder="Relationship"
        value={rela}
        onChange={(e) => {
          setRela(e.target.value);
        }}
        id="relationship"
      />
      <br />
      <button onClick={UpdateUser} className="edit">
        Edit User
      </button>
    </div>
  );
};

export default Edit;
