import React, { useState, useEffect } from "react";
import { useParams } from "react-router";
import Navbar from "./Navbar";
import "./profile.css";
import { Link } from "react-router-dom";
import axios from "axios";
import Popup from "./Popup";
import Popup_following from "./Popup_following";
const Profile = () => {
  const params = useParams();
  const [user, setUser] = useState("");
  const [following, setFollowing] = useState(0);
  const [follower, setFollower] = useState(0);
  const [postty, setPostty] = useState([]);

  const userDetails = async () => {
    const user1 = await axios.get(
      "https://groovybackend-shauryag2002.vercel.app/user?username=" +
        params.username
    );
    setUser(user1.data);
    setFollower(user1.data.followers.length);
    setFollowing(user1.data.followings.length);
    const followee = await axios.post(
      `https://groovybackend-shauryag2002.vercel.app/user/${user1.data._id}/setfollow`,
      {
        userId: localStorage.getItem("userId"),
      }
    );
    const followBtn = document.getElementById("followBtn");
    let a = 0;
    console.log(followee.data);
    if (followee.data.user.followers) {
      a = followee.data.user.followers.length;
    } else {
      a = 0;
    }
    for (let i = 0; i < a; i++) {
      const element = followee.data.user.followers[i];
      if (element.userId == localStorage.getItem("userId")) {
        // followBtn.style.visibility = "hidden";
        followBtn.className = "unfollow";
        followBtn.innerText = "UNFOLLOW";
        return;
      }
    }
    followBtn.className = "follow";
    followBtn.innerText = "FOLLOW";
    if (followee.data.message) {
      setFllw("UNFOLLOW");
      setFollow(true);
    } else {
      setFllw("FOLLOW");
      setFollow(false);
    }
  };
  const postDetail = async () => {
    const postty1 = await axios.get(
      "https://groovybackend-shauryag2002.vercel.app/post/profile/" +
        params.username
    );
    setPostty(postty1.data);
  };
  const [follow, setFollow] = useState(false);
  const [Fllw, setFllw] = useState("FOLLOW");
  const follow2 = async () => {
    const flw = await axios.put(
      `https://groovybackend-shauryag2002.vercel.app/user/${user._id}/follow`,
      {
        userId: localStorage.getItem("userId"),
      }
    );
    // const followBtn = document.getElementById("followBtn");
    // if (flw.data.message == "user has been followed") {
    //   setFollow(false);
    //   setFllw("FOLLOW");
    // } else {
    //   setFollow(true);
    //   setFllw("UNFOLLOW");
    // }
    // if (follow) {
    //   // followBtn.setAttribute("className", "unfollow");
    //   followBtn.className = "unfollow";
    //   followBtn.innerText = "UNFOLLOW";
    // } else {
    //   // followBtn.setAttribute("className", "follow");
    //   followBtn.className = "follow";
    //   followBtn.innerText = "FOLLOW";
    // }
    window.location.reload();
  };
  const setfollowee = async () => {
    // console.log(user);
    const followee = await axios.post(
      `https://groovybackend-shauryag2002.vercel.app/user/${user._id}/setfollow`,
      {
        userId: localStorage.getItem("userId"),
      }
    );
    const followBtn = document.getElementById("followBtn");
    let a = 0;
    console.log(followee.data);
    if (followee.data.user.followers.length) {
      a = followee.data.user.followers.length;
    } else {
      a = 0;
    }
    for (let i = 0; i < a; i++) {
      const element = followee.data.user.followers[i];
      if (element.userId == localStorage.getItem("userId")) {
        followBtn.className = "unfollow";
        followBtn.innerText = "UNFOLLOW";
        return;
      }
    }
    followBtn.className = "unfollow";
    followBtn.innerText = "FOLLOW";
    if (followee.data.message) {
      setFllw("UNFOLLOW");
      setFollow(true);
    } else {
      setFllw("FOLLOW");
      setFollow(false);
    }
  };
  useEffect(() => {
    userDetails();
    postDetail();
  }, []);
  // useEffect(() => {
  //   setfollowee();
  // }, []);
  // console.log(params);
  // console.log(postty);
  const [isOpen, setIsOpen] = useState(false);
  const togglePopup = () => {
    setIsOpen(!isOpen);
  };
  const [followingOpen, setFollowingOpen] = useState(false);
  const followingPopup = () => {
    setFollowingOpen(!followingOpen);
  };
  return (
    <>
      <Navbar />
      <div className="containn">
        <div className="profileWrapper">
          {/* <div className="Img"> */}
          <img
            className="ProImage"
            src={
              user.profilePicture
                ? user.profilePicture
                : "data:image/jpeg;base64,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"
            }
            alt="Profile Image"
          />
          {/* </div> */}
          <div className="text">
            <h1>{user.name}</h1>
            <h4>{user.username}</h4>
            {localStorage.getItem("username") == params.username ? (
              <button>
                <Link
                  className="text-link Link"
                  to={"/edit/" + user._id + "/" + user._id}
                >
                  <button className="btn edit">EDIT</button>
                </Link>
              </button>
            ) : (
              <button className={"follow"} onClick={follow2} id="followBtn">
                {/* {follow ? "UNFOLLOW" : "FOLLOW"} */}
                FOLLOW
              </button>
            )}
          </div>
        </div>
        <div style={{ marginLeft: "13%" }}>{user.desc}</div>
        {/* <br /> */}
        <div className="userInfo container">
          <div>{postty.length} posts</div>
          <div>
            <div onClick={togglePopup}>{follower} followers</div>
            {isOpen && <Popup handleClose={togglePopup} />}
          </div>
          <div onClick={followingPopup}>{following} following</div>
          {followingOpen && <Popup_following handleClose={followingPopup} />}
        </div>
      </div>
      <hr />
      <div className="posts">
        {postty.map((postt, i) => {
          return (
            <div key={i}>
              <Link className="text-link" to={"/post/" + postt._id}>
                <img className="post" src={postt.img} alt="Post img" />
              </Link>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default Profile;
