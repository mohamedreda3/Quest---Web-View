import { useNavigate } from "react-router";
import CourseIntroVideo from "../../CourseInfo/CourseIntroVideo/CourseIntroVideo";
import PopUp from "../../../../components/popup";
import { useState } from "react";

export default function About({ course }) {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  return (
    <section className="about-page mx-4 bg-white rounded-3xl py-8 px-10 flex justify-between align-middle gap-10">
      <PopUp open={open} setOpen={setOpen} title={"Enter Course Card Code"}>
        <CourseIntroVideo />
      </PopUp>
      <div className="flex flex-col max-w-[340px] about-text">
        <h2 className="text-[#597B82] text-2xl">{course?.course_name}</h2>
        <p className="text-[#597B82] my-2 text-sm leading-5">
          {course?.course_content}
        </p>
        {course?.units[0]?.videos[0]?.own || course?.own
          ? "You Subscribed This Course"
          : null}
        <button
          className="bg-[#5046c4] text-white w-fit py-2 px-6 my-3 rounded-lg"
          onClick={() => {
            return course?.units[0]?.videos[0]?.own || course?.own
              ? navigate(
                  "/CourseContent?course_id=" +
                    course?.course_id +
                    "&course_name=" +
                    course?.course_name +
                    "&r=" +
                    course?.finished_rate,
                  {
                    state: { course: course },
                  }
                )
              : navigate("/Subscribe");
          }}
        >
          Enroll Now!
        </button>
      </div>
      <div className="rounded-3xl shadow-2xl flex flex-col p-5 about-box">
        <div>
          <p className="text-[#597B82] text-[12px]">Course Details</p>
          <p className="text-[#597B82] text-[12px]">
            Get insight into a topic and learn the fundementals
          </p>
        </div>

        <div className="bg-[#597B82] w-full h-[1px] my-1"></div>

        <div className="flex flex-wrap align-items-center align-middle gap-7 text-[#597B82] text-[11px] about-icons">
          <p className="text-[12px]">
            <div class="ratings">
              {Array(course?.rate ? parseInt(course?.rate) : 0)
                .fill(0)
                .map((item) => {
                  return (
                    <img
                      src="https://raw.githubusercontent.com/mustafadalga/ratings-card/461b28d30e6d5b4475e0f78d2f65700674808565/assets/img/star2.svg"
                      alt=""
                    />
                  );
                })}
              {Array(5 - (course?.rate ? parseInt(course?.rate) : 0))
                .fill(0)
                .map((item) => {
                  return (
                    <img
                      src="https://res.cloudinary.com/duovxefh6/image/upload/v1710597956/purepng.com-grey-starstargeometricallydecagonconcavestardomclipartblackgrey-1421526502793oblca_ca8lyn.png"
                      alt=""
                    />
                  );
                })}
              {/* {course?.rate} */}
            </div>
          </p>
          <p className="flex gap-1 my-0 align-middle">
            <span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="#5046c4"
                className="w-4 h-4"
              >
                <path
                  fillRule="evenodd"
                  d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z"
                  clipRule="evenodd"
                />
              </svg>
            </span>
            <span>({course?.users_review} Reviews)</span>
          </p>
          <p className="flex gap-1 my-0 align-middle">
            <span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="#5046c4"
                className="w-4 h-4"
              >
                <path d="M7.493 18.5c-.425 0-.82-.236-.975-.632A7.48 7.48 0 0 1 6 15.125c0-1.75.599-3.358 1.602-4.634.151-.192.373-.309.6-.397.473-.183.89-.514 1.212-.924a9.042 9.042 0 0 1 2.861-2.4c.723-.384 1.35-.956 1.653-1.715a4.498 4.498 0 0 0 .322-1.672V2.75A.75.75 0 0 1 15 2a2.25 2.25 0 0 1 2.25 2.25c0 1.152-.26 2.243-.723 3.218-.266.558.107 1.282.725 1.282h3.126c1.026 0 1.945.694 2.054 1.715.045.422.068.85.068 1.285a11.95 11.95 0 0 1-2.649 7.521c-.388.482-.987.729-1.605.729H14.23c-.483 0-.964-.078-1.423-.23l-3.114-1.04a4.501 4.501 0 0 0-1.423-.23h-.777ZM2.331 10.727a11.969 11.969 0 0 0-.831 4.398 12 12 0 0 0 .52 3.507C2.28 19.482 3.105 20 3.994 20H4.9c.445 0 .72-.498.523-.898a8.963 8.963 0 0 1-.924-3.977c0-1.708.476-3.305 1.302-4.666.245-.403-.028-.959-.5-.959H4.25c-.832 0-1.612.453-1.918 1.227Z" />
              </svg>
            </span>
            <span>98%</span>
          </p>
        </div>

        <div className="text-[#597B82] text-[11px]">
          {course?.level_description}
        </div>

        <div className="bg-[#597B82] w-full h-[1px] my-1"></div>
        <div className="text-[11px] flex flex-col justify-center align-middle w-fit mx-auto">
          <p className="flex gap-5 text-[#597B82] ">
            <span>{course?.hours} hours</span>
            <span> (Approximately)</span>
          </p>
        </div>
      </div>
    </section>
  );
}
