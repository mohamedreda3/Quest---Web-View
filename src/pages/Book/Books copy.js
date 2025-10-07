import { useEffect, useRef, useState } from 'react';
import { loadPDF } from './helperFunctions';
import { PDFButtons } from './PDFBUTTONS';
import CryptoJS from 'crypto-js';
import { toast } from 'react-toastify';
import { useSearchParams } from 'react-router-dom';
import Modal from './modal';
import VoiceRecorder from './Recording';

function PDFViewer(props) {
  const containerRef = useRef(null);
  const instanceRef = useRef(null);
  const [page, setPage] = useState(null);
  const [image, setImage] = useState(null);
  const [video, setVideo] = useState(null);
  const [voice, setVoice] = useState(null);
  const [params] = useSearchParams();
  const localData = localStorage.getItem("elmataryapp");
  const decryptedBytes = localData && CryptoJS.AES.decrypt(localData, "111");
  const userData =
    decryptedBytes && JSON.parse(decryptedBytes.toString(CryptoJS.enc.Utf8));
  useEffect(() => {
    if (props.document) {
      let PSPDFKit;
      const container = containerRef.current;
      console.log(props?.ann?.annotation_value);
      if (props?.ann?.annotation_value)
        (async function () {
          PSPDFKit = await import('pspdfkit');
          const instance = await loadPDF({
            XFDF: props?.ann?.annotation_value,
            // instantJSON: JSON.parse(localStorage.getItem("Ann")),
            licenseKey:
              "jhjCG4Oy9Go9L4b6QSdXOSExoHGjzpmK9PKPiE_HNXgIGUr_aVPajD5BhL7lpsNpPaKSktjADGHnhwk6a7KDSBOl4YKw1AS6mDyhbyUOJDjYtdWrfx2qjjNn2G9pho1sfOG6PKntRJO5tIBCKSOpiek6k3dzdHSfHFvlPAa5d4jJ-UpHyNfTzVtM70fvoZ0HwriWHHEJXEcDa4Ie9",
            autoSaveMode: PSPDFKit.AutoSaveMode.INTELLIGENT,
            PSPDFKit,
            container,
            document: props.document,
          });
          instance.addEventListener(
            "viewState.currentPageIndex.change",
            (pageIndex) => {
              setPage(pageIndex);
            }
          );

          instance.setToolbarItems([
            ...PDFButtons,
            {
              type: 'custom',
              id: 'myCustomButton',
              icon: '<svg xmlns="http://www.w3.org/2000/svg" width="2em" height="2em" viewBox="0 0 24 24"><g fill="none" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M7 21h10a4 4 0 0 0 4-4V7.414a1 1 0 0 0-.293-.707l-3.414-3.414A1 1 0 0 0 16.586 3H7a4 4 0 0 0-4 4v10a4 4 0 0 0 4 4"/><path d="M9 3h6v3a1 1 0 0 1-1 1h-4a1 1 0 0 1-1-1zm8 18v-7a1 1 0 0 0-1-1H8a1 1 0 0 0-1 1v7"/><path stroke-linecap="round" d="M11 17h2"/></g></svg>',
              onPress: () => {
                handleSave();
              },
            },
            {
              type: 'custom',
              id: 'fullScreenButton',
              title: "Full Screen",
              onPress: () => {
                const container = document.getElementById("pspdfkitContainer");
                if (container.fullscreenElement) {
                  container.exitFullscreen();
                } else {
                  container?.requestFullscreen();
                }
              },
            },
            {
              type: 'custom',
              id: 'imageViewerButton',
              title: "Image",
              onPress: () => {
                setImage("red");
              },
            },
            {
              type: 'custom',
              id: 'VideoViewerButton',
              title: "Video",
              onPress: () => {
                setVideo("red");
              },
            },
            {
              type: 'custom',
              id: 'VoiceViewerButton',
              title: "Voice",
              onPress: () => {
                setVoice("red");
              },
            },
          ]);

          instanceRef.current = instance;
        })();
      else
        (async function () {
          PSPDFKit = await import('pspdfkit');
          const instance = await loadPDF({
            // instantJSON: JSON.parse(localStorage.getItem("Ann")),
            licenseKey:
              "hjCG4Oy9Go9L4b6QSdXOSExoHGjzpmK9PKPiE_HNXgIGUr_aVPajD5BhL7lpsNpPaKSktjADGHnhwk6a7KDSBOl4YKw1AS6mDyhbyUOJDjYtdWrfx2qjjNn2G9pho1sfOG6PKntRJO5tIBCKSOpiek6k3dzdHSfHFvlPAa5d4jJ-UpHyNfTzVtM70fvoZ0HwriWHHEJXEcDa4Ie9",
            autoSaveMode: PSPDFKit.AutoSaveMode.INTELLIGENT,
            PSPDFKit,
            container,
            document: props.document,
          });
          instance.setToolbarItems([
            ...PDFButtons,
            {
              type: 'custom',
              id: 'myCustomButton',
              icon: '<svg xmlns="http://www.w3.org/2000/svg" width="2em" height="2em" viewBox="0 0 24 24"><g fill="none" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M7 21h10a4 4 0 0 0 4-4V7.414a1 1 0 0 0-.293-.707l-3.414-3.414A1 1 0 0 0 16.586 3H7a4 4 0 0 0-4 4v10a4 4 0 0 0 4 4"/><path d="M9 3h6v3a1 1 0 0 1-1 1h-4a1 1 0 0 1-1-1zm8 18v-7a1 1 0 0 0-1-1H8a1 1 0 0 0-1 1v7"/><path stroke-linecap="round" d="M11 17h2"/></g></svg>',
              onPress: () => {
                handleSave();
              },
            },
            {
              type: 'custom',
              id: 'fullScreenButton',
              title: "Full Screen",
              onPress: () => {
                !document.getElementById("pspdfkitContainer").fullscreenElement
                  ? document
                      .getElementById("pspdfkitContainer")
                      ?.requestFullscreen()
                  : document
                      .getElementById("pspdfkitContainer")
                      ?.exitFullscreen();
              },
            },
            {
              type: 'custom',
              id: 'imageViewerButton',
              title: "Image",
              onPress: () => {
                setImage("red");
              },
            },
            {
              type: 'custom',
              id: 'VideoViewerButton',
              title: "Video",
              onPress: () => {
                setVideo("red");
              },
            },
            {
              type: 'custom',
              id: 'VoiceViewerButton',
              title: "Voice",
              onPress: () => {
                setVoice("red");
              },
            },
          ]);

          instanceRef.current = instance;
        })();
    }
  }, [props.document]);

  const handleSave = async () => {
    if (instanceRef.current) {
      const myHeaders = new Headers();

      const x = await instanceRef?.current?.exportXFDF();
      const requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: JSON.stringify({
          student_id: userData?.student_id,
          token_value: userData?.token_value,
          book_id: params?.get("id"),
          annotation_value: x,
        }),
        redirect: "follow",
      };
      localStorage.setItem("Ann", x);

      fetch(
        "https://dr-elmatary.com/Matary_site/user/books/insert_annotation.php",
        requestOptions
      )
        .then((response) => {
          console.log(response);
          return response.json();
        })
        .then((result) => {
          if (result.status) {
            toast.success(result.message);
          } else {
            toast.error(result.message);
          }
        })
        .catch((error) => console.error(error));
    }
  };

  return (
    <div
      style={{ width: '100%', height: '100vh', position: 'relative' }}
      id="pspdfkitContainer"
    >
      <Modal visible={image} onClose={setImage}></Modal>
      <Modal visible={voice} onClose={setVoice}>
        <VoiceRecorder />
      </Modal>
      <Modal visible={video} onClose={setVideo}>
        <div>
          <iframe
            src="https://www.loom.com/embed/453ce4ab5f054fcf827c2426d8bcafd8?sid=e66bcdff-561a-4636-bec8-8b29957f4ac0"
            frameborder="0"
            webkitallowfullscreen
            mozallowfullscreen
            allowfullscreen
          ></iframe>
        </div>
      </Modal>
      <div ref={containerRef} style={{ width: '100%', height: '100%' }} />
    </div>
  );
}
export default PDFViewer;
