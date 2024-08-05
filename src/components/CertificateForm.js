// src/CertificateForm.js
// src/CertificateForm.js
import React, { useState } from "react";
import Certificate from "./Certificate";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { duration } from "@mui/material";

const CertificateForm = () => {
  const [name, setName] = useState("");
  const [duration, setDuartion] = useState("");
  const [showCertificate, setShowCertificate] = useState(false);

  const handleChange = (e) => {
    setName(e.target.value);
  };
  const handleChange1 = (e) => {
    setDuartion(e.target.value);
  };
  const handleGenerate = () => {
    setShowCertificate(true);
  };

  const handleDownload = () => {
    const certificate = document.getElementById("certificate");

    html2canvas(certificate).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("p", "mm", "a4");

      const pdfWidth = pdf.internal.pageSize.width;
      const pdfHeight = pdf.internal.pageSize.height;

      const imgWidth = 210; // A4 width in mm
      const imgHeight = (canvas.height * imgWidth) / canvas.width;

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
        style={{ padding: "10px", fontSize: "16px" }}
      />
      <input
        type="text"
        value={duration}
        onChange={handleChange1}
        placeholder="Təlim müddəti"
        style={{ padding: "10px", fontSize: "16px" }}
      />
      <br />
      <button
        onClick={handleGenerate}
        style={{ padding: "10px 20px", fontSize: "16px", marginTop: "10px" }}
      >
        Sertifikatı generasiya et
      </button>
      {showCertificate && (
        <div>
          <div id="certificate" style={{ margin: "20px", textAlign: "center" }}>
            <Certificate name={name} duration={duration} />
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
