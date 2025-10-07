import { useEffect, useState } from "react";
import { AccordionCustomIcon } from "../Accordian/Accordian";
import styles from "./TableofContent.module.css";
import "../../style.css";
export default function TableofContent({
  handleSelectVideo,
  videoObj,
  showContent,
  Videos,
  setTab,
  setIndex,
  index,
  tab,
  selectedVideo,
}) {
  const [link, setLink] = useState();
  const [player, setPlayer] = useState(
    videoObj?.link_video && videoObj?.link_video?.length ? 1 : 2
  );
  useEffect(() => {
    setPlayer(videoObj?.link_video && videoObj?.link_video?.length ? 1 : 2);
  }, [videoObj]);
  const players = [
    videoObj?.link_video &&
      videoObj?.link_video?.length && {
        id: 1,
        label: "Player 1",
      },
    videoObj?.loom_url &&
      videoObj?.loom_url?.length && { id: 2, label: "Player 2" },
  ];
  const getYoutibeUrl = (youtube_id) => {
    if (youtube_id && youtube_id.length) {
      const regExp =
        /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
      const match = youtube_id.match(regExp);
      if (match && match[2].length === 11) {
        setLink(match[2]);
      }
    }
  };
  useEffect(() => {
    if (player == 1) {
      getYoutibeUrl(videoObj?.link_video);
    } else {
      setLink(videoObj?.loom_url?.split("share/")[1]);
    }
  }, [player, videoObj]);

  return (
    <div className="videoscolumnDiv">
      <div
        className="players"
        style={{
          margin: "20px",
          display: "flex",
          gap: "20px",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {players?.map((item) => {
          return item?.label && item?.label?.length ? (
            <button
              className={player == item?.id ? "btn btn-success firstFont" : "btn firstFont"}
              onClick={() => setPlayer(item?.id)}
            >
              {item?.label}
            </button>
          ) : null;
        })}
      </div>
      <div
        className={`${styles.container} my-8 videoContentTwo`}
        style={{ width: "100%", minHeight: "100vh" }}
      >
        <div className={styles.video + " showVideo"}>
          {player == 1 ? (
            <iframe
              // width="560"
              className="publitioPlaceHolder"
              height="415"
              src={`https://www.youtube.com/embed/${link}?autoplay=0&cc_lang_pref=en-GB&cc_load_policy=1&controls=2&rel=0&hl=en-GB&enablejsapi=1&origin=https%3A%2F%2Fsupport.google.com&widgetid=1&fs=1`}
              title="YouTube video player"
              frameborder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share; allowfullscreen;fullscreen;"
              allowfullscreen
              onContextMenu={(e) => e.preventDefault()}
            ></iframe>
          ) : player == 2 ? (
            // eslint-disable-next-line jsx-a11y/iframe-has-title
            <iframe
              src={"https://www.loom.com/embed/" + link}
              // width="560"
              height="415"
              frameborder="0"
              webkitallowfullscreen
              mozallowfullscreen
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share; allowfullscreen;fullscreen;"
              allowfullscreen={true}
            ></iframe>
          ) : null}
        </div>
        {showContent ? (
          <div className={`${styles.accordian} pe-4`}>
            <AccordionCustomIcon
              handleSelectVideo={handleSelectVideo}
              Videos={Videos}
              setTab={setTab}
              selectedVideo={selectedVideo}
              setIndex={setIndex}
              index={index}
              tab={tab}
              videoObj={videoObj}
            />
          </div>
        ) : null}
      </div>
    </div>
  );
}
