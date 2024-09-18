import React, { useState, useEffect } from "react";
import LogoutIcon from "@mui/icons-material/Logout";
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

  const toggleModal = () => {
    setIsModalVisible(!isModalVisible);
  };

  return (
    <div className="user-icon-container">
      <div className="user-info">
        <p>{name}</p>
        <div className="icon-container">
          <LogoutIcon
            style={{ marginLeft: "10px", marginTop: "20px" }}
            onClick={toggleModal}
          />
          {isModalVisible && (
            <div className="logout-modal">
              <button onClick={handleLogout}>Hesabdan çıxış</button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default UserIcon;
