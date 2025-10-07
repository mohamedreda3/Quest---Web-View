import axios from 'axios';
import CryptoJS from 'crypto-js';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { toast } from 'react-toastify';
import { Axios } from '../../components/axios';
import { base_url } from '../../constants';
import Calender from './calender';
import Communications from './communications';
import { getPrivacy } from './functions/getPrivacy';
import { getStdCourses } from './functions/getStudentCourses';
import PaymentForm from './payement';
import './profile.css';
const Profile = () => {
  const navigate = useNavigate();
  const [privacy, setPrivacy] = useState('');
  const [originalCourses, setOriginalCourses] = useState([]);
  const [pageLoading, setPageLoading] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showPrivacy, setShowPrivacy] = useState(false);
  const [showHelpCenter, setShowHelperCenter] = useState(false);
  const [coursesType, setCoursesType] = useState('ongoing');
  const [courses, setCourses] = useState([]);
  const [userLoading, setUserLoading] = useState(false);
  const [logoutLoading, setLogOutLoading] = useState(false);
  const [compCourses, setCmpCourses] = useState([]);
  const localData = localStorage.getItem('elmataryapp');
  const decryptedBytes = localData && CryptoJS.AES.decrypt(localData, '111');
  const userData =
    decryptedBytes && JSON.parse(decryptedBytes.toString(CryptoJS.enc.Utf8));
  // console.log(userData)

  const handleLogOut = () => {
    setLogOutLoading(true);
    const data_send = {
      student_id: userData?.student_id,
      token_value: userData?.token_value,
    };
    axios
      .post(
        base_url + '/user/auth/student_logout.php',
        JSON.stringify(data_send)
      )
      .then(async (res) => {
        if (res.data.status == 'success') {
          toast.success(res.data.message);
          localStorage.removeItem('elmataryapp');
          navigate('/signup', { replace: true });
        } else if (res.data.status == 'error') {
          toast.error(res.data.message);
        } else if (res.data.status == 'out') {
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
  const getUserData = () => {
    Axios({
      method: 'POST',
      // url: BASE_URL + BASES_ROUTES?.admin + API_ROUTES?.pdf?.BASE_ROUTE + API_ROUTES?.pdf?.ROUTES?.select,
    })
      .then((res) => {
        if (res.status == 'success') {
          setCourses(res.message);
        } else {
          toast.error(res.message);
        }
      })
      .finally(() => {
        setUserLoading(false);
      });
  };
  useEffect(() => {
    getPrivacy(setPrivacy);
    getStdCourses(
      userData,
      setPageLoading,
      setCourses,
      setOriginalCourses,
      setCmpCourses
    );
    console.log(userData);
    // getCourses()
  }, []);
  return (
    <div className="profile_page">
      {/* <div className="profile_info">
        {userLoading ? (
          <div style={{ width: '100%' }}>
            <Skeleton count={7} height={34} />
          </div>
        ) : (
          <>
            <div className="profile_img">
              <img src={require("../../assets/stu.png")} alt="" />
            </div>
            <h6>#{userData.student_id}</h6>
            <h4>{userData.student_name}</h4>
            <p>{userData.university_name}</p>
            <h5>{userData.email}</h5>
          </>
        )}
        <div className="pages">
          <div
            onClick={() => {
              setShowEditModal(true);
            }}
          >
            Show
          </div>
          <div
            onClick={() => {
              setShowPrivacy(true);
            }}
          >
            Privacy Policy
          </div>
          <div
            onClick={() => {
              // setShowHelperCenter(true)
              navigate("/techsup");
            }}
          >
            Help Center
          </div>
          <div
            onClick={() => {
              handleLogOut();
            }}
          >
            {logoutLoading ? <Spinner /> : 'LogOut'}
          </div>
        </div>
      </div> */}
      <div className="profile_info">
        <p>Account</p>
        {/* <p>Payment</p>
        <p>Communications</p>
        <p>Calender Sync</p> */}
      </div>
      <div className="profile">
        <div className="profile_content mb-4">
          <div className="profileStyle">
            <h5>Account</h5>
            <form action="" onSubmit={(e) => e.preventDefault()}>
              <div className="form">
                <div className="inputField">
                  <label htmlFor="">Full Name</label>
                  <input
                    type="text"
                    defaultValue={userData?.student_name}
                    disabled
                  />
                </div>
                <div className="inputField">
                  <label htmlFor="">Email</label>
                  <input
                    type="text"
                    defaultValue={userData?.student_email}
                    disabled
                  />
                </div>
                <div className="inputField">
                  <label htmlFor="">University</label>
                  <input
                    type="text"
                    defaultValue={userData?.university_name}
                    disabled
                  />
                </div>
                <div className="inputField">
                  <label htmlFor="">Grade</label>
                  <input
                    type="text"
                    defaultValue={userData?.grade_name}
                    disabled
                  />
                </div>
              </div>
              {/* <button className="defultButtonStyle">Save</button> */}
            </form>
          </div>
          {/* <div className="profileStyle">
            <h5>Password</h5>
            <form action="" onSubmit={(e) => e.preventDefault()}>
              <div className="form">
                <div className="inputField">
                  <label htmlFor="">Old Password</label>
                  <input type="text" />
                </div>
                <div className="inputField">
                  <label htmlFor="">New Password</label>
                  <input type="text" />
                </div>

                <div className="inputField">
                  <label htmlFor="">retype Password</label>
                  <input type="text" />
                </div>
              </div>
              <button className="defultButtonStyle">Change Password</button>
            </form>
          </div>
          <div className="profileStyle">
            <h5>Delete Account</h5>
            <p>
              If you delete your account, your personal data will be removed
              from our servers, all of yourcourse activity will be and any of
              certificated earned will be deleted. This action cannot beundone!
            </p>
            <button className="defultButtonStyle">Delete Account</button>
          </div> */}
        </div>
        {/* <div className="profile_content mb-4">
          <div className="profileStyle">
            <h5>Payment Method</h5>

            <PaymentForm />
          </div>
        </div>
        <div className="profile_content mb-4">
          <div className="profileStyle">
            <h5>Communications</h5>

            <Communications />
          </div>
        </div>{" "}
        <div className="profile_content mb-4">
          <div className="profileStyle">
            <h5>Calender Async</h5>

            <Calender />
          </div>
        </div>{" "} */}
      </div>
    </div>
  );
};

export default Profile;
