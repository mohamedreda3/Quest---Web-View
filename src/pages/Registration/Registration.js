import React, { useState } from 'react';
import { Spinner } from 'react-bootstrap';
import 'react-phone-input-2/lib/style.css';
import { useNavigate } from 'react-router';
import { toast } from 'react-toastify';
import { Sign1, checkCode } from './functions/Sign1';
import './registration.css';
import { useDispatch } from 'react-redux';
const Registration = () => {
  const navigate = useNavigate();
  const [code, setCode] = useState('');
  const [userCode, setUserCode] = useState('');
  const [selectedUnis, setSelectedUnis] = useState('');
  const [grades, setGrades] = useState([]);
  const [selectedGrade, setSelectedGrade] = useState('');
  const [universities, setUniversities] = useState([]);
  const [registData, setRegistData] = useState({
    email: '',
  });
  const [regData2, setRegData2] = useState({
    pass: '',
    student_name: '',
    university_id: '',
    grade_id: '',
    phone: '',
  });
  const dispatch = useDispatch();
  const [changeShow, setChangeShow] = useState('email');
  const [confPass, setConfPass] = useState('');
  const [signLoading, setSignLoading] = useState(false);
  const handleSign2 = () => {
    if (userCode == '') {
      toast.warn('Enter Code');
      return;
    }
    if (code) {
      checkCode(registData?.email, userCode, navigate, registData, dispatch);
    } else {
      toast.warn('Check The Code');
      return;
    }
  };
  return (
    <div className="registration">
      {changeShow == 'email' ? (
        <form
          onSubmit={(e) => {
            e.preventDefault();
            Sign1(registData, setSignLoading, setChangeShow, setCode, dispatch);
          }}
          action=""
        >
          <h4 className=" font-bold  firstFont"  style={{ color: "#ff005c" }}>Registration</h4>
          <div>
            <label className=" font-bold mainColor firstFont" htmlFor="email">Email</label>
            <input
              onChange={(e) => {
                setRegistData({ ...registData, email: e.target.value });
              }}
              id="email"
              placeholder="Email"
              type="text"
              className="form-control"
            />
          </div>
          <div className="actions">
            <button>{signLoading ? <Spinner /> : 'Register'}</button>
          </div>
          <h4 style={{ margin: "40px 0 4px" }}>
            <span className=" font-bold firstColor firstFont" style={{ fontSize: "15px", color: "var(--main-color)" }}>
              Already Have Account?
            </span>
            <span
            className=" font-bold firstColor firstFont"
              onClick={() => {
                navigate("/login");
              }}
            >
              Login
            </span>
          </h4>
        </form>
      ) : (
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSign2();
          }}
          action=""
        >
          <h4 className="my-10 firstFont  "  style={{ color: "#ff005c" }}>OTP Verification </h4>
          <span style={{ fontSize: "13px",  }}  className='firstColor firstFont'>
            A 6-digit code has been sent to your register email{" "}
            <span style={{ color: "red" }}>"{registData?.email}"</span>
            <p  className='firstColor firstFont'>
              <i style={{ fontSize: "12px", color: "darkgray" }}>
                If You Don't Find The Code In Your Email Inbox - Just Check{" "}
                <span style={{ color: "red" }}> " Spam " </span>
                Inbox
              </i>
            </p>
          </span>
          <input
            className="form-control mb-2 my-10"
            type="text"
            maxLength={6}
            onChange={(e) => {
              setUserCode(e.target.value);
            }}
            placeholder="Enter Code That Delivared To Your Email"
          />
          <button>Confirm</button>
          <h4 style={{ margin: "40px 0 5px" }} className='firstColor firstFont'>
            <span style={{ fontSize: "15px", color: "var(--main-color)" }}>
              Already Have Account?
            </span>
            <span
            className='firstColor firstFont'
              onClick={() => {
                navigate("/login");
              }}
            >
              Login
            </span>
          </h4>
        </form>
      )}
    </div>
  );
};

export default Registration;
