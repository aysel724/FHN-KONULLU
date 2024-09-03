import React from "react";
import Table from "../components/Table";
import ModalForDailedFiltration from "../components/ModalForDailedFiltration";
import { useNavigate } from "react-router-dom";
import { Button } from "antd";
export default function Volonteer() {
  const navigate = useNavigate();
  return (
    <>
      {" "}
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "1%",
        }}
      >
        {" "}
        <div>
          <h1>Könüllülər</h1>{" "}
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "2%",
            gap: "20px",
          }}
        >
          {" "}
          <Button onClick={() => navigate(`/allVolunteers`)}>
            Müraciət edən könüllülərin cədvəli{" "}
          </Button>
          <ModalForDailedFiltration />
        </div>
      </div>
      <Table />
    </>
  );
}
