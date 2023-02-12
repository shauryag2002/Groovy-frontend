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
                className="inp"
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
                      : "data:image/jpeg;base64,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"
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
                className="text-link"
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
                      : "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAsJCQcJCQcJCQkJCwkJCQkJCQsJCwsMCwsLDA0QDBEODQ4MEhkSJRodJR0ZHxwpKRYlNzU2GioyPi0pMBk7IRP/2wBDAQcICAsJCxULCxUsHRkdLCwsLCwsLCwsLCwsLCwsLCwsLCwsLCwsLCwsLCwsLCwsLCwsLCwsLCwsLCwsLCwsLCz/wAARCAEJAQkDASIAAhEBAxEB/8QAGwABAAIDAQEAAAAAAAAAAAAAAAEFAwQGAgf/xABFEAACAgADAwcIBwUGBwAAAAAAAQIDBBEhBTGBEkFRYXGRsRMVIjJScqHBI0JTYpLR0hQzNEPwJERjk6LxVHOCo7LC4f/EABUBAQEAAAAAAAAAAAAAAAAAAAAB/8QAFBEBAAAAAAAAAAAAAAAAAAAAAP/aAAwDAQACEQMRAD8A+t8RxAAcRxAAcRxAAcRxAAcRxAAcRxAAcRxAAcRxAAcRxAAcRxAAcRxAAcRxAAcRxAAcRxAAcRxAAcRxAAcRxAAAAAAAAAAAAAAAAAAAGtisZRhUvKSbnJZwrj60uvqXWBsnmUoR1lJRXTJpeJz1+08bc2oy8lB7o1aPjP1vA023Jtyzk29XLVviyo6r9pwn/EU/5sPzPcbK5+pOMvdkn4HIhaarR9WjA7AHNU7Qx1LWVrnFfVtzkmujN6/EuMJtCjFNQ9S3LNwk9/XB85BugAKAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABEnGKlKTSjFOUm+ZJZtgauNxkcJXmknbPNVxe7rlLqX9dXOTnOc5TnJynN5yct7MmJvlibrLXnk3lBP6sFuX59phKgAAAAAEptNNZpppprRproIAF/s7HPER8la/poLPPd5SPT29JYnJV2TqnCyDynCSlF9a5mdTTbC+qq2G6cU8uh7muAGQAEUAAAAAAAAAAAAAAAAAAAAAAAAAAA0Nq2+TwrgnlK6Sr6+T60vDLib5SbZnnZha/ZrnP8AE8vkBVAAqAAAAAAAABdbGtzhfQ/qNWQ7JaP+uspTe2VPk4yC+0rsh3Ll/IDogARQAAAAAAAAAAAAAAAAAAAAAAAAAACh2x/FV9VEP/KRfFHtmL8vRLmlS4rtjJv5oCrABUAAAAAAAADa2f8AxuE9+a/0SNU3NmR5WNw/3FbN9nIcfmgOkABFAAAAAAAAAAAAADUagANRqAA1GoADUagANRqAA1KzbFTlRVav5VmT03Rmss+9IszHdVC6q2qW6yEovqz3PhvA5PUanqcJ1znXNZThJxkutHkqGo1AAajUABqNQAGpbbGqbsxFz3QjGqPbL0n4LvKnT8kt7b0SOnwNH7Phqq5eu052+/LV927gBs6jUAimo1AAajUABqNQAGo1AAajUAAAAAAAAAAAAAAAAACq2pgpWL9pqXpxWVsVvlFbpLLnX9bikOwKrG7LjY3bhsozesq3pGXXHoZUUgPU4WVScLIShNfVksnwPIADgAACTlKMYpuUnlGMU5SfYlqWuD2VKTjZi1yY6NUr1n/zGubq/wBgI2XgnZKOKsX0cH9CmvXl7fYub/5reEJKKSSSS0SSSSS5lkSRQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAIlKMFypSjGK3uTSXewJBqT2js+Gad8ZP/AA1Ka74rL4mF7YwK3RvfZBLxkBvWVVWx5NsITj0TSfiac9k4CWbjGdbbzfk5vLulmjx54wXsYj8MP1E+eMF7GI/DD9QHjzNhftr++v8ASe47IwK9bys+qVjS/wBCRHnjBexiPww/UT54wXsYj8MP1AblVGHoWVNVcE9/JSTfa95lK7zxgvYxH4YfqC2xgvZvX/RH5SAsQaUdp7PlvtcX9+El8csjahbVas67ITWWfoST8APYAAAAAAAAAAAAAAAAAAAAAAAABDkkm20kk223kklztsCTWxGNwuG0slnPeq4elPiubiV2M2rKXKrwryjqna1rL3E93b/uVTbbbbzb1bebbfWwLC/a2KszVSjTHpWUpvi1l8DQnOdj5VkpTlzubcm+88gqAAAAAAAAAAAEptNNNprc02n3rUgAbtO0sbVknPykVzW6v8S9ItcPtPC35Rk/JWPdGxrkv3ZbvA50AdgDncJtG/DcmE87KfZb9KPut+HgX1N1V8FZXNSi+9Poa6SKyAAAAAAAAAAAAAAAAAACG0tXoks23okulnP4/HSxEnXW2sPF9nlWvrS6uhf0tza+KcYxw0HrNcq3L2OaPHn7OspNSgAAgAAAAAAAAAAAAAAAAAABnw2JtwtnLhqnly4PdNdfX0GAAdXRdXfXC2t5xkuKa3pmU53ZuJdF8a5P6K9qL19Wf1ZfJ9vUdERQAAAAAAAAAAAAAAMd8/J0YixNZwqsku1ReQHM4m13YjEWPXlWS5Pur0Y/BGEbsgVAAAAAAAAAAAAAAAAAAAAAAAADm6NN51eHs8rRh7ftK4Tfa0szlDotlT5WCqT3wlZDhym14gbwAIoAAAAAAAAAABpbTnycFiFzzdcFxks/hmbpWbYllh6o+1evhGTAogAVAAAAAAAAAAkCAAAAAAAAACQIAAAu9iy+ixUOdXRnwlBL5FIWuxX9Ji48zhVLinJAXYAIoAAAAAAAAAABUbafo4RdMrX3KK+ZblRttejhH961d6iwKYAFQAAAAAAAAAAAAAAAAAAAAAAAALLY7/tNq6aJPunErSx2Os8Va+iiS75xAvwARQAAAAAAAAAACu2vW5YaM0v3VsZP3Zei/kWJ4shCyFlc1nGcXGSfQwOSBt4vA3YVt5OVLfo2LmT5p9ZqFQAAAAAAAAAAAAAAAAAAAAAAAALbYsHysXbzZV1Lt1m/kVlNVt9kaqo8qb119WK9qT6DpsLh4YamFUW3lm5SejlJ6uQGcAEUAAAAAAAAAAAAARKKkmmk01k08mmuhorMRsmqecsPJVy9iWbg+znRaADlbsLicO/pa5RXtrWH4loYTsMk+O81LdnYG3NupRk9XKp8ht9eWnwKjmgW9mxn/Kv4Wx/9ofkas9mbQhuqVi6apxfwlkwNIGSVGJg8p0XR63XLLvyyMWa3ZrPo5wJAAAAAAAABGcd2az6M1mZYUYmz93RdLm0rll3tZfEDGDdr2XtCeXKrhWv8Waz7oZm5VsaC1vulLpjUuQu95vwApuhc73Jat9iRv4bZeKualZ9DXv8ATWdj7I/n3F3RhcLh/wBzVGLe+W+T7ZPX4mYgw4fDUYaHIqikt8m9ZSfTJmYAKAAAAAAAAAAAAAAAAAAAAAAAAHmUK5LKUYyX3op+KPQA15YPAy34aj/LivBHh7O2c1/D1r3eVHwZtgDS82bN+x7p2fqHmvZv2P8A3Lf1G6ANRbN2cv7vB+85vxZ7WCwEd2Go41xfibAA8RrqgsoQhFfdil4HsAAAAAAAAAAAAAAAAAACQBAJAEAkAQCQBAJAEAkAQCQBAJAEAkAQCQBAJAEAkAQCQBAJAEAkAQCQBAJAH//Z"
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
