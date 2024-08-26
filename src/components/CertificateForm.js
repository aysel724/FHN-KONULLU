// src/CertificateForm.js
// src/CertificateForm.js
// import React, { useState } from "react";
// import Certificate from "./Certificate";
// import html2canvas from "html2canvas";
// import jsPDF from "jspdf";

// const CertificateForm = () => {
//   const [name, setName] = useState("");
//   const [duration, setDuartion] = useState("");
//   const [duration1, setDuartion1] = useState("");
//   const [showCertificate, setShowCertificate] = useState(false);

//   const handleChange = (e) => {
//     setName(e.target.value);
//   };
//   const handleChange1 = (e) => {
//     setDuartion(e.target.value);
//   };
//   const handleChange2 = (e) => {
//     setDuartion1(e.target.value);
//   };
//   const handleGenerate = () => {
//     setShowCertificate(true);
//   };
//   const handleDownload = () => {
//     const certificate = document.getElementById("certificate");

//     html2canvas(certificate, { backgroundColor: null }).then((canvas) => {
//       const imgData = canvas.toDataURL("image/png");
//       const pdf = new jsPDF("p", "mm", "a4");

//       // PDF dimensions in mm
//       const pdfWidth = pdf.internal.pageSize.width;
//       const pdfHeight = pdf.internal.pageSize.height;

//       // Canvas dimensions in px
//       const canvasWidth = canvas.width;
//       const canvasHeight = canvas.height;

//       // Calculate the scaling factor to fit the image within the PDF page
//       const imgWidth = pdfWidth;
//       const imgHeight = (canvasHeight / canvasWidth) * pdfWidth;

//       // If the calculated height is larger than the PDF height, scale down
//       if (imgHeight > pdfHeight) {
//         const scaleFactor = pdfHeight / imgHeight;
//         imgHeight *= scaleFactor;
//         imgWidth *= scaleFactor;
//       }

//       pdf.addImage(imgData, "PNG", 0, 0, imgWidth, imgHeight);
//       pdf.save("certificate.pdf");
//     });
//   };

//   return (
//     <div style={{ textAlign: "center", margin: "20px" }}>
//       <input
//         type="text"
//         value={name}
//         onChange={handleChange}
//         placeholder="Ad, soyad, ata adı"
//         style={{
//           width: "30%",
//           padding: " 12px 20px",
//           margin: "8px 20px",
//           display: "inline-block",
//           border: "1px solid #ccc",
//           borderRadius: "4px",
//           boxsizing: " border-box",
//         }}
//       />{" "}
//       <label for="lname">Könüllülk fəaliyyətiinnin başlama tarixi</label>
//       <input
//         type="date"
//         value={duration}
//         onChange={handleChange1}
//         placeholder="Könüllülk fəaliyyətiinnin başlama tarixi "
//         style={{
//           padding: " 12px 20px",
//           margin: "8px 20px",
//           marginRight: "100px",
//           display: "inline-block",
//           border: "1px solid #ccc",
//           borderRadius: "4px",
//           boxsizing: " border-box",
//         }}
//       />
//       <label for="lname">Könüllülk fəaliyyətiinnin bitmə tarixi</label>
//       <input
//         type="date"
//         value={duration1}
//         onChange={handleChange2}
//         placeholder="Könüllülk fəaliyyətiinnin bitmə tarixi"
//         style={{
//           padding: " 12px 20px",
//           margin: "8px 20px",
//           display: "inline-block",
//           border: "1px solid #ccc",
//           borderRadius: "4px",
//           boxsizing: " border-box",
//         }}
//       />
//       <br />
//       <button
//         onClick={handleGenerate}
//         style={{
//           backgroundColor: "rgb(75, 125, 131)",
//           color: "white",
//           padding: "14px 20px",
//           margin: "48px 20px",
//           border: " none",
//           borderRadius: "4px",
//           cursor: " pointer ",
//         }}
//       >
//         <strong>SERTİFİKATI GENERASİYA ET</strong>
//       </button>
//       {showCertificate && (
//         <div>
//           <div id="certificate" style={{ margin: "20px", textAlign: "center" }}>
//             <Certificate
//               name={name}
//               duration={duration}
//               duration1={duration1}
//             />
//           </div>
//           <button
//             onClick={handleDownload}
//             style={{
//               padding: "10px 20px",
//               fontSize: "16px",
//               marginTop: "10px",
//             }}
//           >
//             Yüklə
//           </button>
//         </div>
//       )}
//     </div>
//   );
// };

// export default CertificateForm;

import React, { useRef, useState } from "react";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import back from "../components/images/certificationApproved.png";
const CertificateGenerator = () => {
  const [name, setName] = useState("");
  const [course, setCourse] = useState("");
  const [showCertificate, setShowCertificate] = useState(false);
  const certificateRef = useRef();

  const generateCertificate = async () => {
    const input = certificateRef.current;

    // Create a canvas from the HTML element
    const canvas = await html2canvas(input, {
      useCORS: true,
      // scale: 2, // Ensure cross-origin images are handled
    });
    const imgData = canvas.toDataURL("image.png");

    // Create a new jsPDF document
    const pdf = new jsPDF("l", "mm", "a4"); // 'p' for portrait, 'mm' for millimeters, 'a4' size
    const pdfWidth = 297; // A4 landscape width in mm
    const pdfHeight = 210; // A4 landscape height in mm
    const imgWidth = canvas.width / 2; // Width of the image in pixels (canvas width divided by scale factor)
    const imgHeight = canvas.height / 2;
    // Add the image to the PDF
    pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight); // A4 size in mm (210x297)

    // Save the PDF
    pdf.save("certificate.pdf");
  };
  const toggleCertificateVisibility = () => {
    setShowCertificate(!showCertificate); // Toggle visibility
  };

  return (
    <div>
      <div style={{ marginBottom: "20px" }}>
        <label>
          Name:
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter recipient's name"
          />
        </label>
        <br />
        <label>
          Course:
          <input
            type="text"
            value={course}
            onChange={(e) => setCourse(e.target.value)}
            placeholder="Enter course name"
          />
        </label>
      </div>
      <button onClick={toggleCertificateVisibility}>
        {showCertificate ? "Hide Certificate" : "Show Certificate"}
      </button>

      <div
        ref={certificateRef}
        style={{
          height: "210mm",
          width: "297mm",
          position: "relative",
          backgroundImage: `url(${back})`, // Path to the background image
          backgroundSize: "cover",
          backgroundPosition: "center",

          boxSizing: "border-box",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            textAlign: "center",
            color: "#000",
          }}
        >
          <h1 style={{ fontSize: "36px", margin: "0" }}>
            Certificate of Achievement
          </h1>
          <p style={{ fontSize: "24px", margin: "10px 0" }}>
            This is to certify that''"""əəəəəə"
          </p>
          <h2 style={{ fontSize: "30px", margin: "10px 0" }}>
            {name || "John Doe"}
          </h2>
          <p style={{ fontSize: "24px", margin: "10px 0" }}>
            Has successfully completed the course:
          </p>
          <h3 style={{ fontSize: "28px", margin: "10px 0" }}>
            {course || "Course Name"}
          </h3>
        </div>
      </div>
      <button onClick={generateCertificate}>Generate Certificate</button>
    </div>
  );
};

export default CertificateGenerator;
