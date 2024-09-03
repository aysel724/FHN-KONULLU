import React, { useState } from "react";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { jwtDecode } from "jwt-decode";

function UserIcon() {
  const [name, setName] = useState("");
  const token = localStorage.getItem("authToken");
  console.log(token);
  const username = jwtDecode(token);

  return (
    <>
      <AccountCircleIcon></AccountCircleIcon>
      <p>{username.name}</p>
    </>
  );
}
export default UserIcon;
