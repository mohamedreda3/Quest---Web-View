import axios from "axios";
import CryptoJS from "crypto-js";
import React, { useEffect, useRef, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { base_url } from "./../../constants/index";
import PDFViewer from "./PDFViewer.js";
import "./books.css";
import { Loader } from "rsuite";

const Book = () => {
  const [params] = useSearchParams();
  const localData = localStorage.getItem("elmataryapp");
  const [pdf, setPdf] = useState(null);
  const [attspdf, setattspdf] = useState(null);
  const decryptedBytes = {};
  const userData = {};
  const navigate = useNavigate();
  const [fileBlob, setFileBlob] = useState(null);
console.log("params", params)
  const getData = () => {
    axios
      .post("https://camp-coding.tech/quest/platform/user/home/book_option/new-select-web-view-book.php",{
        book_id: params?.get("book_id"),
        student_id: params?.get("student_id"),
        unit_id: params?.get("unit_id"),
      })
      .then((response) => {
        
        setPdf(response?.data?.message || null);
        // const byteCharacters = atob(response?.data?.message.file_buffer);
        // const byteNumbers = new Array(byteCharacters.length);

        // for (let i = 0; i < byteCharacters.length; i++) {
        //   byteNumbers[i] = byteCharacters.charCodeAt(i);
        // }

        // const byteArray = new Uint8Array(byteNumbers);
        // const arrayBuffer = byteArray.buffer;

        setFileBlob(response?.data?.message?.book_url); 
        console.log(response?.data?.message?.book_url);
      })
      .catch((error) => {
        setFileBlob(null);
        console.log(error);
      });
  };

  useEffect(() => {
    getData();
  }, []);

  const [pdfName, setPdfName] = useState(null);

  useEffect(() => {
    setattspdf(pdf?.book_att?.student_atts);
    if (pdf) setPdfName(pdf?.book_name);
  }, [pdf]);

  const setUserAttachmentForCurrentPage = (
    type,
    pageNum,
    setVoiceUrl,
    setVoice,
    arr
  ) => {
    if (!attspdf) return null;
    setVoice("Open");
    setVoiceUrl(
      attspdf.filter((att) => parseInt(att.page_number) === pageNum)
        ? attspdf.filter((att) => parseInt(att.page_number) === pageNum)
        : null
    );
  };

  const containerRef = useRef(null);
  const [PSPDFKitScroll, setyPSPDFKitScroll] = useState(0);
  useEffect(() => {
    const pspdfContainer = document.querySelector(".PSPDFKit-Container");
    const handleMutation = (mutationsList) => {
      for (let mutation of mutationsList) {
        if (mutation.type === "childList" || mutation.type === "attributes") {
          if (pspdfContainer) {
            const shadowRoot = pspdfContainer.shadowRoot;
            const scrolled = shadowRoot.querySelector(".PSPDFKit-Scroll");
            if (scrolled) {
              scrolled.addEventListener("scroll", (e) => {
                const pageElements =
                  shadowRoot.querySelectorAll(".PSPDFKit-Spread");
                pageElements.forEach((pageElement) => {
                  const div = document.createElement("div");
                  div.className = "absolutedDiv";
                  div.style.position = "absolute";
                  div.style.width = "100%";
                  div.style.minHeight = "47px";
                  div.style.backgroundColor = "white"; 
                  div.style.top = "34px";
                  if (!pageElement.querySelector(".absolutedDiv")) {
                    pageElement.appendChild(div);
                  }
                });
              });
            }
            const pageElements =
              shadowRoot.querySelectorAll(".PSPDFKit-Spread");

            pageElements.forEach((pageElement) => {
              const div = document.createElement("div");
              div.className = "absolutedDiv";

              console.log(pageElement);
              div.style.position = "absolute";
              div.style.width = "100%";
              div.style.minHeight = "47px";
              div.style.backgroundColor = "white"; // Use 'backgroundColor' instead of 'background' for color
              div.style.top = "34px";

              if (!pageElement.querySelector(".absolutedDiv")) {
                pageElement.appendChild(div);
              }
            });
          }
        }
      }
    };

    // Create a mutation observer to monitor DOM changes
    const observer = new MutationObserver(handleMutation);
    observer.observe(document.body, {
      childList: true,
      subtree: true,
      attributes: true,
    });

    // Scroll event listener
    const handleScroll = () => {
      console.log("Scroll detected!");
      // Add any logic you want to trigger during scroll events
    };

 observer.disconnect(); // Clean up the mutation observer
      window.removeEventListener("scroll", handleScroll); // Clean up the scroll event listener
    // Attach the scroll event listener
    window.addEventListener("scroll", handleScroll);

    // Cleanup on component unmount
    return () => {
      observer.disconnect(); // Clean up the mutation observer
      window.removeEventListener("scroll", handleScroll); // Clean up the scroll event listener
    };
  }, []);
  return (
    <div className="books_page">
      {!fileBlob ? (
        <div
          style={{
            width: "100%",
            height: "100vh", 
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Loader />
        </div>
      ) : (
        <div className="books">
          {fileBlob && (
            <PDFViewer
              containerRef={containerRef}
              getData={getData}
              pdfName={pdfName}
              setyPSPDFKitScroll={setyPSPDFKitScroll}
              document={fileBlob}
              ann={pdf?.annotation}
              adminAtts={pdf?.book_att?.admin_atts}
              userAtts={attspdf}
              setUserAttachmentForCurrentPage={setUserAttachmentForCurrentPage}
            />
          )}
        </div>
      )}
    </div>
  );
};

export default Book;
