import React, { useEffect, useRef, useState } from 'react';
import './style.css';

const VideoLoader = ({ setAllLoading }) => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
      setAllLoading(false);
    }, 10000);
  }, []);

  // useEffect(() => {
  //   if (isLoading) {
  //     document.body.style.overflow = "hidden";
  //   } else {
  //     document.body.style.overflow = "initial";
  //   }
  // }, [isLoading]);

  return (
    <div className={`video-loader ${isLoading ? 'loading' : ''}`}>
      <img
        src={require("../../assets/gifs/output-onlinegiftools.gif")}
        alt=""
      />
    </div>
  );
};

export default VideoLoader;
