import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import { useAuth } from "../context/AuthContext";
import { jwtDecode } from "jwt-decode";
import Logo from "../assets/icons/logo";
function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const { login } = useAuth();
  const navigate = useNavigate();
  const handleLogin = () => {
    fetch("https://api-volunteers.fhn.gov.az/api/v1/Auth", {
      method: "POST",
      headers: {
        Accept: "*/*",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userName: email,
        password: password,
      }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        if (data) {
          const role = jwtDecode(data.data.token);
          console.log(jwtDecode(data.data.token));
          login(data.data.token);

          navigate("/volunteers"); // Redirect to the protected route
        } else {
          setError("Daxil etdiyiniz parametrlər yalnışdır.");
        }
      })
      .catch((error) => {
        console.error("Error logging in:", error);
        setError(
          "Daxil olmaq alınmadı. Zəhmət olmasa, məlumatları bir daha yoxlayın yoxlayın."
        );
      });
  };
  return (
    <div
      style={{
        width: "100vw",
        backgroundColor: " #4B7D83",

        height: "100vh",
        position: "relative",
        display: "flex",
        alignItems: "center",
      }}
    >
      <div
        className="login-wrapper"
        style={{
          width: "600px",
          height: "500px",
          margin: "0px",
          position: "absolute",
          color: "white",
          top: "50%",
          left: "50%",
          borderRadius: "30px",
          backgroundColor: " rgba(255,255,255,0.7)",

          transform: "translate(-50%, -50%)",
          backdropFilter: " blur(10px)",
          border: "2px solid rgba(255,255,255,0.1)",
          boxShadow: "0 0 40px rgba(8,7,16,0.2)",
          padding: "50px 35px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        {/* <img src={logo} style={{width:"140px"}}/> */}
        <Logo/>

        <h2 style={{ paddingBottom: "10px", marginTop: "10px" }}>
          {" "}
          FÖVQƏLADƏ HALLAR KÖNÜLLÜLƏRİ
        </h2>

        <div
          style={{
            color: "white",
            display: "flex",
            flexDirection: "column",
            textAlign: "left",
            alignItems: "left",
            justifyContent: "center",
            width: 500,
          }}
        >
          <input
            style={{
              border: "1px solid grey",
              borderRadius: "9px",
              padding: "2%",
              marginBottom: "2%",
              display: "block",
            }}
            type="email"
            placeholder="İstifadəçi adınızı daxil edin"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            style={{
              border: "1px solid grey",
              borderRadius: "9px",
              padding: "2%",
              marginBottom: "1%",
              display: "block",
            }}
            type="password"
            placeholder="Şifrənizi daxil edin"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            style={{
              padding: "12px ",
              border: "1px solid grey",
              borderRadius: "9px",
              color: " white",
              backgroundColor: "#4b7d83",
              marginTop: "20px",
              cursor: "pointer",
            }}
            onClick={handleLogin}
          >
            Daxil ol
          </button>
        </div>
        {error && (
          <div
            className="modal"
            style={{
              backgroundColor: "white",
              color: "red",
              marginTop: "20px",
              padding: "3%",
              borderRadius: "9px",
            }}
          >
            <div className="modal-content">
              <p>{error}</p>
            </div>
            <span className="close" onClick={() => setError(null)}>
              &times;
            </span>
          </div>
        )}
      </div>
    </div>
  );
}
export default Login;
