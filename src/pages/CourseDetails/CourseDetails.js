import { useLocation } from "react-router";
import About from "./components/About/About";
import Learn from "./components/Learn/Learn";
import Modules from "./components/Modules/Modules";
import CryptoJS from "crypto-js";
import Skills from "./components/Skills/Skills";
import { useEffect, useState } from "react";
import { base_url } from "../../constants";
import axios from "axios";
import { useSearchParams } from "react-router-dom";
import { Loader } from "rsuite";

function App() {
  const [pageLoading, setPageLoading] = useState(true);
  const location = useLocation();
  const course = location?.state?.course;
  const localData = localStorage.getItem("elmataryapp");
  const decryptedBytes = localData && CryptoJS.AES.decrypt(localData, "111");
  const userData =
    decryptedBytes && JSON.parse(decryptedBytes.toString(CryptoJS.enc.Utf8));
  // const [course] = useSearchParams();
  const [gettenCourse, setGettenCourse] = useState([]);
  // const getCourses = () => {
  //   setPageLoading(true);
  //   const data_send = {
  //     student_id: userData?.student_id,
  //     token_value: userData?.token_value,
  //   };
  //   axios
  //     .post(
  //       base_url + '/user/courses/select_courses.php',
  //       JSON.stringify(data_send)
  //     )
  //     .then((res) => {
  //       if (res.data.status == 'success') {
  //         setGettenCourse(
  //           res?.data?.message?.filter(
  //             (item) => item?.course_id == course.get("course_id")
  //           )[0]
  //         );
  //       } else if (res.data.status == 'out') {
  //         localStorage.clear();
  //         // window.location.reload();
  //       }
  //     })
  //     .catch((e) => console.log(e))
  //     .finally(() => {
  //       setPageLoading(false);
  //     });
  // };
  // useEffect(() => {
  //   if (course.get("course_id")) {
  //     getCourses();
  //   }
  // }, [course.get("course_id")]);
  console.log(course);
  return (
    <>
      {" "}
      <div className="flex px-20 py-10 gap-10 main-page">
        {/* <img
          src={course?.course_photo_url}
          alt="Doctors"
          className="rounded-full w-[200px] h-[200px]"
        /> */}
        <div className="bg-[#f1f0f0] p-8 home">
          <About course={course} />
          <Learn course={course} />
          <Skills course={course} />
          <Modules course={course} />
          {/* <Recommendation course={course} /> */}
        </div>
      </div>
    </>
  );
}

export default App;
