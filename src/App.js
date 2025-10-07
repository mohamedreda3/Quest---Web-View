import CryptoJS from "crypto-js";
import { useEffect, useState } from "react";
import { Route, Routes, useLocation } from "react-router";
import "rsuite/dist/rsuite.min.css";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/swiper-bundle.css";
import "./App.css";
import "rsuite/dist/rsuite.min.css";

// import ExpandList from './components/ExpandList/ExpandList';
import "react-toastify/dist/ReactToastify.css";
// import { ToastContainer } from 'react-bootstrap';
import axios from "axios";
import { Object } from "core-js";
import "react-loading-skeleton/dist/skeleton.css";
import { ToastContainer } from "react-toastify";
import Book from "./pages/Book/Books";

import { base_url } from "./constants";
import "./newStyle.css";

const localData = localStorage.getItem("elmataryapp");
const decryptedBytes = {};
const userData ={};
export const handleLogOut = async () => {
  const data_send = {
    book_id: 2966,
    student_id: 27482,
    unit_id: 3532
  };

  axios
    .post(
      "https://camp-coding.tech/quest/platform/user/home/book_option/select-web-view-book.php",
      JSON.stringify(data_send)
    )
    .then(async (res) => {
      if (res.data.status == "success") {
        localStorage.clear();
        window.location.reload();
      } else if (res.data.status == "error") {
      } else if (res.data.status == "out") {
        await handleLogOut();
        localStorage.clear();
        window.location.reload();
      }
    })
    .catch((e) => console.log(e));

  // window.location.reload()
};
function App() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
    // if (userData) refreshToken();
  }, [pathname, userData]);

  const [allLoading, setAllLoading] = useState(true);
  return (
    <>
      <>
        {/* {!allLoading ? ( */}
        <>
          {/* <AnimatedTooltipButton /> */}
          {/* <Header /> */}

          <Routes>
            {userData && Object.keys(userData).length > 0 ? (
              <Route path="*" element={<Book />} />
            ) : (
              <>
                <Route path="*" element={<Book />} />
              </>
            )}
            {/* <Route path='/expand' element={<ExpandList/>}/> */}
          </Routes>
          <ToastContainer />
          {/* <Footer /> */}
        </>
        {/* ) : (
          <VideoLoader setAllLoading={setAllLoading} allLoading={allLoading} />
        )} */}
      </>
      {/* <ExternalRedirectGuard>

    </ExternalRedirectGuard> */}
    </>
  );
}

export default App;
