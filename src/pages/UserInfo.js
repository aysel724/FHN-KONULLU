import React from "react";
import TabsUser from "../components/TabsUser";
import image from "../components/images/volonteer.png";
import { Routes, Route, useParams } from "react-router-dom";

import axios from "axios";

import { useEffect, useState } from "react";
import formatDateTİme from "../utils/convertDate";

export default function UserInfo() {
  let params = useParams();
  let userId = params.id;
  console.log(userId);

  const [userData, setUserData] = useState({
    bloodType: "",
    pinCode: "",
    name: "",
    surname: "",
    fatherName: "",
    gender: "",
    militaryReward: "",
    height: "",
    birthDate: "",
    citizenship: "",
    maritalStatus: "",
    identityCardGivenStructureName: "",
    identityCardReceivingDate: "",
    registrationAddress: "",
    currentAddress: "",
    photo: "",
    phoneNumber1: "",
    phoneNumber2: "",
    email: "",
    isIAMASInfo: "",
    voluntaryOfMesStatus: "",
  });

  useEffect(() => {
    axios
      .get(`https://api-volunteers.fhn.gov.az/api/v1/Volunteers/${userId}`)
      .then((response) => {
        console.log(response);
        setUserData(response.data.data);

        return userData;
      })
      .catch((error) => {
        console.error("Error fetching data: ", error);
      });
  }, []);

  return (
    <div>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <div style={{ textAlign: "left", margin: "2%" }}>
          <h1>
            {userData.name} {userData.surname} {userData.fatherName}
          </h1>
          <p>
            <strong>FIN: </strong>
            {userData.pinCode}
          </p>
          <p>
            <strong>Qan qrupu: </strong>
            {userData.bloodType}
          </p>
          <p>
            <strong>Cinsi: </strong>
            {userData.gender}
          </p>
          <p>
            <strong>Doğulduğu tarix (gün, ay, il): </strong>
            {formatDateTİme(userData.birthDate)}
          </p>

          <p>
            <strong>Status: </strong> {userData.voluntaryOfMesStatus.name}
          </p>
          <p>
            <strong>Fəaliyyətə başlama tarixi: </strong> {userData.fin}
          </p>
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-around",
          }}
        >
          {userData && userData.photo && (
            <img
              src={userData.photo}
              alt="volunteer"
              width={"250px"}
              style={{ padding: "5%", borderRadius: "12px" }}
            />
          )}
        </div>
      </div>
      <TabsUser />
    </div>
  );
}
