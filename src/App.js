import "./App.css";
import "./component/allstyle.css";
import Navbar from "./component/Navbar";
import Post from "./component/Post";
// import "./component/register_update.css";
import { Routes, Route } from "react-router-dom";
import Register from "./component/Register";
import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
// import { useHistory } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Login from "./component/Login";
import Createpost from "./component/Createpost";
import TimelinePost from "./component/TimelinePost";
import Profile from "./component/Profile";
import Edit from "./component/Edit";
import Popup from "./component/Popup";
import PostOne from "./component/PostOne";
import Login_update from "./component/Login_update";
import Register_update from "./component/Register_update";

function App() {
  const [user, setUser] = useState("");
  const login = async () => {
    // localStorage.getItem("email");
    // localStorage.getItem("password");
    // if()
    const userOne = await axios.post(
      "https://groovybackend-shauryag2002.vercel.app/auth/login",
      {
        email: localStorage.getItem("email"),
        password: localStorage.getItem("password"),
      }
    );
    setUser(userOne.data);
  };
  // const history = useHistory();
  const navigate = useNavigate();

  useEffect(() => {
    if (!localStorage.getItem("email") || !localStorage.getItem("password")) {
      // history.push("/login");
      navigate("/login");
    } else {
      login();
    }
  }, []);
  return (
    <>
      {/* <Navbar /> */}
      <Routes>
        {/* <Route path="/register" element={<Register />} /> */}
        <Route path="/register" element={<Register_update />} />

        {/* <Route path="/login" element={<Login />} /> */}
        <Route path="/login" element={<Login_update />} />
        <Route path="/post" element={<Post />} />
        <Route path="/post/:id" element={<PostOne />} />

        <Route path="/" element={<TimelinePost />} />
        <Route path="/addpost" element={<Createpost />} />
        <Route path="/profile/:username" element={<Profile />} />
        <Route path="/edit/:id/:userId" element={<Edit />} />
        {/* <Post /> */}
      </Routes>
      {/* <Popup /> */}
    </>
  );
}

export default App;
