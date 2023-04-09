import React, { useEffect, useState } from "react";
import "./post.css";
import Navbar from "./Navbar";
import "./allstyle.css";
import axios from "axios";

import { Link, useNavigate } from "react-router-dom";

const Post = () => {
  const [post, setPost] = useState([]);
  useEffect(() => {
    if (!localStorage.getItem("email") || !localStorage.getItem("password")) {
      // history.push("/login");
      navigate("/login");
    } else {
      login();
    }
    const postfunc = async () => {
      const postdata = await axios.get(
        `https://groovybackend-shauryag2002.vercel.app/post/`
      );
      setPost(postdata.data);

      // console.log(postdata.data);
      // setLikescount(postdata.data[0].likes.length);
    };
    postfunc();
    // allpost();
  }, [localStorage.getItem("username")]);
  const navigate = useNavigate();
  const [likescount, setLikescount] = useState("");
  const [user, setUser] = useState("");
  const login = async () => {
    const userOne = await axios.post(
      "https://groovybackend-shauryag2002.vercel.app/auth/login",
      {
        email: localStorage.getItem("email"),
        password: localStorage.getItem("password"),
      }
    );
    setUser(userOne.data);
    // return userOne
  };
  const commentHandler = async (id) => {
    const text1 = document.getElementById("text1");
    console.log(text1.value);
    const comment1 = await axios.put(
      `https://groovybackend-shauryag2002.vercel.app/post/${id}/comment`,
      {
        text: comment,
        postedBy: user._id,
        postedByName: user.username,
      }
    );
    window.location.reload(true);
  };
  const [comment, setComment] = useState("");
  const commentViewer = (j) => {
    const commentView = document.getElementById("commentView" + j);
    if (commentView.style.display == "block") {
      commentView.style.display = "none";
    } else {
      commentView.style.display = "block";
    }
  };
  const [like, setLike] = useState(0);
  const like2 = async (id) => {
    const like = await axios.post(
      `https://groovybackend-shauryag2002.vercel.app/post/${id}/like`,
      {
        userId: user._id,
      }
    );
    setLikescount(like.data.likes.length);
  };
  const [count, setCount] = useState(0);
  const UsernameHandler = async (id, j, un) => {
    const username1 = await axios.get(
      "https://groovybackend-shauryag2002.vercel.app/user?userId=" + id
    );
    const username = document.getElementById("username" + j);
    username.innerText = `${username1.data.username}`;
    const userImg = document.getElementById("userImg" + j);
    const userLink = document.getElementById("userLink" + j);
    if (username1.data) {
      userLink.setAttribute("href", `/profile/${username1.data.username}`);
      userImg.setAttribute("src", username1.data.profilePicture);
    } else {
      userLink.setAttribute("href", `/profile/${un}`);
    }
    // console.log(username.innerText);
  };
  return (
    <>
      {/* <Navbar /> */}
      {post.map((pst, j) => {
        return (
          <div key={pst._id} className="container">
            <div className="center">
              <div className="contain">
                <a className="containery Link" id={`userLink${j}`}>
                  <img
                    src={
                      user.profilePicture
                        ? user.profilePicture
                        : `data:image/jpeg;base64,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`
                    }
                    alt="avatar"
                    className="image"
                    id={`userImg${j}`}
                  />{" "}
                  <button
                    onClick={UsernameHandler(pst.userId, j, user.username)}
                    id={`username${j}`}
                    className="btn"
                  >
                    {user.username}
                  </button>
                </a>
                {/* <div></div> */}
              </div>
              <hr />
              <img
                src={
                  pst.img
                    ? pst.img
                    : "https://th.bing.com/th/id/OIP.Vz_6pTV6G5E7dKVvISpSEwHaEo?w=313&h=195&c=7&r=0&o=5&dpr=1.3&pid=1.7"
                }
                alt="img"
                className="img"
              />
              <div className="desc">{pst.desc}</div>
              <hr />
              <div className="contain">
                <button onClick={() => like2(pst._id)} className="btn">
                  <img
                    id="like"
                    src="https://th.bing.com/th?id=OIP.wDqu7y-LdcrW-Gr5-RaTbQHaHa&w=250&h=250&c=8&rs=1&qlt=90&o=6&dpr=1.3&pid=3.1&rm=2"
                    alt="like"
                    className="image"
                  />{" "}
                </button>
                <div>{pst.likes.length} likes</div>
              </div>
              <br />
              <button
                id="comments"
                className="btn"
                onClick={() => commentViewer(j)}
              >
                {pst.comments.length} comments
              </button>
              <div className="commenter">
                <div id={`commentView${j}`} style={{ display: "none" }}>
                  <input
                    type="text"
                    className="comment"
                    placeholder="Comment on this post"
                    id="text1"
                    value={comment}
                    onChange={(e) => {
                      setComment(e.target.value);
                    }}
                  />
                  <button
                    className="btn"
                    onClick={() => commentHandler(pst._id)}
                  >
                    Comment
                  </button>
                  {pst.comments.map((comment, i) => {
                    return (
                      <div key={i}>
                        <b>{comment.postedByName}</b> {comment.text}
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        );
      })}
      {/* <div className="container">
        <div className="center">
          <div className="contain">
            <img
              src="data:image/jpeg;base64,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"
              alt="avatar"
              className="image"
            />{" "}
            <div>John doe</div>
          </div>
          <hr />
          <img
            src="https://th.bing.com/th/id/OIP.Vz_6pTV6G5E7dKVvISpSEwHaEo?w=313&h=195&c=7&r=0&o=5&dpr=1.3&pid=1.7"
            alt="img"
            className="img"
          />
          <hr />
          <div className="contain">
            <img
              src="https://th.bing.com/th?id=OIP.wDqu7y-LdcrW-Gr5-RaTbQHaHa&w=250&h=250&c=8&rs=1&qlt=90&o=6&dpr=1.3&pid=3.1&rm=2"
              alt="like"
              className="image"
            />{" "}
            <div>like</div>
          </div>
          <br />9 comments
        </div> */}
      {/* </div> */}
    </>
  );
};

export default Post;
