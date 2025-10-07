import axios from 'axios';
import React, { useEffect, useState } from 'react';
import './allcoursesbanner.css';
import CryptoJS from "crypto-js";
import { star } from './svg';
import { base_url } from '../../../constants';
import { useDispatch } from 'react-redux';
const AllCoursesBanner = ({ selectedTopic, setSelectedTopic }) => {
  const localData = localStorage.getItem("elmataryapp");
  const decryptedBytes = localData && CryptoJS.AES.decrypt(localData, "111");
  const userData =
    decryptedBytes && JSON.parse(decryptedBytes.toString(CryptoJS.enc.Utf8));

  const [coursesType, setCoursesType] = useState([]);
  const dispatch = useDispatch();
  const getCoursesType = () => {
    axios
      .post(base_url + "/user/courses/select_categorys.php", {
        student_id: userData?.student_id,
        token_value: userData?.token_value,
      })
      .then((response) => {
        let allData = [...response?.data?.message];
        let pushedArr = [];
        setCoursesType(
          allData?.map((item) => ({
            id: item?.category_id,
            label: item?.category_label,
          }))
        );
        setSelectedTopic(allData[0]?.category_label);
      });
  };
  useEffect(() => {
    getCoursesType();
  }, []);
  const topics = [
    { id: 1, label: "General Surgery" },
    { id: 2, label: "GIT Surgery" },
    { id: 3, label: "Special Surgery" },
    { id: 4, label: "Revisions" },
    { id: 5, label: "Operative" },
    { id: 6, label: "Anatomy" },
    { id: 7, label: "Clinical" },
  ];

  return (
    <div className="allcourses_banner_comp">
      <h3 className="firstFont secondColor" style={{ width: "100%", color: "#ff005c", fontSize:"35px" }}>
        {" "}
        Explore courses we think you’ll be interested in.
      </h3>
      <div className="gridCoursesTopics">
        {coursesType?.map((item) => {
          return (
            <div
              className={
                item?.label == selectedTopic
                  ? "topicButton active"
                  : "topicButton"
              }
              onClick={() => setSelectedTopic(item?.label)}
            >
              {item?.label == selectedTopic ? (
                <span style={{ color: "yellow" }} className="star">
                  {star}
                </span>
              ) : null}
              <span> {item?.label}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default AllCoursesBanner;
