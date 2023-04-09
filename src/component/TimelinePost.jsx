import React, { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "./Navbar";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";
import Post from "./Post";
const TimelinePost = () => {
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
        `https://groovybackend-shauryag2002.vercel.app/post/timeline/${localStorage.getItem(
          "userId"
        )}`
      );
      setPost(postdata.data);
    };
    postfunc();
  }, [localStorage.getItem("userId")]);
  const navigate = useNavigate();
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
        // console.log(data.data);
      });
    // return userOne
  };
  const commentHandler = async (id) => {
    const text1 = document.getElementById("text1");
    // console.log(text1.value);
    const comment1 = await axios.put(
      `https://groovybackend-shauryag2002.vercel.app/post/${id}/comment`,
      {
        text: comment,
        postedBy: user._id,
        postedByName: user.username,
      }
    );
    window.location.reload(true);
    // location.reload();
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
  const like2 = async (id) => {
    const like = await axios.post(
      `https://groovybackend-shauryag2002.vercel.app/post/${id}/like`,
      {
        userId: user._id,
      }
    );
  };
  return (
    <>
      <Navbar />
      {post ? (
        <Post />
      ) : (
        post.map((pst, j) => {
          return (
            <div key={pst._id} className="container">
              <div className="center">
                <div className="contain">
                  <Link to={"/profile/" + user.username}>
                    <img
                      src={
                        user.profilePicture
                          ? user.profilePicture
                          : `./images/avatar.jpeg`
                      }
                      alt="avatar"
                      className="image"
                    />{" "}
                    <div>{user.username}</div>
                  </Link>
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
                  <button onClick={() => like2(pst._id)}>
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
                <button id="comments" onClick={() => commentViewer(j)}>
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
                    <button onClick={() => commentHandler(pst._id)}>
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
        })
      )}
    </>
  );
};

export default TimelinePost;
