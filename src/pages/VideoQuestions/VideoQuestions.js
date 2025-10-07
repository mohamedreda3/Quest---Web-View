import axios from "axios";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router";
import { base_url } from "../../constants";
import { FaArrowLeft } from "react-icons/fa";
import CryptoJS from "crypto-js";
import "../CourseQuestions/coursequestions.css";
import moment from "moment";
import { Spinner } from "react-bootstrap";
import { toast } from "react-toastify";
import { handleLogOut } from "../../App";
import { showToogleTooltib } from "../../store/reducers/tooltibReducer";
import { useDispatch } from "react-redux";
const VideoQuestions = () => {
  const localData = localStorage.getItem("elmataryapp");
  const decryptedBytes = localData && CryptoJS.AES.decrypt(localData, "111");
  const userData =
    decryptedBytes && JSON.parse(decryptedBytes.toString(CryptoJS.enc.Utf8));

  const location = useLocation();
  const navigate = useNavigate();
  const [ques, setQues] = useState([]);
  const [text, setText] = useState("");
  const [type, setType] = useState("all");
  const [load, setLoad] = useState(false);
  const [pageLoading, setPageLoading] = useState(false);
  const dispatch = useDispatch();
  const getCourseQuestions = () => {
    setPageLoading(true);
    if (type == "all") {
      const data_send = {
        course_id: location?.state?.video?.video_id,
        student_id: userData?.student_id,
        type: "videos",
        token_value: userData?.token_value,
      };
      axios
        .post(
          base_url + "/user/student_question/select_course_questions.php",
          JSON.stringify(data_send)
        )
        .then(async (res) => {
          setQues(res.data.message);
          if (res.data.status == 'out') {
            localStorage.clear();
            await handleLogOut();
            window.location.reload();
          } else {
            dispatch(showToogleTooltib());
          }
        })
        .catch((e) => {
          console.log(e);
          dispatch(showToogleTooltib());
        })
        .finally(() => {
          setPageLoading(false);
        });
    } else {
      const data_send = {
        student_id: userData?.student_id,
        course_id: location?.state?.video?.video_id,
        type: "videos",
        token_value: userData?.token_value,
      };
      axios
        .post(
          base_url + "/user/student_question/select_course_my_questions.php",
          JSON.stringify(data_send)
        )
        .then(async (res) => {
          setQues(res.data.message);
          if (res.data.status == 'out') {
            await handleLogOut();
            localStorage.clear();
            window.location.reload();
          } else {
            dispatch(showToogleTooltib());
          }
        })
        .catch((e) => {
          console.log(e);
          dispatch(showToogleTooltib());
        })
        .finally(() => {
          setPageLoading(false);
        });
    }
  };
  const handleAddText = () => {
    if (!text || !text?.length) {
      return;
    }
    setLoad(true);
    const data_send = {
      text,
      student_id: userData.student_id,
      course_id: location?.state?.video?.video_id,
      type: "videos",
      token_value: userData?.token_value,
    };

    axios
      .post(
        base_url + "/user/student_question/insert_qus.php",
        JSON.stringify(data_send)
      )
      .then(async (res) => {
        if (res.data.status == "success") {
          getCourseQuestions();
          setText("");
          toast.success("Done");
        } else if (res.data.status == "error") {
          dispatch(showToogleTooltib());
          toast.error(res.data.message);
        } else if (res.data.status == 'out') {
          // localStorage.clear();
          // await handleLogOut();
          // window.location.reload();
        }
      })
      .finally(() => {
        setLoad(false);
      })
      .catch((e) => {
        console.log(e);
        dispatch(showToogleTooltib());
      });
  };
  if (!location?.state) {
    navigate(-1);
  }
  useEffect(() => {
    getCourseQuestions();
  }, [type]);

  return (
    <div className="course_questions_page">
      <div className="cour_name">
        <h5>{location?.state?.video.video_title}</h5>
        <FaArrowLeft
          onClick={() => {
            navigate(
              "/CourseContent?course_id=" +
                location?.state?.course_data?.course_id +
                "&course_name=" +
                location?.state?.course_data?.course_name +
                "&r=" +
                location?.state?.course_data?.finished_rate,
              {
                state: { course: location?.state?.course_data },
              }
            );
          }}
        />
      </div>
      <div className="chat">
        <div className="type">
          <button
            onClick={() => {
              setType("my");
            }}
            className={type == "my" ? "active" : ""}
          >
            My Questions
          </button>
          <button
            onClick={() => {
              setType("all");
            }}
            className={type == "all" ? "active" : ""}
          >
            All Questions
          </button>
        </div>
        {pageLoading ? (
          <Spinner />
        ) : ques && ques?.length ? (
          ques?.map((item, index) => {
            return (
              <div key={index} className="ques">
                {index == 0 ? null : (
                  <div className="det_line">
                    <h5>{item.question}</h5>
                  </div>
                )}
                <div className="questions_cont">
                  <div className="question">
                    <div className="stu_data">
                      <img
                        style={{ width: "30px" }}
                        src={require("../../assets/stu.png")}
                        alt=""
                      />
                      <span>{item.student_name}</span>
                    </div>
                    <h5>{item.question_text}</h5>
                    <div className="time">
                      <p>{moment(item.time).format("LLL")}</p>
                    </div>
                  </div>
                </div>
                <div className="replay">
                  <div className="elm_name">
                    <img
                      style={{ width: "30px" }}
                      src={require("../../assets/log.png")}
                      alt=""
                    />
                    <span>DR.Elmatary</span>
                  </div>
                  <h5>{item.question_replay}</h5>
                </div>
              </div>
            );
          })
        ) : null}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleAddText();
          }}
          className="add_new_ques"
        >
          <input
            value={text}
            onChange={(e) => {
              setText(e.target.value);
            }}
            type="text"
            placeholder="Type A Question"
          />
          {load ? (
            <button
              disabled={true}
              style={{ backgroundColor: "transparent", border: "none" }}
            >
              <Spinner />
            </button>
          ) : (
            <button style={{ backgroundColor: "transparent", border: "none" }}>
              <img src={require("../../assets/send.png")} alt="" />
            </button>
          )}
        </form>
      </div>
    </div>
  );
};

export default VideoQuestions;
