import axios from "axios";
import CryptoJS from 'crypto-js';
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router";
import { useSearchParams } from "react-router-dom";
import { handleLogOut } from "../../App";
import { base_url } from "../../constants";
import TableofContent from "./components/TableofContent/TableofContent";
// import { Videos } from "./libs/Videos";
import ContentLoader from "react-content-loader";
import { useDispatch } from "react-redux";
import { showToogleTooltib } from "../../store/reducers/tooltibReducer";
import "./style.css";
const CourseContent = () => {
  const localData = localStorage.getItem('elmataryapp');
  const decryptedBytes = localData && CryptoJS.AES.decrypt(localData, '111');
  const userData =
    decryptedBytes && JSON.parse(decryptedBytes.toString(CryptoJS.enc.Utf8));
  const [Videos, setVideos] = useState([]);
  const [index, setIndex] = useState(0);
  const [tab, setTab] = useState(0);
  const navigate = useNavigate();
  const location = useLocation();
  const [checkOwn, setCheckOwn] = useState("loading");
  const [courseDetails, setCourseDetails] = useState([]);
  const [pageLoading, setPageLoading] = useState(false);
  const [loading, setLoading] = useState(false);
  const [params] = useSearchParams();
  const dispatch = useDispatch();
  const getUnitData = () => {
    setLoading(true);
    const data_send = {
      student_id: userData?.student_id,
      token_value: userData?.token_value,
      course_id: params.get("course_id")
    };
    axios
      .post(
        base_url + "/user/courses/select_course_lesson.php",
        JSON.stringify(data_send)
      )
      .then(async (res) => {
        if (res.data.status == 'success') {
          const videosData = res.data.message.map((unit) => ({
            id: unit.unit_id,
            title: unit.unit_name,
            videos: unit.videos.map((video) => ({
              id: video.video_id,
              name: video.video_title,
              link_video: video.youtube_id,
              loom_url: video?.loom_url
            }))
          }));
          setCheckOwn(res?.data?.message[0]?.videos[0]?.own);
          setVideos(videosData);
          let allcourses = [...res.data.message];
          let pushedData = [];
          for (let i = 0; i < allcourses.length; i++) {
            let obj = {
              ...allcourses[i],
              show: false
            };
            pushedData.push(obj);
          }
          setCourseDetails(pushedData);
        } else if (res.data.status === 'out') {
          localStorage.clear();
          await handleLogOut();
          window.location.reload();
        } else {
          dispatch(showToogleTooltib());
        }
      })
      .catch((e) => console.log(e))
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    getUnitData();
  }, []);
  const [selectedVideo, setSelectedVideo] = useState({
    objId: 1,
    videoId: 1
  });

  useEffect(() => {
    if (Videos?.length) {
      console.log(Videos[0]?.videos[0]);
      setSelectedVideo({ ...selectedVideo, videoId: Videos[0]?.videos[0]?.id });
    }
  }, [Videos]);
  const [videoObj, setVideoObj] = useState({});

  const [showTable, setShowTable] = useState(false);
  useEffect(() => {
    if (Videos && Videos?.length) {
      //   const filteredObject = Videos.filter(
      //     (videoObj) => videoObj.id === selectedVideo.objId
      //   );
      //   console.log("filteredObject", filteredObject);
      //   let filteredVideo = filteredObject.map((videos) =>
      //     videos.videos.filter((video) => video.id === selectedVideo.videoId)
      //   );
      //   setVideoObj(filteredVideo.flat()[0]);
      //   setListOfVideos(filteredObject[0]?.videos?.length);
    }
  }, [Videos, selectedVideo]);

  useEffect(() => {
    setVideoObj(() => Videos[tab]?.videos[index]);
  }, [index, Videos]);

  function handleSelectVideo(objId, videoId, title, LessonName) {
    setSelectedVideo({ objId, videoId });
  }

  function handleNextVideo() {
    if (index < Videos[tab]?.videos?.length - 1) {
      setIndex((prevState) => {
        return ++prevState;
      });
    } else {
      if (tab < Videos?.length - 1) {
        setTab((prevState) => {
          return ++prevState;
        });
        setIndex(0);
      }
    }
  }

  function handlePrevVideo() {
    if (index >= 1) {
      setIndex((prevState) => {
        return --prevState;
      });
    } else {
      if (tab >= 1) {
        setTab((prevState) => {
          return --prevState;
        });
      }
    }
  }

  return (
    <>
      {" "}
      {checkOwn == "loading" ? (
        <ContentLoader
          viewBox="0 0 980 420"
          speed={1}
          // backgroundColor={'green'}
        >
          {/* Card shapes */}
          <rect x="10" y="10" rx="20" ry="20" width="960" height="600" />
          {/* <rect x="350" y="10" rx="20" ry="20" width="260" height="300" /> */}
          {/* <rect x="690" y="10" rx="20" ry="20" width="260" height="300" /> */}
          {/* <rect x="690" y="10" rx="20" ry="20" width="260" height="300" /> */}
        </ContentLoader>
      ) : Videos && Videos?.length ? (
        <div>
          {checkOwn == "loading" ? (
            <ContentLoader
              viewBox="0 0 980 420"
              speed={1}
              // backgroundColor={'green'}
            >
              {/* Card shapes */}
              <rect x="10" y="10" rx="20" ry="20" width="960" height="600" />
              {/* <rect x="350" y="10" rx="20" ry="20" width="260" height="300" /> */}
              {/* <rect x="690" y="10" rx="20" ry="20" width="260" height="300" /> */}
              {/* <rect x="690" y="10" rx="20" ry="20" width="260" height="300" /> */}
            </ContentLoader>
          ) : checkOwn ? (
            <>
              {" "}
              <div className="courseContent">
                <div className="nav">
                  <div
                    className="progress-container firstFont secondFontEffect"
                    style={{ paddingLeft: "30px" }}
                  >
                    <p style={{ fontWeight: "800" }}>
                      {params.get("course_name")}
                    </p>
                    <div className="progress">
                      <span
                        style={{
                          width: params.get("r") + "%",
                          display: "block"
                        }}
                        className="progress-container firstFont secondFontEffect"
                      ></span>
                    </div>
                    <p>
                      <span className="progress-container firstFont">
                        Process
                      </span>
                      <span>{params.get("r")}%</span>
                    </p>
                  </div>

                  <div className="btns-container" style={{ padding: "10px" }}>
                    <button onClick={handlePrevVideo}>Previous Lesson</button>
                    <button
                      className="btns-container-next"
                      onClick={handleNextVideo}
                    >
                      <span>Next Lesson</span>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-6 h-6 my-auto"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="m5.25 4.5 7.5 7.5-7.5 7.5m6-15 7.5 7.5-7.5 7.5"
                        />
                      </svg>
                    </button>
                  </div>

                  <div className="menu-container">
                    <div>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        className="w-6 h-6"
                      >
                        <path d="M12 .75a8.25 8.25 0 0 0-4.135 15.39c.686.398 1.115 1.008 1.134 1.623a.75.75 0 0 0 .577.706c.352.083.71.148 1.074.195.323.041.6-.218.6-.544v-4.661a6.714 6.714 0 0 1-.937-.171.75.75 0 1 1 .374-1.453 5.261 5.261 0 0 0 2.626 0 .75.75 0 1 1 .374 1.452 6.712 6.712 0 0 1-.937.172v4.66c0 .327.277.586.6.545.364-.047.722-.112 1.074-.195a.75.75 0 0 0 .577-.706c.02-.615.448-1.225 1.134-1.623A8.25 8.25 0 0 0 12 .75Z" />
                        <path
                          fillRule="evenodd"
                          d="M9.013 19.9a.75.75 0 0 1 .877-.597 11.319 11.319 0 0 0 4.22 0 .75.75 0 1 1 .28 1.473 12.819 12.819 0 0 1-4.78 0 .75.75 0 0 1-.597-.876ZM9.754 22.344a.75.75 0 0 1 .824-.668 13.682 13.682 0 0 0 2.844 0 .75.75 0 1 1 .156 1.492 15.156 15.156 0 0 1-3.156 0 .75.75 0 0 1-.668-.824Z"
                          clipRule="evenodd"
                        />
                      </svg>

                      <span className="progress-container firstFont">Exam</span>
                    </div>

                    <div
                      style={{ cursor: "pointer" }}
                      onClick={() => setShowTable(!showTable)}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-6 h-6"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                        />
                      </svg>

                      <span className="progress-container firstFont">
                        {" "}
                        Table of Contents
                      </span>
                    </div>
                  </div>
                </div>

                {loading ? (
                  <ContentLoader
                    viewBox="0 0 980 320"
                    speed={1}
                    // backgroundColor={'green'}
                  >
                    {/* Card shapes */}
                    <rect
                      x="10"
                      y="10"
                      rx="20"
                      ry="20"
                      width="260"
                      height="300"
                    />
                    <rect
                      x="350"
                      y="10"
                      rx="20"
                      ry="20"
                      width="260"
                      height="300"
                    />
                    <rect
                      x="690"
                      y="10"
                      rx="20"
                      ry="20"
                      width="260"
                      height="300"
                    />
                    <rect
                      x="690"
                      y="10"
                      rx="20"
                      ry="20"
                      width="260"
                      height="300"
                    />
                  </ContentLoader>
                ) : (
                  <main>
                    <div className="home-text-box">
                      <p className="progress-container secondFont">
                        Lesson {videoObj?.id}:
                      </p>
                      <p className="progress-container firstFont">
                        {videoObj?.name}
                      </p>
                    </div>

                    <div className="videos">
                      <TableofContent
                        setTab={setTab}
                        tab={tab}
                        showContent={showTable}
                        videoObj={videoObj}
                        Videos={Videos}
                        index={index}
                        setIndex={setIndex}
                        selectedVideo={selectedVideo}
                        handleSelectVideo={handleSelectVideo}
                      />
                    </div>
                  </main>
                )}
              </div>
            </>
          ) : (
            <h2 style={{ padding: "20px", fontWeight: "900" }}>
              You Are Not Register This Course
            </h2>
          )}
        </div>
      ) : (
        <h2 style={{ padding: "20px", fontWeight: "900" }}>
          No Lessons In This Course
        </h2>
      )}
    </>
  );
};

export default CourseContent;
