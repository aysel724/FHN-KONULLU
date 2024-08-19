// src/CertificateGenerator.js

import React, { useState } from "react";
import { PDFDocument, rgb } from "pdf-lib";
import { saveAs } from "file-saver";

const CertificateGenerator = () => {
  const [name, setName] = useState("");
  const [date, setDate] = useState("");

  const generatePDF = async () => {
    // Create a new PDF document
    const pdfDoc = await PDFDocument.create();
    const page = pdfDoc.addPage([600, 400]);
    const { width, height } = page.getSize();
    // Draw a rectangle
    page.drawRectangle({
      x: 50,
      y: height - 150,
      width: 500,
      height: 100,
      borderColor: rgb(0, 0, 0),
      borderWidth: 1,
    });

    // Draw text
    page.drawText("Certificate of Completion", {
      x: 200,
      y: height - 120,
      size: 24,
      color: rgb(0, 0, 0),
    });

    page.drawText(`This is to certify that`, {
      x: 150,
      y: height - 170,
      size: 18,
      color: rgb(0, 0, 0),
    });

    page.drawText(name, {
      x: 150,
      y: height - 200,
      size: 22,
      color: rgb(0, 0, 0),
    });

    page.drawText("has completed the course", {
      x: 150,
      y: height - 240,
      size: 18,
      color: rgb(0, 0, 0),
    });

    page.drawText(`Date: ${date}`, {
      x: 150,
      y: height - 280,
      size: 18,
      color: rgb(0, 0, 0),
    });

    // Serialize the document to bytes
    const pdfBytes = await pdfDoc.save();
    saveAs(
      new Blob([pdfBytes], { type: "application/pdf" }),
      "certificate.pdf"
    );
  };

  return (
    <div>
      <h1>Certificate Generator</h1>
      <input
        type="text"
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        type="text"
        placeholder="Date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
      />
      <button onClick={generatePDF}>Generate PDF</button>
    </div>
  );
};

export default CertificateGenerator;
