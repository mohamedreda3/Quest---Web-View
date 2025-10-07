import axios from 'axios';
import CryptoJS from 'crypto-js';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useLocation, useNavigate } from 'react-router';
import { handleLogOut } from '../../App';
import { base_url } from '../../constants';
import { showToogleTooltib } from '../../store/reducers/tooltibReducer';
import Banner from './Banner/Banner';
import Lessons from './Lessons/Lessons';
import './units.css';
const Units = () => {
  const localData = localStorage.getItem('elmataryapp');
  const decryptedBytes = localData && CryptoJS.AES.decrypt(localData, '111');
  const userData =
    decryptedBytes && JSON.parse(decryptedBytes.toString(CryptoJS.enc.Utf8));

  const navigate = useNavigate();
  const location = useLocation();
  const [checkOwn, setCheckOwn] = useState(false);
  const [courseDetails, setCourseDetails] = useState([]);
  const [currentPage, setCurrentPage] = useState('about');
  const dispatch = useDispatch();
  const getUnitData = () => {
    const data_send = {
      student_id: userData?.student_id,
      token_value: userData?.token_value,
      course_id: location?.state?.course?.course_id,
    };
    axios
      .post(
        base_url + "/user/courses/select_course_lesson.php",
        JSON.stringify(data_send)
      )
      .then(async (res) => {
        if (res.data.status == 'success') {
          setCheckOwn(res.data.message[0].videos[0].own);
          let allcourses = [...res.data.message];
          let pushedData = [];
          for (let i = 0; i < allcourses.length; i++) {
            let obj = {
              ...allcourses[i],
              show: false,
            };
            pushedData.push(obj);
          }
          setCourseDetails(pushedData);
        } else if (res.data.status == 'out') {
          localStorage.clear();
          await handleLogOut();

          window.location.reload();
        } else {
          dispatch(showToogleTooltib());
        }
      })
      .catch((e) => console.log(e));
  };
  const handleChange = (item) => {
    let pushedData = [];
    for (let i = 0; i < courseDetails.length; i++) {
      if (item.unit_id == courseDetails[i].unit_id) {
        let obj = {
          ...courseDetails[i],
          show: !courseDetails[i]['show'],
        };
        pushedData.push(obj);
      } else {
        let obj = {
          ...courseDetails[i],
          show: false,
        };
        pushedData.push(obj);
      }
    }
    setCourseDetails(pushedData);
  };
  function scrollToTop() {
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
  }
  // scrollToTop()
  useEffect(() => {
    scrollToTop();
    getUnitData();
  }, []);
  if (!location.state) {
    navigate(-1, { replace: true });
  }
  return (
    <>
      <div className="units_page">
        <Banner
          description={location?.state?.course?.course_content}
          title={location?.state?.course?.course_name}
        />

        <div className="unit_content">
          <Lessons
            checkOwn={checkOwn}
            handleChange={handleChange}
            course={courseDetails}
          />
        </div>
      </div>
    </>
  );
};

export default Units;
