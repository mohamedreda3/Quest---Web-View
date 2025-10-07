import { useEffect, useRef, useState } from 'react';
import { loadPDF } from './helperFunctions';
import { PDFButtons } from './PDFBUTTONS';
import { toast } from 'react-toastify';
import { useSearchParams } from 'react-router-dom';
import Modal from '../Book/modal';
import VoiceRecorder from '../Book/Recording';
import CryptoJS from 'crypto-js';

function PDFViewer(props) {
  const containerRef = useRef(null);
  const instanceRef = useRef(null);
  const [voiceOpen, setVoiceOpen] = useState(false);
  const [voicePage, setVoicePage] = useState(null);
  const [voiceUrl, setVoiceUrl] = useState(false);
  const [params] = useSearchParams();
  const localData = localStorage.getItem("elmataryapp");
  const decryptedBytes = localData && CryptoJS.AES.decrypt(localData, "111");
  const userData =
    decryptedBytes && JSON.parse(decryptedBytes.toString(CryptoJS.enc.Utf8));

  useEffect(() => {
    let PSPDFKit;
    const container = containerRef.current;
    (async function () {
      PSPDFKit = await import('pspdfkit');

      PSPDFKit.unload(container);

      const instance = await loadPDF({
        PSPDFKit,
        container,
        document: props.document,
      });
      
      console.log('Instance loaded:', instance);
      console.log('Instance methods:', Object.getOwnPropertyNames(instance));
      try {
        console.log('PDFButtons:', PDFButtons);
        
        // Set toolbar items with voice button immediately
        const toolbarItems = [
          ...(PDFButtons || []),
          // {
          //   type: 'custom',
          //   id: 'voiceButton',
          //   title: "Voice Recorder",
          //   icon: '<svg xmlns="http://www.w3.org/2000/svg" width="2em" height="2em" viewBox="0 0 24 24"><path fill="currentColor" d="M12 2a3 3 0 0 1 3 3v6a3 3 0 0 1-3 3a3 3 0 0 1-3-3V5a3 3 0 0 1 3-3m7 9c0 3.53-2.61 6.44-6 6.93V21h-2v-3.07c-3.39-.49-6-3.4-6-6.93h2a5 5 0 0 0 10 0h2Z"/></svg>',
          //   onPress: () => {
          //     console.log('Voice button clicked!');
          //     const currentPage = instanceRef.current?.viewState?.currentPageIndex + 1;
          //     console.log('Current page:', currentPage);
          //     setVoicePage(currentPage);
          //     setVoiceOpen(true);
          //     console.log('Voice modal should open, voiceOpen:', true);
          //   },
          // },
        ];
        
        instance.setToolbarItems(toolbarItems);
        console.log('Toolbar items set successfully');
        
      } catch (error) {
        console.error('Error setting toolbar items:', error);
      }

      instanceRef.current = instance;
    })();

    return () => PSPDFKit && PSPDFKit.unload(container);
  }, [props.document]);

  const handleSave = async () => {
    if (instanceRef.current) {
      const buffer = await instanceRef.current.exportPDF();
      const blob = new Blob([buffer], { type: 'application/pdf' });
      const myHeaders = new Headers();

      const formdata = new FormData();
      formdata.append("voice", blob);
      formdata.append("voice_name", "Mohammeed");

      const requestOptions = {
        method: "PUT",
        headers: myHeaders,
        body: formdata,
        redirect: "follow",
      };

      fetch(
        "https://dr-elmatary.com/Matary_site/upload_notes.php",
        requestOptions
      )
        .then((response) => {
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
      {/* Test button to manually open modal */}
      <button 
        onClick={() => {
          console.log('Test button clicked');
          setVoiceOpen(true);
        }}
        style={{
          position: 'absolute',
          top: '10px',
          right: '10px',
          zIndex: 1000,
          padding: '10px',
          background: 'red',
          color: 'white',
          border: 'none',
          borderRadius: '5px',
          cursor: 'pointer'
        }}
      >
        Test Modal
      </button>
      {console.log('Rendering modal, voiceOpen:', voiceOpen)}
      {voiceOpen && (
        <Modal
          visible={voiceOpen}
          onClose={() => {
            console.log('Modal closing');
            setVoiceOpen(false);
            setVoiceUrl(null);
          }}
        >
          <VoiceRecorder
            data={{
              student_id: userData?.student_id,
              token_value: userData?.token_value,
              page_number: voicePage,
              book_id: params?.get("id"),
              atts: voiceUrl ? voiceUrl : [],
              getData: props?.getData,
              voice: voicePage,
              arr: props?.userAtts,
              voiceUrl,
              setVoiceUrl,
              setVoice: () => setVoiceOpen(false),
              setUserAttachmentForCurrentPage:
                props?.setUserAttachmentForCurrentPage
            }}
          />
        </Modal>
      )}
      <div ref={containerRef} style={{ width: '100%', height: '100%' }} />
    </div>
  );
}
export default PDFViewer;
