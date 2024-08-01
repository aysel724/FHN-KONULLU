// src/Certificate.js
import React from "react";
import image1 from "../components/images/certificate.png";
const Certificate = ({ name }) => {
  return (
    <div
      style={{
        ...styles.certificateContainer,
        backgroundImage: `url(${image1})`,
      }}
    >
      <div style={styles.header}>
        <h1 style={styles.title}>Certificate of Achievement</h1>
        <p style={styles.subtitle}>This is to certify that</p>
      </div>
      <div style={styles.nameContainer}>
        <h2 style={styles.name}>{name}</h2>
      </div>
      <p style={styles.subtitle}>has successfully completed the course</p>
      <p style={styles.date}>{new Date().toLocaleDateString()}</p>
      <div style={styles.footer}>
        <div style={styles.signature}>
          <p>____________________</p>
          <p>Signature</p>
        </div>
      </div>
    </div>
  );
};

const styles = {
  certificateContainer: {
    maxWidth: "100vw",
    height: "100vh",

    padding: "30px",
    textAlign: "center",
    margin: "0 auto",
    backgroundColor: "#fff",
    // backgroundImage: "url('/components/images/cerificate.png')",
    backgroundSize: "cover",

    backgroundRepeat: "no-repeat",
    borderRadius: "15px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
    position: "relative",
  },
  header: {
    marginTop: "220px",
  },
  title: {
    fontSize: "36px",
    fontWeight: "bold",
    color: "#4A90E2",
    margin: "0",
  },
  subtitle: {
    fontSize: "20px",
    color: "#555",
    margin: "10px 0",
  },
  nameContainer: {
    width: "90%",
    margin: "20px 0",
    borderBottom: "1px solid #4A90E2",
    paddingBottom: "10px",
  },
  name: {
    fontSize: "40px",
    fontWeight: "bold",
    margin: "0",
    color: "#333",
  },
  date: {
    marginTop: "20px",
    fontSize: "16px",
    color: "#888",
  },
  footer: {
    marginTop: "40px",
    display: "flex",
    justifyContent: "flex-end",
    alignItems: "center",
  },
  signature: {
    textAlign: "center",
    fontSize: "16px",
    color: "#333",
  },
};

export default Certificate;
