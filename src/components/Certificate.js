// src/Certificate.js
import React from "react";
import image1 from "../components/images/certificationApproved.png";

const Certificate = ({ name, duration, duration1 }) => {
  return (
    <div
      style={{
        ...styles.certificateContainer,
        width: "100%",
      }}
    >
      <div style={styles.header}>
        <p>AZƏRBAYCAN RESPUBLİKASININ FÖVQƏLADƏ HALLAR NAZİRLİYİ</p>
      </div>
      <div style={styles.nameContainer}>
        <p style={styles.name}>{name}</p>
      </div>
      <p style={styles.duration}>
        {duration} - {duration1}
      </p>
      <p style={styles.subtitle}>
        tarixlərində "Fövqəladə Hallar Könüllüləri" Proqramı
      </p>
      <p style={styles.subtitle}>
        çərçivəsində könüllü fəaliyyətini başa vurduğu üçün verilir.
      </p>
      <div style={styles.footer}>
        {" "}
        <div style={styles.signature}>
          <p style={styles.date1}>{new Date().toLocaleDateString()}</p>

          <p style={styles.date}>Sertifikatın verilmə tarixi</p>
        </div>
        <div style={styles.signature}>
          <p>
            <i>_____________________</i>
          </p>
          <p style={styles.subsignature}>
            <strong>KƏMALƏDDİN HEYDƏROV</strong>
          </p>
          <p style={styles.subsignature}> AZƏRBAYCAN RESPUBLİKASININ</p>
          <p style={styles.subsignature}> FÖVQƏLADƏ HALLAR NAZİRİ</p>
        </div>
        <div style={styles.signature}>
          <p>
            <i>_____________________</i>
          </p>
          <p style={styles.subsignature}>
            <strong>KƏMALƏDDİN HEYDƏROV</strong>
          </p>
          <p style={styles.subsignature}> AZƏRBAYCAN RESPUBLİKASININ</p>
          <p style={styles.subsignature}> FÖVQƏLADƏ HALLAR NAZİRİ</p>
        </div>
        <div style={styles.signature}>
          <p>
            <i>_____________________</i>
          </p>
          <p style={styles.subsignature}>
            <strong>KƏMALƏDDİN HEYDƏROV</strong>
          </p>
          <p style={styles.subsignature}> AZƏRBAYCAN RESPUBLİKASININ</p>
          <p style={styles.subsignature}> FÖVQƏLADƏ HALLAR NAZİRİ</p>
        </div>
      </div>{" "}
      <div style={styles.signature}>
        <p>
          <i>_____________________</i>
        </p>
        <p style={styles.subsignature}>
          <strong>KƏMALƏDDİN HEYDƏROV</strong>
        </p>
        <p style={styles.subsignature}> AZƏRBAYCAN RESPUBLİKASININ</p>
        <p style={styles.subsignature}> FÖVQƏLADƏ HALLAR NAZİRİ</p>
      </div>{" "}
      <div style={styles.signature}>
        <p>
          <i>_____________________</i>
        </p>
        <p style={styles.subsignature}>
          <strong>KƏMALƏDDİN HEYDƏROV</strong>
        </p>
        <p style={styles.subsignature}> AZƏRBAYCAN RESPUBLİKASININ</p>
        <p style={styles.subsignature}> FÖVQƏLADƏ HALLAR NAZİRİ</p>
      </div>{" "}
      <div style={styles.signature}>
        <p>
          <i>_____________________</i>
        </p>
        <p style={styles.subsignature}>
          <strong>KƏMALƏDDİN HEYDƏROV</strong>
        </p>
        <p style={styles.subsignature}> AZƏRBAYCAN RESPUBLİKASININ</p>
        <p style={styles.subsignature}> FÖVQƏLADƏ HALLAR NAZİRİ</p>
      </div>
    </div>
  );
};

const styles = {
  certificateContainer: {
    width: "100%",
    padding: "30px",
    textAlign: "left",
    backgroundColor: "#fff",
    borderRadius: "15px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
    position: "relative",
  },
  header: {
    fontFamily: "Crimson Pro",
    fontSize: "16px",
    marginTop: "180px",
    marginRight: "250px",
    marginLeft: " 80px",
  },

  title: {
    fontWeight: "bold",
    textTransform: "uppercase",
    fontFamily: "Crimson Pro",
    fontSize: "56px",
    fontWeight: "bold",
    color: "grey",
    marginTop: "40px",
    marginLeft: " 80px",
  },
  subtitle: {
    fontWeight: "bold",
    fontFamily: "Crimson Pro",
    fontSize: "16px",
    color: "#555",
    margin: "10px 0",
    marginLeft: " 80px",
  },
  nameContainer: {
    fontWeight: "bold",
    fontFamily: "Crimson Pro",
    marginLeft: " 80px",
    maxWidth: "100%",
    textAlign: "left",
  },
  name: {
    fontWeight: "bold",
    fontFamily: "Crimson Pro",
    fontSize: "30px",

    marginTop: "80px",
    color: "#333",
  },
  date: {
    marginLeft: "80px",
    fontFamily: "Crimson Pro",
    textAlign: "center",
    fontSize: "12px",
    color: "#333",
  },
  duration: {
    marginLeft: " 80px",
  },
  date1: {
    marginLeft: " 80px",
    textDecoration: "underline",
    fontFamily: "Crimson Pro",
    textAlign: "left",
    fontSize: "12px",
    color: "#333",
  },
  footer: {
    padding: "1%",
    fontFamily: "Crimson Pro",
    marginTop: "40px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  signature: {
    fontFamily: "Crimson Pro",
    textAlign: "center",
    fontSize: "12px",
    color: "#333",
  },
  subsignature: {
    lineHeight: "40%",
    fontFamily: "Crimson Pro",
    textAlign: "center",
    fontSize: "12px",
    color: "#333",
  },
};

export default Certificate;
