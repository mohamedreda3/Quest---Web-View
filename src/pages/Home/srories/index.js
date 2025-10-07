import React from "react";
import "./style.css";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import { star } from "../../../assets/svgIcons";

const StoryContainer = () => {
  const slides = [
    {
      content: `
انا مخلص کلیه من ۱۱ سنه و عمری م هنسی معلومه دكتور مطرى قالها باسلوبه الجميل اللي يخليك تحب تذاكر جراحه فعلا
و الصراحه انا متعلمتش جراحه بس من دكتور مطرى انا اتعلمت حاجات اكتر كمان زى انك تفكر ازای ممکن
تواكب العصر اللى انت فيه و ترضى كل الاذواق و الطباع
طالب دحيح : عنده text book رهيب
طالب عايز الخلاصه : في surgitoons
طالب مستعجل و عايز mcqs عنده tweets with
mcq points
طالب ماسك ال ipad على طوول : عنده
application
اکثر حد قدوه فى حته انك كل م تصرف على نفسك و تطور نفسك كل م هتبقى اكبر و تبقى في حته تانيه
حقیقی قدوه
Miss you so much prof George Adel (class 2013)`,
      student: "George Adel",
      university: "Ain Shams University, 5th Year"
    },
    {
      content: `
الابليكشن جميل جدا وانعكاس بسيط عن شخصية دكتور مطري العظيمة واسلوبه السهل البسيط والممتع
وانا بناشد الدكتور يحققك كلامه ويجوزني واحدة مبتعرفش تحل إم سي كيو`,
      student: "Assem Ahmed",
      university: "Cairo University, 4th Year"
    },
    {
      content: `
ربنا يبارك فى علمك و صحتك يا دكتور مطرى بجد حضرتك اثرت فينا تأثیر کبیییییییررررر و جمیییییییلللللل
انا كل ما اشرح لحد حاجة احكيله على حضرتك في الشرح
ربنا يجعله في ميزان حسناتك
انت رتبت دماغنا`,
      student: "Amira Maher",
      university: "Helwan University, 3rd Year"
    }
  ];

  return (
    <div className="stories_container">
      <img
        src="https://m.media-amazon.com/images/I/41igP7nvbEL._AC_SY580_.jpg"
        alt=""
        height={340}
        style={{ borderRadius: "16px" }}
      />
      <Swiper
        slidesPerView="1"
        mousewheel={true}
        direction="vertical"
        modules={[Pagination]}
        pagination={{ clickable: true }}
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={index}>
            <div className="story-container">
              <div className="story">
                <StoryHeader />
                <StoryEvaluate />
                <StoryContent content={slide.content} />
                <StudentInfo
                  student={slide.student}
                  university={slide.university}
                />
              </div>
              {/* <img
                src="https://res.cloudinary.com/duovxefh6/image/upload/v1709729335/Screenshot_2024-03-06_125701-removebg-preview_lzfrg7.png"
                alt=""
                width={100}
              /> */}
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

const StoryHeader = () => {
  return (
    <h1
      className="story-header firstFont firstFontEffect"
      style={{ letterSpacing: "3px" }}
    >
      What’s our Real Student Stories About Our Work & Passion?
    </h1>
  );
};

const StoryEvaluate = () => {
  return (
    <div className="stars">
      {Array(5)
        .fill(0)
        .map((_, index) => (
          <span key={index} className="star">
            {star}
          </span>
        ))}
    </div>
  );
};

const StoryContent = ({ content }) => {
  return <p className="story-content thirdFont">{content}</p>;
};

const StudentInfo = ({ student, university }) => {
  return (
    <div className="student-info thirdFont">
      <p>{student}</p>
      <p>{university}</p>
    </div>
  );
};

export default StoryContainer;
