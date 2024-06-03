import React from "react";
import TabsUser from "../components/TabsUser";
import image from "../components/images/volonteer.png";
import { Routes, Route, useParams } from 'react-router-dom';

import {usersData} from "../makeData"


export default function UserInfo() {

let params = useParams();
let userId = params.id - 1
let userInfo = usersData[userId]
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
          <h1>{userInfo.firstName}</h1>
          <p>
            <strong>FIN:</strong>
            {userInfo.fin}
          </p>
          <p>
            <strong>Cinsi: </strong>
            {userInfo.gender}
          </p>
          <p>
            <strong>Doğulduğu tarix (gün, ay, il): </strong>
            {userInfo.birthdate}
          </p>
          <p>
            <strong>Doğulduğu yer (ölkə, şəhər və ya rayon, kənd):</strong>{" "}
            {userInfo.start}
          </p>
          <p>
            <strong>Status:</strong>Fəaliyyəti dəvam edən
          </p>
          <p>
            <strong>Fəaliyyətə başlama tarixi:</strong> 10.02.2024
          </p>
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-around",
          }}
        >
          <img src={image} style={{ width: "180px", marginLeft: "20px" }}></img>
        </div>
      </div>
      <TabsUser />

    </div>
  );
}
