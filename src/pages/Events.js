import React from "react";
import Table from "../components/Table";
import TabsEvents from "../components/TabsEvents";
import TableForEvents from "../components/TableForEvents";
import CertificateGenerator from "../components/Sert";
import CertificateForm from "../components/CertificateForm";
export default function Events() {
  return (
    <>
      <h1>Tədbirlər</h1>
      <TableForEvents />
      <CertificateGenerator />
    </>
  );
}
