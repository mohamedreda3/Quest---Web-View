import React, { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa6";
import "./login.css";
import { useNavigate } from "react-router";
import axios, { Axios } from "axios";
import {
  API_ROUTES,
  BASES_ROUTES,
  BASE_URL,
} from "../../components/axios/BASE_URL";
import { toast } from "react-toastify";
import { base_url } from "../../constants";
import CryptoJS from "crypto-js";
import bcrypt from "bcryptjs";
import { Spinner } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { showToogleTooltib } from "../../store/reducers/tooltibReducer";
const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [loginLoading, setLoginLoading] = useState(false);
  const [showPass, setShowPass] = useState(false);
  const localData = localStorage.getItem("elmataryapp");
  const decryptedBytes = localData && CryptoJS.AES.decrypt(localData, "111");
  const userData =
    decryptedBytes && JSON.parse(decryptedBytes.toString(CryptoJS.enc.Utf8));
  const [loginData, setLoginData] = useState({
    email: "",
    pass: "",
  });
  const handleSub = () => {
    if (loginData.email == "") {
      toast.warn("Enter Login Data");
      return;
    }
    if (loginData.pass == "") {
      toast.warn("Enter Password");
      return;
    }
    setLoginLoading(true);
    const data_send = {
      ...loginData,
      device_token: userData?.device_token
        ? userData?.device_token
        : loginData?.email,
    };
    axios
      .post(base_url + "/user/auth/new_login.php", JSON.stringify(data_send))
      .then((res) => {
        if (res.data.status == "success") {
          const encryptedData = CryptoJS.AES.encrypt(
            JSON.stringify({ ...res.data.message, password: loginData?.pass }),
            "111"
          ).toString();
          localStorage.setItem("elmataryapp", encryptedData);
          window.location.href = "/";
          // toast.success(res.data.mes)
        } else if ((res.data.status = "error")) {
          toast.error(res.data.message);
          dispatch(showToogleTooltib());
        } else {
          toast.error("Something Went Error");
          dispatch(showToogleTooltib());
        }
      })
      .finally(() => {
        setLoginLoading(false);
      })
      .catch((e) => {
        console.log(e);
        dispatch(showToogleTooltib());
      });
  };

  return (
    <div className="login_page">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSub();
        }}
        action=""
      >
        <h4 className=" font-bold mainColor firstFont"  style={{ color: "#ff005c" }}>Log In</h4>
        <div>
          <label className="thirdFont seconderyColor" htmlFor="email">
            Email
          </label>
          <input
            onChange={(e) => {
              setLoginData({ ...loginData, email: e.target.value });
            }}
            className="form-control"
            type="email"
            id="email"
          />
        </div>
        <div>
          <label className="thirdFont seconderyColor" htmlFor="password">
            Password
          </label>
          <div className="pass_div">
            <input
              onChange={(e) => {
                setLoginData({ ...loginData, pass: e.target.value });
              }}
              className="form-control"
              type={showPass ? "text" : "password"}
              id="password"
            />
            {showPass ? (
              <FaEye
                onClick={() => {
                  setShowPass(!showPass);
                }}
              />
            ) : (
              <FaEyeSlash
                onClick={() => {
                  setShowPass(!showPass);
                }}
              />
            )}
          </div>
        </div>
        <button>{loginLoading ? <Spinner /> : "Login"}</button>
        <h4 style={{ margin: "40px 0 4px" }}>
          <span
            style={{ fontSize: "15px" }}
            className="firstFont seconderyColor"
          >
            Don't Have An Account ?
          </span>
          <span
            className="thirdFont mainColor"
            onClick={() => {
              navigate("/signup");
            }}
          >
            Register
          </span>
        </h4>
      </form>
    </div>
  );
};

export default Login;
