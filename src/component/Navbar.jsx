import React, { useState, useEffect } from "react";
import "./navbar.css";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
export default function Navbar() {
  const [search, setSearch] = useState("");
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
  const navigate = useNavigate();

  useEffect(() => {
    if (!localStorage.getItem("email") || !localStorage.getItem("password")) {
      // history.push("/login");
      navigate("/login");
    } else {
      login();
    }
  }, []);
  const [val, setVal] = useState([]);
  const [follow, setFollow] = useState(true);
  const [fllw, setFllw] = useState("FOLLOW");
  const follow2 = async (id, i) => {
    const flw = await axios.put(
      `https://groovybackend-shauryag2002.vercel.app/user/${id}/follow`,
      {
        userId: localStorage.getItem("userId"),
      }
    );
    const followBtn = document.getElementById("followBtn" + i);
    if (followBtn.innerText == "FOLLOW") {
      followBtn.className = "unfollow";
      followBtn.innerText = "UNFOLLOW";
    } else {
      followBtn.className = "follow";
      followBtn.innerText = "FOLLOW";
    }
    // if (flw.data.message) {
    //   setFllw("UNFOLLOW");
    //   setFollow(true);
    // } else {
    //   setFllw("FOLLOW");
    //   setFollow(false);
    // }
  };
  useEffect(() => {
    const searchval = async () => {
      const searchhy = await axios.get(
        "https://groovybackend-shauryag2002.vercel.app/user/" +
          localStorage.getItem("userId") +
          "/name?name=" +
          search
      );
      setVal(searchhy.data);
      for (let i = 0; i < searchhy.data.length; i++) {
        const element = searchhy.data[i];

        const user = await axios.post(
          "https://groovybackend-shauryag2002.vercel.app/user/" +
            element._id +
            "/setfollow",
          { userId: localStorage.getItem("userId") }
        );
        const followBtn = document.getElementById("followBtn" + i);
        if (element._id == localStorage.getItem("userId")) {
          // followBtn.innerText = "";
          followBtn.style.visibility = "hidden";
        } else {
          if (user.data.message) {
            // console.log(usrfollower.data.message);
            followBtn.innerHTML = "UNFOLLOW";
            followBtn.className = "unfollow";
          } else {
            // console.log(usrfollower.data.message);
            followBtn.innerHTML = "FOLLOW";
            followBtn.className = "follow";
          }
        }
      }
    };
    const searching = async () => {};
    searchval();
  }, [search]);
  return (
    <>
      <nav>
        <ul>
          <div className="right">
            <li>
              <Link className="text-link" to="/">
                {" "}
                Groovy
              </Link>
            </li>
          </div>
          <div className="middle">
            <li>
              <input
                className="input inputt"
                type="text"
                placeholder="Search for friend,post or video"
                onChange={(e) => {
                  setSearch(e.target.value);
                }}
                value={search}
              />
              <button
                className="edit"
                onClick={() => {
                  setSearch("");
                }}
              >
                X
              </button>
            </li>
          </div>
          <div className="left">
            <li>
              <Link to={"/addpost"} className="text-link">
                add Post
              </Link>
            </li>
            <li className="containery">
              <Link className="text-link" to={`/profile/${user.username}`}>
                <img
                  className="image"
                  src={
                    user.profilePicture
                      ? user.profilePicture
                      : "/images/avatar.jpeg"
                  }
                  alt="user image"
                />
              </Link>
              <a className="text-link" href={"/profile/" + user.username}>
                {user.name}
              </a>
            </li>
            <li>
              <button
                className="text-link btn"
                onClick={() => {
                  localStorage.clear();
                  window.location.reload();
                }}
              >
                LOGOUT
              </button>
            </li>
          </div>
        </ul>
      </nav>
      <div className="float">
        {search &&
          val.map((usr, i) => {
            return (
              <div key={i} className="container space-between">
                <img
                  src={
                    usr.profilePicture
                      ? usr.profilePicture
                      : "/images/avatar.jpeg"
                  }
                  alt="userImg"
                  className="image"
                />
                <div>
                  <a href={"/profile/" + usr.username}>{usr.name}</a>
                  <br /> <a href={"/profile/" + usr.username}>{usr.username}</a>
                </div>
                <button
                  className={`follow`}
                  id={`followBtn${i}`}
                  onClick={() => {
                    follow2(usr._id, i);
                  }}
                >
                  FOLLOW
                </button>
              </div>
            );
          })}
      </div>
    </>
  );
}
