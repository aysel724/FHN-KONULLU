// src/Certificate.js
import React from "react";
import image1 from "../components/images/A4.png";

const Certificate = ({ name, duration }) => {
  return (
    <div
      style={{
        ...styles.certificateContainer,
        backgroundImage: `url(${image1})`,
        maxWidth: "595px",
        height: "842px",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div style={styles.header}>
        <h3>AZƏRBAYCAN RESPUBLİKASININ FÖVQƏLADƏ HALLAR NAZİRLİYİ</h3>
        <h1 style={styles.title}>SERTİFİKAT</h1>
      </div>
      <div style={styles.nameContainer}>
        <h2 style={styles.name}>{name}</h2>
      </div>
      <p>{duration}</p>
      <p style={styles.subtitle}>
        tarixlərində "Fövqəladə Hallar Könüllüləri" Proqramı çərçivəsində
        könüllü fəaliyyətini başa vurduğu üçün verilir.
      </p>

      <p style={styles.date}>{new Date().toLocaleDateString()}</p>
      <div style={styles.footer}>
        <div style={styles.signature}>
          <p>
            <i>____________________</i>
          </p>
          <p>KƏMALƏDDİN HEYDƏROV</p>
          <p>AZƏRBAYCAN RESPUBLİKASININ FÖVQƏLADƏ HALLAR NAZİRİ</p>
        </div>
      </div>
    </div>
  );
};

const styles = {
  certificateContainer: {
    padding: "30px",
    textAlign: "center",
    margin: "0 auto",
    backgroundColor: "#fff",
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
    textAlign: "center",
    maxWidth: "100%",
    margin: "20px 0",
    borderBottom: "1px solid grey",
    paddingBottom: "10px",
  },
  name: {
    fontSize: "30px",
    fontWeight: "20",
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
