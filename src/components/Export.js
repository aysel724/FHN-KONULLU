import React from "react";

import * as FileSaver from "file-saver";

import * as XLSX from "xlsx";

export const Export = ({ csvData, fileName }) => {
  const fileType =
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";
  const fileExtension = ".xlsx";
  const exportToCSV = (csvData, fileName) => {
    const ws = XLSX.utils.json_to_sheet(csvData);

    const wb = { Sheets: { data: ws }, SheetNames: ["data"] };

    const excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });

    const data = new Blob([excelBuffer], { type: fileType });

    FileSaver.saveAs(data, fileName + fileExtension);
  };

  return (
    <>
     
      <button style={{backgroundColor:" #4b7d83", padding:"6px 14px", height:"30px", color:"white", boxShadow:"none",
 


  borderRadius: "12px", border:"1px solid white" }} onClick={(e) => exportToCSV(csvData, fileName)}>Export</button>
    </>
  );
};