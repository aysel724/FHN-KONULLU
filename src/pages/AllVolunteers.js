import React from "react";
import TableForAllVolunteers from "../components/TableForAllVolunteers";
import ModalForDailedFiltration from "../components/ModalForDailedFiltration";
import { Button } from "antd";
export default function AllVolunteers() {
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
          <h1>Müraciət edən bütün könüllülər</h1>{" "}
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
        </div>
      </div>
      <TableForAllVolunteers />
    </>
  );
}
