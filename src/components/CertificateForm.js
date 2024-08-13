// src/CertificateForm.js
// src/CertificateForm.js
import React, { useState } from "react";
import Certificate from "./Certificate";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

const CertificateForm = () => {
  const [name, setName] = useState("");
  const [duration, setDuartion] = useState("");
  const [duration1, setDuartion1] = useState("");
  const [showCertificate, setShowCertificate] = useState(false);

  const handleChange = (e) => {
    setName(e.target.value);
  };
  const handleChange1 = (e) => {
    setDuartion(e.target.value);
  };
  const handleChange2 = (e) => {
    setDuartion1(e.target.value);
  };
  const handleGenerate = () => {
    setShowCertificate(true);
  };
  const handleDownload = () => {
    const certificate = document.getElementById("certificate");

    html2canvas(certificate, { backgroundColor: null }).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("p", "mm", "a4");

      // PDF dimensions in mm
      const pdfWidth = pdf.internal.pageSize.width;
      const pdfHeight = pdf.internal.pageSize.height;

      // Canvas dimensions in px
      const canvasWidth = canvas.width;
      const canvasHeight = canvas.height;

      // Calculate the scaling factor to fit the image within the PDF page
      const imgWidth = pdfWidth;
      const imgHeight = (canvasHeight / canvasWidth) * pdfWidth;

      // If the calculated height is larger than the PDF height, scale down
      if (imgHeight > pdfHeight) {
        const scaleFactor = pdfHeight / imgHeight;
        imgHeight *= scaleFactor;
        imgWidth *= scaleFactor;
      }

      pdf.addImage(imgData, "PNG", 0, 0, imgWidth, imgHeight);
      pdf.save("certificate.pdf");
    });
  };

  return (
    <div style={{ textAlign: "center", margin: "20px" }}>
      <input
        type="text"
        value={name}
        onChange={handleChange}
        placeholder="Ad, soyad, ata adı"
        style={{
          width: "30%",
          padding: " 12px 20px",
          margin: "8px 20px",
          display: "inline-block",
          border: "1px solid #ccc",
          borderRadius: "4px",
          boxsizing: " border-box",
        }}
      />{" "}
      <label for="lname">Könüllülk fəaliyyətiinnin başlama tarixi</label>
      <input
        type="date"
        value={duration}
        onChange={handleChange1}
        placeholder="Könüllülk fəaliyyətiinnin başlama tarixi "
        style={{
          padding: " 12px 20px",
          margin: "8px 20px",
          marginRight: "100px",
          display: "inline-block",
          border: "1px solid #ccc",
          borderRadius: "4px",
          boxsizing: " border-box",
        }}
      />
      <label for="lname">Könüllülk fəaliyyətiinnin bitmə tarixi</label>
      <input
        type="date"
        value={duration1}
        onChange={handleChange2}
        placeholder="Könüllülk fəaliyyətiinnin bitmə tarixi"
        style={{
          padding: " 12px 20px",
          margin: "8px 20px",
          display: "inline-block",
          border: "1px solid #ccc",
          borderRadius: "4px",
          boxsizing: " border-box",
        }}
      />
      <br />
      <button
        onClick={handleGenerate}
        style={{
          backgroundColor: "rgb(75, 125, 131)",
          color: "white",
          padding: "14px 20px",
          margin: "48px 20px",
          border: " none",
          borderRadius: "4px",
          cursor: " pointer ",
        }}
      >
        Sertifikatı generasiya et
      </button>
      {showCertificate && (
        <div>
          <div id="certificate" style={{ margin: "20px", textAlign: "center" }}>
            <Certificate
              name={name}
              duration={duration}
              duration1={duration1}
            />
          </div>
          <button
            onClick={handleDownload}
            style={{
              padding: "10px 20px",
              fontSize: "16px",
              marginTop: "10px",
            }}
          >
            Yüklə
          </button>
        </div>
      )}
    </div>
  );
};

export default CertificateForm;
