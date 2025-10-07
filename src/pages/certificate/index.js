import React from "react";
import html2canvas from "html2canvas";
import { QRCodeSVG } from "qrcode.react";

function Certificate() {
  const printDocument = () => {
    const input = document.getElementById("divToPrint");
    html2canvas(input, {
      scale: 2,
      useCORS: true,
      scrollX: true,
      scrollY: true,
    }).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const link = document.createElement("a");
      link.href = imgData;
      link.download = "certificate.png";
      link.click();
    });
  };

  const printPdf = () => {
    const input = document.getElementById("divToPrint");
    html2canvas(input, {
      scale: 2,
      useCORS: true,
      scrollX: true,
      scrollY: true,
    }).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const link = document.createElement("a");
      link.href = imgData;
      link.download = "certificate.png";
      link.click();
    });
  };

  return (
    <>
      <div className="rowDiv">
        <button
          className="btn btn-success"
          style={{ width: "fit-content", margin: "10px auto" }}
          onClick={() => printDocument()}
        >
          Save Image
        </button>
        {/* <button
        className="btn btn-success"
        style={{ width: "fit-content", margin: "10px auto" }}
        onClick={() => printPdf()}
      >
        Save Pdf
      </button> */}
      </div>
      <div
        id="divToPrint"
        style={{
          background: "#fff",
          borderRadius: "15px",
          padding: "50px",
          width: "1200px",
          boxShadow: "0 0 30px rgba(0, 0, 0, 0.2)",
          textAlign: "center",
          position: "relative",
          overflow: "hidden",
          margin: "30px auto",
          backgroundImage:
            "url('https://res.cloudinary.com/duovxefh6/image/upload/v1723129206/940_swuris.png')",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "left",
          backgroundSize: "cover",
        }}
      >
        <div className="certificate-header">
          <pre style={{ fontSize: "32px" }}>Certificate of Achievement</pre>
          <hr />
        </div>
        <div
          className="certificate-body"
          style={{ marginTop: "30px", color: "#333" }}
        >
          <em style={{ color: "grey", fontWeight: 300, fontSize: "27px" }}>
            Proudly Presented To
          </em>
          <h2>
            <span
              style={{
                fontSize: "50px",
                margin: "20px 0",
                fontWeight: "bold",
              }}
            >
              {" "}
              Dr.Mohammed Reda
            </span>
          </h2>
          <p style={{ fontSize: "23px" }}>For His Effecient Participation in</p>
          <h3 style={{ fontSize: "2em", color: "#555", marginBottom: "20px" }}>
            General Surgery
          </h3>
          <p style={{ fontSize: "1.3em", margin: "15px 0" }}>
            with a score of <strong>95%</strong>
          </p>
          <p style={{ fontSize: "1.3em", margin: "15px 0" }}>
            Issued on <strong>August 8, 2024</strong>
          </p>
        </div>
        <div
          className="certificate-footer"
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginTop: "30px",
            paddingTop: "20px",
            borderTop: "2px dashed #ddd",
          }}
        >
          <div
            className="footer-left"
            style={{ textAlign: "left", width: "45%" }}
          >
            <p style={{ margin: "10px 0", color: "white" }}>
              <b>This Site is Owned by </b>
            </p>
            <p
              className="signature"
              style={{ marginTop: "20px", fontStyle: "italic", color: "white" }}
            >
              Dr. El Matary LLC
            </p>
          </div>
          <div
            className="footer-left"
            style={{ textAlign: "left", width: "45%" }}
          >
            <p style={{ margin: "10px 0" }}>
              <b>Instructor</b>
            </p>
            <p
              className="signature"
              style={{
                marginTop: "20px",
                fontStyle: "italic",
                color: "#000",
                fontWeight: "bold",
              }}
            >
              DR.Elmatary
            </p>
          </div>
          <div
            className="footer-right"
            style={{ textAlign: "left", width: "45%" }}
          >
            <p style={{ margin: "10px 0" }}>
              <b>Date</b>
            </p>
            <p
              className="signature"
              style={{ marginTop: "20px", fontStyle: "italic", color: "#666" }}
            >
              August 8, 2024
            </p>
          </div>
          <div
            className="footer-right"
            style={{ textAlign: "left", width: "45%" }}
          >
            <p style={{ margin: "10px 0" }}>
              <b>Signature</b>
            </p>
            <div className="signature-image">
              <img
                style={{ width: "200px", objectFit: "contain" }}
                src={
                  "https://upload.wikimedia.org/wikipedia/commons/a/ac/Chris_Hemsworth_Signature.png"
                }
                alt="Instructor Signature"
              />
            </div>
          </div>
        </div>
        <div
          className="certificate-logo"
          style={{ position: "absolute", top: "40px", left: "20px" }}
        >
          <QRCodeSVG
            value="http://localhost:3000/certificate/100"
            style={{ maxWidth: "200px", height: "60px" }}
          />
        </div>
        <div
          className="certificate-logo"
          style={{ position: "absolute", top: "40px", right: "20px" }}
        >
          <img
            src={require("../../assets/log.png")}
            style={{ maxWidth: "200px", height: "60px" }}
            alt="Logo"
          />
        </div>
      </div>
    </>
  );
}

export default Certificate;
