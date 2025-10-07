import axios from "axios";
import React, { useState, useRef, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { toast } from "react-toastify";
import styled from "styled-components";
const PRIMARY_COLOR = "#6c5ce7";
const PRIMARY_HOVER = "#5b4dd6";
const DANGER_COLOR = "#ef4444";
const DANGER_HOVER = "#f05959";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: stretch;
  justify-content: flex-start;
  padding: 20px;
  background: #ffffff;
  border-radius: 14px;
  box-shadow: 0 6px 18px rgba(0, 0, 0, 0.08);
  width: 100%;
  max-width: 720px;
  margin: 0 auto;
  font-family: "Arial", sans-serif;
  z-index: 100000;
  border: 1px solid #e5e7eb;
`;

const Button = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${(props) => (props.isRecording ? DANGER_COLOR : PRIMARY_COLOR)};
  color: white;
  padding: 12px 20px;
  border: none;
  border-radius: 12px;
  cursor: pointer;
  font-size: 16px;
  margin: 12px 0 8px 0;
  transition: background-color 0.3s;
  width: 160px;
  box-shadow: 0 6px 14px rgba(0, 0, 0, 0.15);

  &:hover {
    background-color: ${(props) => (props.isRecording ? DANGER_HOVER : PRIMARY_HOVER)};
  }

  svg {
    margin-right: 10px;
    fill: white;
  }
`;

const AudioPlayerContainer = styled.div`
  position: relative;
  margin-top: 14px;
  width: 100%;
  background: #f8fafc;
  border: 1px solid #eaecef;
  border-radius: 12px;
  padding: 10px;
`;

const AudioPlayer = styled.audio`
  width: 100%;
  outline: none;
  background: transparent;
`;

const ActionButton = styled(Button)`
  background-color: ${(props) => props.color};
  margin-bottom: 0; // Remove the bottom margin for row alignment
  width: auto;
  padding: 10px 14px;
  border-radius: 10px;

  &:hover {
    background-color: ${(props) => props.$hoverColor};
  }
`;

const ActionsRow = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 10px;
  width: 100%;
  margin-top: 12px;
`;

const Input = styled.input`
  padding: 12px 14px;
  border: 1px solid #e5e7eb;
  border-radius: 12px;
  margin-top: 10px;
  width: 100%;
  max-width: 100%;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
  font-size: 14px;
  background: #ffffff;
  outline: none;

  &:focus {
    border-color: #3b82f6;
    box-shadow: 0 0 0 4px rgba(59, 130, 246, 0.1);
  }
`;

const ContentGrid = styled.div`
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  gap: 10px;
`;

const EmptyState = styled.div`
  width: 100%;
  padding: 24px;
  text-align: center;
  color: #6b7280;
  border: 1px dashed #e5e7eb;
  border-radius: 12px;
  background: #fafafa;
`;

const Badge = styled.span`
  background: rgba(108, 92, 231, 0.12);
  color: ${PRIMARY_COLOR};
  border: 1px solid rgba(108, 92, 231, 0.2);
  padding: 2px 8px;
  border-radius: 999px;
  font-size: 12px;
  margin-left: 8px;
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 12px;

  h3 {
    margin: 0;
    font-size: 18px;
    color: #222;
  }

  span {
    font-size: 12px;
    color: #6b7280;
  }
`;

const RecordingCard = styled.div`
  width: 100%;
  margin-bottom: 12px;
  border: 1px solid #eaecef;
  background: #ffffff;
  border-radius: 12px;
  padding: 12px;
  display: flex;
  align-items: center;
  gap: 12px;
`;

const RecordingMeta = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
  flex: 1;
`;

const RecordingTitle = styled.div`
  color: ${PRIMARY_COLOR};
  font-weight: 600;
  font-size: 14px;
`;

const Label = styled.label`
  font-size: 12px;
  color: #6b7280;
  margin-top: 12px;
`;

const VoiceRecorder = (data) => {
  const [isRecording, setIsRecording] = useState(false);
  const [audioURL, setAudioURL] = useState("");
  const [audioBlob, setAudioBlob] = useState(null);
  const [voiceName, setVoiceName] = useState("");
  const [recordings, setRecordings] = useState([]); // State for recordings
  const mediaRecorderRef = useRef(null);
  const audioChunksRef = useRef([]);
  // useEffect(() => {
  //   if (data?.data?.atts) {
  //     setRecordings(data?.data?.atts);
  //   }
  // }, [data?.data?.atts]);
  const getAtts =  ()=>{
    axios.get(`https://camp-coding.tech/quest/platform/user/home/book_option/get_annotation_file.php?book_id=${params?.get("book_id")}&student_id=${params?.get("student_id")}&unit_id=${params?.get("unit_id")}&page_number=${data?.data?.voice}`).then((res) => {
      setRecordings(res?.data || [])
     })
  }
  useEffect(() => {
    getAtts()
  }, [data?.data?.voice]);
  const startRecording = async () => {
    setIsRecording(true);
    audioChunksRef.current = [];

    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      mediaRecorderRef.current = new MediaRecorder(stream);

      mediaRecorderRef.current.ondataavailable = (event) => {
        if (event.data.size > 0) {
          audioChunksRef.current.push(event.data);
        }
      };

      mediaRecorderRef.current.onstop = () => {
        const audioBlob = new Blob(audioChunksRef.current, {
          type: "audio/mp3"
        });
        const audioUrl = URL.createObjectURL(audioBlob);
        setAudioBlob(audioBlob);
        setAudioURL(audioUrl);
      };

      mediaRecorderRef.current.start();
    } else {
      alert("getUserMedia is not supported in this browser");
    }
  };

  const stopRecording = () => {
    setIsRecording(false);
    mediaRecorderRef.current.stop();
  };

  const handleRecordingClick = () => {
    if (isRecording) {
      stopRecording();
    } else {
      startRecording();
    }
  };
  const [params] = useSearchParams();
  const handleRemoveAudio = () => {
    setAudioURL("");
    setAudioBlob(null);
    audioChunksRef.current = [];
  };

  const handleUploadAudio = async () => {
    if (!audioBlob) return;

    const formData = new FormData();
    formData.append("voice", audioBlob);
    formData.append("voice_name", voiceName || "recording.mp3");

    try {
      const response = await fetch(
        "https://dr-elmatary.com/Matary_site/upload_notes.php",
        {
          method: "POST",
          body: formData
        }
      );

      const result = await response.json();
      if (response.ok && result.status == "success") {
        const insertAttResponse = await fetch(
          "https://camp-coding.tech/quest/platform/user/home/book_option/save_attachments_audio.php",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify({
              voice_name: voiceName || "Recording",
              // student_id: data?.data?.student_id,
              // token_value: data?.data?.token_value,
              // book_id: data?.data?.book_id,
              // page_number: data?.data?.page_number,
              // voice_url: result.message,
              // voice_name: voiceName || "Recording",
              book_id: params?.get("book_id"),
              student_id: params?.get("student_id"),
              unit_id: params?.get("unit_id"),
              page_number: data?.data?.voice,
              audio_value: result.message
            })
          }
        );

        console.log(data);

        const insertResult = await insertAttResponse.json();

        if (insertResult?.status == "success") {
          toast.success("Voice inserted successfully!");
        getAtts()

          // Update the list of recordings
          setRecordings([
            ...recordings,
            {
              att_id: insertResult.att_id,
              voice_url: result.message,
              voice_name: voiceName || "Recording",
              att_id: insertResult.att_id
            }
          ]);
          data?.data?.getData();
        } else {
          toast.error("Failed to insert voice.");
        }
      } else {
        alert("Failed to upload audio.");
      }
    } catch (error) {
      alert("Error uploading audio.");
      console.error("Error:", error);
    }
  };

  const handleDeleteAudio = async (attId) => {
    try {
      const response = await fetch(
        "https://camp-coding.tech/quest/platform/user/home/book_option/delete_att_file.php",
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            book_id: params?.get("book_id"),
            student_id: params?.get("student_id"),
            unit_id: params?.get("unit_id"),
            page_number: data?.data?.voice,
            voice_book_att_id: attId
          })
        }
      );

      const result = await response.json();

      if (result?.status == "success") {
        toast.success("Voice deleted successfully!");
        getAtts()
        // Update the list of recordings after deletion
        
        data?.data?.getData();
      } else {
        toast.error("Failed to delete voice.");
      }
    } catch (error) {
      toast.error("Error deleting voice.");
      console.error("Error:", error);
    }
  };

  return (
    <Container>
      <Header>
        <h3>
          Voice Notes
          <Badge>{recordings?.length || 0}</Badge>
        </h3>
        <span>Page {data?.data?.voice}</span>
      </Header>

      <ContentGrid>
        <div>
          <Button onClick={handleRecordingClick} isRecording={isRecording}>
            {isRecording ? (
              <>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                  <path d="M18 6l-12 12h12z" />
                </svg>
                Stop
              </>
            ) : (
              <>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                  <path d="M12 2a3.5 3.5 0 013.5 3.5V11a3.5 3.5 0 01-7 0V5.5A3.5 3.5 0 0112 2zm-1.5 10h3a1.5 1.5 0 001.5-1.5V5.5a1.5 1.5 0 00-3 0v5.5H11v-5.5a1.5 1.5 0 10-3 0V11c0 .818.548 1.5 1.5 1.5zm6 1.5v.5A6.5 6.5 0 0112 20.5a6.5 6.5 0 01-6.5-6.5v-.5h-1v.5a7.5 7.5 0 007.5 7.5 7.5 7.5 0 007.5-7.5v-.5h-1z" />
                </svg>
                Record
              </>
            )}
          </Button>

         
          {audioURL && (
            <>
             <Label>Voice title</Label>
          <Input
            type="text"
            value={voiceName}
            onChange={(e) => setVoiceName(e.target.value)}
            placeholder="Enter voice title (optional)"
          />

              <AudioPlayerContainer>
                <AudioPlayer controls src={audioURL} />
              </AudioPlayerContainer>
              <ActionsRow>
                <ActionButton onClick={handleRemoveAudio} color="#f44336" $hoverColor="#e57373">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                    <path d="M3 6h18v2H3V6zm3 4h12v12H6V10zm4-8h4v2h-4V2z" />
                  </svg>
                  Remove
                </ActionButton>
                <ActionButton onClick={handleUploadAudio} color="#2196f3" $hoverColor="#64b5f6">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                    <path d="M14.12 8.29l-3.3 3.3L10 12.7l4.59-4.59L19 11v9H5v-9l4.41-4.41 1.42 1.42zM5 5V3h14v2H5z" />
                  </svg>
                  Upload
                </ActionButton>
              </ActionsRow>
            </>
          )}
        </div>

        <div style={{maxHeight: "300px", overflowY: "auto", display: "flex", flexDirection: "column", gap: "10px", width: "100%"}}>
          {recordings.length > 0 ? (
            recordings.map((item) => (
              <RecordingCard key={item.voice_book_att_id}>
                <RecordingMeta>
                  <RecordingTitle>{item.voice_name || "Recording"}</RecordingTitle>
                  <audio src={item.voice_url} controls></audio>
                </RecordingMeta>
                <ActionButton
                  onClick={() => handleDeleteAudio(item?.voice_book_att_id)}
                  color="#f44336"
                  $hoverColor="#e57373"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24">
                    <path d="M3 6h18v2H3V6zm3 4h12v12H6V10zm4-8h4v2h-4V2z" />
                  </svg>
                  Remove
                </ActionButton>
              </RecordingCard>
            ))
          ) : (
            <EmptyState>No voice notes yet. Record and upload your first note.</EmptyState>
          )}
        </div>
      </ContentGrid>
    </Container>
  );
};

export default VoiceRecorder;
