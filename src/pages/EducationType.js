import React from "react";
import TableForEducationType from "../components/TableForEducationType";
import TableForEducationDegree from "../components/TableForEducationDegree";

export default function EducationType() {
  return (
    <div>
      <TableForEducationType />
      <TableForEducationDegree></TableForEducationDegree>
    </div>
  );
}
