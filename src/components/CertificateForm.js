// src/CertificateForm.js
// src/CertificateForm.js
import React, { useState } from "react";
import Certificate from "./Certificate";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

const CertificateForm = () => {
  const [name, setName] = useState("");
  const [showCertificate, setShowCertificate] = useState(false);

  const handleChange = (e) => {
    setName(e.target.value);
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
      <h1>Certificate Generator</h1>
      <input
        type="text"
        value={name}
        onChange={handleChange}
        placeholder="Enter Full Name"
        style={{ padding: "10px", fontSize: "16px" }}
      />
      <br />
      <button
        onClick={handleGenerate}
        style={{ padding: "10px 20px", fontSize: "16px", marginTop: "10px" }}
      >
        Generate Certificate
      </button>
      {showCertificate && (
        <div>
          <div id="certificate" style={{ margin: "20px", textAlign: "center" }}>
            <Certificate name={name} />
          </div>
          <button
            onClick={handleDownload}
            style={{
              padding: "10px 20px",
              fontSize: "16px",
              marginTop: "10px",
            }}
          >
            Download PDF
          </button>
        </div>
      )}
    </div>
  );
};

export default CertificateForm;
