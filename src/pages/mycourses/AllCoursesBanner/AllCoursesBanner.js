import CryptoJS from "crypto-js";
import React, { useState } from 'react';
import './allcoursesbanner.css';
import { star } from './svg';
const AllCoursesBanner = ({ selectedTopic, setSelectedTopic }) => {
  const localData = localStorage.getItem("elmataryapp");
  const decryptedBytes = localData && CryptoJS.AES.decrypt(localData, "111");
  const userData =
    decryptedBytes && JSON.parse(decryptedBytes.toString(CryptoJS.enc.Utf8));

  const [coursesType, setCoursesType] = useState([]);
  const [selectedType, setSelectedType] = useState('');

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
    <div className="">
      <h1 style={{ width: "100%" }} className="firstFont firstColor"> Your Registered Courses</h1>
    </div>
  );
};

export default AllCoursesBanner;
