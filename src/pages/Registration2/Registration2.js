import React, { useEffect, useState } from "react";
// import './registration.css'
// import { universitiesData } from './data';
import "react-phone-input-2/lib/style.css";
// import './registration.css'
import PhoneInput from "react-phone-input-2";
import { useLocation, useNavigate } from "react-router";
import axios, { Axios } from "axios";
import {
  API_ROUTES,
  BASES_ROUTES,
  BASE_URL,
} from "../../components/axios/BASE_URL";
import { toast } from "react-toastify";
import { base_url } from "../../constants";
// import { Sign1 } from './functions/Sign1';
import { Spinner } from "react-bootstrap";
import CryptoJS from "crypto-js";
import bcrypt from "bcryptjs";
import { UserData } from "../../components/axios";
import { showToogleTooltib } from "../../store/reducers/tooltibReducer";
import { useDispatch } from "react-redux";
// import { Sign2 } from './functions/Sign2';
const Registration2 = () => {
  const navigate = useNavigate();
  const location = useLocation();
  // console.log(location.state)
  const code = location?.state;
  const [changeData, setChangeData] = useState("");
  const [selectedUnis, setSelectedUnis] = useState("");
  const [grades, setGrades] = useState([]);
  const [selectedGrade, setSelectedGrade] = useState("");
  const [universities, setUniversities] = useState([]);
  const [regData2, setRegData2] = useState({
    pass: "",
    student_name: "",
    university_id: "",
    grade_id: "",
    phone: "",
  });
  const [changeShow, setChangeShow] = useState("email");
  const [confPass, setConfPass] = useState("");
  const [signLoading, setSignLoading] = useState(false);
  const dispatch = useDispatch();
  const getUnis = () => {
    axios
      .get(base_url + "/user/auth/select_universities_grade.php")
      .then((res) => {
        if (res.data.status == "success") {
          setUniversities(res.data.message);
          setRegData2({
            ...regData2,
            grade_id: res.data.message[0].grades[0].grade_id,
          });
          setRegData2({
            ...regData2,
            university_id: res.data.message[0].university_id,
          });
          setSelectedUnis(res.data.message[0].university_id);
          setGrades(res.data.message[0].grades);
          setSelectedGrade(res.data.message[0].grades[0].grade_id);
        } else {
          dispatch(showToogleTooltib());
        }
      })
      .catch((e) => console.log(e));
  };
  const Sign2 = () => {
    if (regData2.student_name == "") {
      toast.warn("enter Your name");
      return;
    }
    if (regData2.pass == "") {
      toast.warn("enter password");
      return;
    }
    if (confPass !== regData2.pass) {
      toast.warn("Check Password and Password Confirmation");
      return;
    }
    if (regData2.university_id == "") {
      toast.warn("Choise University");
      return;
    }
    if (selectedGrade == "") {
      toast.warn("Choise Grade");
      return;
    }
    if (regData2.phone == "") {
      toast.warn("enter Your Phone");
      return;
    }
    setSignLoading(true);
    const data_send = {
      email: location?.state?.registData?.email,
      ...regData2,
      grade_id: selectedGrade,
      token_value: UserData?.token_value,
    };
    axios
      .post(base_url + "/user/auth/signup_2.php", JSON.stringify(data_send))
      .then((res) => {
        if (res.data.status == "success") {
          const encryptedData = CryptoJS.AES.encrypt(
            JSON.stringify({ ...res.data.message, password: regData2?.pass }),
            "111"
          ).toString();
          localStorage.setItem("elmataryapp", encryptedData);
          // navigate("/", { replace: true });
          setTimeout(() => {
            window.location.href = "/";
          }, 1500);
          // setChangeData('login')
          // navigate('/login',{replace:true});
        } else if (res.data.status == "error") {
          toast.error(res.data.message);
          dispatch(showToogleTooltib());
        } else {
          toast.error("Something Went Error");
        }
      })
      .catch((e) => console.log(e))
      .finally(() => {
        setSignLoading(false);
      });
  };
  useEffect(() => {
    if (changeData == "login") {
      window.location.reload();
    }
  }, [changeData]);
  useEffect(() => {
    getUnis();
  }, []);
  return (
    <div className="registration">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          Sign2();
          // handleSub()
        }}
        action=""
      >
        <h4>
          <span className="my-10 firstFont  "  style={{ color: "#ff005c" }}>Complete Registration</span>
        </h4>
        <div>
          <label htmlFor="f_name " className="thirdFont secondColor">Your Name</label>
          <input
            onChange={(e) => {
              setRegData2({ ...regData2, student_name: e.target.value });
            }}
            placeholder="First Name"
            type="text"
            id="f_name"
            className="form-control"
          />
        </div>
        <div>
          <label  className="thirdFont secondColor" htmlFor="pass">Password</label>
          <input
            onChange={(e) => {
              setRegData2({ ...regData2, pass: e.target.value });
            }}
            id="pass"
            placeholder="Password"
            type="password"
            className="form-control"
          />
        </div>
        <div>
          <label  className="thirdFont secondColor" htmlFor="pass">Confrim Password</label>
          <input
            onChange={(e) => {
              setConfPass(e.target.value);
            }}
            id="pass"
            placeholder="Confrim Password"
            type="password"
            className="form-control"
          />
        </div>
        <div>
          <label  className="thirdFont secondColor" htmlFor="mob">Mobile</label>
          <PhoneInput
            country={"eg"}
            value={""}
            onChange={(e) => {
              setRegData2({ ...regData2, phone: e });
            }}
            // onChange={}
          />
        </div>
        <div>
          <label  className="thirdFont secondColor" htmlFor="uni_id">University</label>
          <select
            value={regData2.university_id}
            onChange={(e) => {
              setRegData2({ ...regData2, university_id: e.target.value });
              let allData = [...universities];
              let newData = allData.filter(
                (item) => item.university_id == e.target.value
              );
              setGrades(newData[0].grades);
              setSelectedGrade(newData[0]?.grades[0]?.grade_id);
            }}
            id="uni_id"
            className="form-control"
          >
            {universities.map((item, index) => {
              return (
                <option  className="thirdFont secondColor" key={index} value={item.university_id}>
                  {item.university_name}
                </option>
              );
            })}
          </select>
        </div>
        <div>
          <label htmlFor="uni_id"  className="thirdFont secondColor">Grade</label>
          <select
            value={regData2.grade_id}
            onChange={(e) => {
              setRegData2({ ...regData2, grade_id: e.target.value });
            }}
            id="uni_id"
            className="form-control"
          >
            {grades.map((item, index) => {
              return (
                <option  className="thirdFont secondColor" key={index} value={item.grade_id}>
                  {item.grade_name}
                </option>
              );
            })}
          </select>
        </div>
        <div className="actions firstFont firstColor" >
          <button style={{ width: "fit-content" }}>
            {signLoading ? <Spinner /> : "Take Me In"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default Registration2;
