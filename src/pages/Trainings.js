import React from "react"
import Table from "../components/Table";
import TrainingTabs from "./TrainingsTabs"
import Download from "../components/Download"
import TableForTrainings from "../components/TableForTrainings"
export default function Trainings (){
  return(
    <><h1>Təlimlər</h1>
   <TableForTrainings/>
    <TrainingTabs/>
    {/* <Download/> */}
    </> 
  )
}