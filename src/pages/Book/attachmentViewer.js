/* eslint-disable jsx-a11y/iframe-has-title */
import axios from "axios";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { base_url } from "../../constants";

function AttachmentViewer(props) {
  const [image, setImage] = useState(null);
  const [params] = useSearchParams();
  const getAttachment = async () => {
    try {
      const attachment = await axios.post(
        base_url + "/admin/books/attachments/select_attachments.php",
        {
          att_code: params?.get("code"),
        }
      );
      setImage(attachment?.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAttachment();
  }, []);
  return (
    <div style={{ width: "100%", minHeight: "100vh", position: "relative" }}>
      {image?.type == "image" ? (
        <img
          style={{
            width: "min(800px, 100%)",
            minHeight: "700px",
            objectFit: "contain",
            margin: "20px auto 20px",
            borderRadius: "10px",
          }}
          src={image?.attachment_link}
          alt=""
        />
      ) : (
        // eslint-disable-next-line react/jsx-no-comment-textnodes
        <div> 
          // eslint-disable-next-line jsx-a11y/iframe-has-title, jsx-a11y/iframe-has-title, jsx-a11y/iframe-has-title
          <iframe 
          src={image?.attachment_link?.replace("share", "embed")}
          frameborder="0"
          webkitallowfullscreen
          mozallowfullscreen
          allowfullscreen> 
          </iframe>
          </div>
      
      )}
    </div>
  );
}

export default AttachmentViewer;
