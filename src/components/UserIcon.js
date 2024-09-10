// import React, { useState } from "react";
// import AccountCircleIcon from "@mui/icons-material/AccountCircle";
// import { jwtDecode } from "jwt-decode";

// function UserIcon() {
//   const [name, setName] = useState("");
//   const token = localStorage.getItem("authToken");
//   console.log(token);
//   const username = jwtDecode(token);

//   return (
//     <>
//       <AccountCircleIcon></AccountCircleIcon>
//       <p>{username.name}</p>
//     </>
//   );
// }
// export default UserIcon;
// import React, { useState, useEffect } from "react";
// import AccountCircleIcon from "@mui/icons-material/AccountCircle";
// import { jwtDecode } from "jwt-decode"; // Ensure this is installed and correctly imported
// import { useNavigate } from "react-router-dom";
// import { Button } from "antd";

// function UserIcon() {
//   const [name, setName] = useState("");
//   const navigate = useNavigate(); // Use navigate for redirection
//   const token = localStorage.getItem("authToken");

//   useEffect(() => {
//     if (token) {
//       try {
//         const decodedToken = jwtDecode(token);
//         setName(decodedToken.name || ""); // Safely extract the name
//       } catch (error) {
//         console.error("Failed to decode token", error);
//       }
//     }
//   }, [token]);

//   const handleLogout = () => {
//     localStorage.removeItem("authToken");
//     navigate("/login"); // Redirect to the login page
//   };

//   return (
//     <div
//       style={{
//         display: "flex",
//         flexDirection: "row",
//         justifyContent: "center",
//         alignItems: "center",
//         gap: "10px",
//       }}
//     >
//       <AccountCircleIcon />
//       <p>{name}</p>
//       <Button onClick={handleLogout}>Çıxış</Button>
//     </div>
//   );
// }

// export default UserIcon;
import React, { useState, useEffect } from "react";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { jwtDecode } from "jwt-decode"; // Ensure this is installed and correctly imported
import { useNavigate } from "react-router-dom";
import "../components/internal/UserIcon.css"; // Import the CSS file for styling

function UserIcon() {
  const [name, setName] = useState("");
  const [isModalVisible, setIsModalVisible] = useState(false);
  const navigate = useNavigate(); // Use navigate for redirection
  const token = localStorage.getItem("authToken");

  useEffect(() => {
    if (token) {
      try {
        const decodedToken = jwtDecode(token);
        setName(decodedToken.name || ""); // Safely extract the name
      } catch (error) {
        console.error("Failed to decode token", error);
      }
    }
  }, [token]);

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    navigate("/login"); // Redirect to the login page
  };

  return (
    <div className="user-icon-container">
      <AccountCircleIcon />
      <div
        className="username-container"
        onMouseEnter={() => setIsModalVisible(true)}
        onMouseLeave={() => setIsModalVisible(false)}
      >
        <p>{name}</p>
        {isModalVisible && (
          <div className="logout-modal">
            <button onClick={handleLogout}>Hesabdan çıxış </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default UserIcon;
