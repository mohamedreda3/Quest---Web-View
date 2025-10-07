import axios from "axios";
import CryptoJS from "crypto-js";
import React, { useEffect, useRef, useState } from "react";
import { Spinner } from "react-bootstrap";
import { NavLink, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { base_url } from "../../constants";
import "./header.css";
const Header = () => {
  const [showPerLinks, setShowPerLinks] = useState(false);
  const navigate = useNavigate();
  const localData = localStorage.getItem("elmataryapp");
  const decryptedBytes = localData && CryptoJS.AES.decrypt(localData, "111");
  const userData =
    decryptedBytes && JSON.parse(decryptedBytes.toString(CryptoJS.enc.Utf8));
  const headerRef = useRef();
  const [logoutLoading, setLogOutLoading] = useState(false);

  const handleLogOut = () => {
    setLogOutLoading(true);
    const data_send = {
      student_id: userData?.student_id,
      token_value: userData?.token_value,
    };
    axios
      .post(
        base_url + "/user/auth/student_logout.php",
        JSON.stringify(data_send)
      )
      .then(async (res) => {
        if (res.data.status == "success") {
          toast.success(res.data.message);
          localStorage.removeItem("elmataryapp");
          window.location.reload();
        } else if (res.data.status == "error") {
          toast.error(res.data.message);
        } else if (res.data.status == "out") {
          localStorage.clear();
          await handleLogOut();
          window.location.reload();
        }
      })
      .catch((e) => console.log(e))
      .finally(() => {
        setLogOutLoading(false);
      });
    // window.location.reload()
  };
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (headerRef.current && !headerRef.current.contains(event.target)) {
        setShowPerLinks(false);
      }
    };

    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);
  return (
    <div className="header">
      <div className="container2">
        <div className="right">
          <div
            onClick={() => {
              navigate("/");
            }}
            className="logo"
          >
            <img
              src={
                require("../../assets/Matary basic media_20250220_213011_0000.svg")
                  ?.default
              }
              alt=""
            />
          </div>
          <div className="links">
            <NavLink to={"/"}>Home</NavLink>
            {userData && Object.keys(userData).length > 0 ? (
              <>
                <NavLink to={"/allcourses"}>Courses</NavLink>
                <NavLink to={"/MyCourses"}>My Courses</NavLink>
                <NavLink to={"/AllBooks"}>All Books</NavLink>
                <NavLink to={"/MyBooks"}>My Books</NavLink>
              </>
            ) : null}
            {/* <NavLink to={"/blogs"}>Blogs</NavLink>
            <NavLink to={"/about"}>About</NavLink> */}
          </div>
        </div>
        {/* {userData && Object.keys(userData).length > 0 ? (
          <div>
            <div
              onClick={() => {
                navigate("/SubscribeBooks");
                setShowPerLinks(false);
              }}
            >
              <span className="btn btn-primary">+ Add New Books</span>
            </div>
            <div
              onClick={() => {
                navigate("/Subscribe");
                setShowPerLinks(false);
              }}
            >
              <span className="btn btn-primary">+ Add New Courses</span>
            </div>
          </div>
        ) : null} */}
        <div className="left leftHeaderPerson" ref={headerRef}>
          {userData && Object.keys(userData).length > 0 ? (
            <>
              <div
                onClick={() => {
                  navigate("/SubscribeBooks");
                  setShowPerLinks(false);
                }}
              >
                <span className="btn btn-primary">+ Add New Books</span>
              </div>
              <div
                onClick={() => {
                  navigate("/Subscribe");
                  setShowPerLinks(false);
                }}
              >
                <span className="btn btn-primary">+ Add New Courses</span>
              </div>
              <div
                className="person_logo"
                style={{ cursor: "pointer" }}
                onClick={() => {
                  setShowPerLinks(!showPerLinks);
                }}
              >
                <span>
                  <svg
                    fontSize={50}
                    xmlns="http://www.w3.org/2000/svg"
                    width="1em"
                    height="1em"
                    viewBox="0 0 24 24"
                  >
                    <g fill="none">
                      <path
                        fill="black"
                        d="M15 15H9a4.002 4.002 0 0 0-3.834 2.856A8.98 8.98 0 0 0 12 21a8.98 8.98 0 0 0 6.834-3.144A4.002 4.002 0 0 0 15 15"
                        opacity="0.16"
                      />
                      <path
                        stroke="black"
                        stroke-width="2"
                        d="M21 12a8.958 8.958 0 0 1-1.526 5.016A8.991 8.991 0 0 1 12 21a8.991 8.991 0 0 1-7.474-3.984A9 9 0 1 1 21 12Z"
                      />
                      <path
                        fill="black"
                        d="M13 9a1 1 0 0 1-1 1v2a3 3 0 0 0 3-3zm-1 1a1 1 0 0 1-1-1H9a3 3 0 0 0 3 3zm-1-1a1 1 0 0 1 1-1V6a3 3 0 0 0-3 3zm1-1a1 1 0 0 1 1 1h2a3 3 0 0 0-3-3zm-6.834 9.856l-.959-.285l-.155.523l.355.413zm13.668 0l.76.651l.354-.413l-.155-.523zM9 16h6v-2H9zm0-2a5.002 5.002 0 0 0-4.793 3.571l1.917.57A3.002 3.002 0 0 1 9 16zm3 6a7.98 7.98 0 0 1-6.075-2.795l-1.518 1.302A9.98 9.98 0 0 0 12 22zm3-4c1.357 0 2.506.902 2.876 2.142l1.916-.571A5.002 5.002 0 0 0 15 14zm3.075 1.205A7.98 7.98 0 0 1 12 20v2a9.98 9.98 0 0 0 7.593-3.493z"
                      />
                    </g>
                  </svg>
                </span>

                {showPerLinks ? (
                  <div className="logo_links">
                    {/* {userData && (
                  <div>
                    <img src={require("../../assets/stu.png")} alt="" />
                    <div className="details">
                      <h5>{userData.student_name}</h5>
                      <p>{userData.student_email}</p>
                    </div>
                  </div>
                )} */}
                    <div className="links" style={{ flexDirection: "column" }}>
                      {userData && Object.keys(userData).length > 0 ? (
                        <>
                          <div
                            onClick={() => {
                              navigate("/MyCourses");
                              setShowPerLinks(!showPerLinks);
                            }}
                          >
                            {/* <img src={require("../../assets/user.png")} alt="" /> */}
                            <span>My Courses</span>
                          </div>
                        </>
                      ) : null}
                      {userData && Object.keys(userData).length > 0 ? (
                        <div
                          onClick={() => {
                            navigate("/profile");
                            setShowPerLinks(!showPerLinks);
                          }}
                        >
                          {/* <img src={require("../../assets/user.png")} alt="" /> */}
                          <span>Account</span>
                        </div>
                      ) : null}

                      <div
                        onClick={() => {
                          navigate("/techsup");
                          setShowPerLinks(!showPerLinks);
                        }}
                      >
                        {/* <img src={require("../../assets/help.png")} alt="" /> */}
                        <span>Technical Support</span>
                      </div>
                      {userData && Object.keys(userData).length > 0 ? (
                        <div
                          onClick={() => {
                            return logoutLoading ? null : handleLogOut();
                          }}
                        >
                          {logoutLoading ? (
                            <Spinner />
                          ) : (
                            <>
                              {/* <img
                              src={require("../../assets/signout.png")}
                              alt=""
                            /> */}
                              <span>Sign Out</span>
                            </>
                          )}
                        </div>
                      ) : null}
                    </div>
                  </div>
                ) : null}
              </div>
            </>
          ) : (
            <>
              <NavLink to={"/login"} className={"register sign"}>
                Log In
              </NavLink>
              <NavLink to={"/signup"} className={"register sign"}>
                Register
              </NavLink>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Header;
