import React from "react";
import Table from "../components/Table";
import ModalForDailedFiltration from "../components/ModalForDailedFiltration";
export default function Volonteer() {
  return (
    <> <div style={{display:"flex",  flexDirection:"row" , justifyContent:"space-between", alignItems:"center", padding:"1%"}}> <h1>Könüllülər</h1> <ModalForDailedFiltration/>  </div>

<Table />


    </>
  );
}
