import React from "react";
import TabsEvents from "../components/TabsEvents"
import { useParams } from "react-router-dom";
export default function EventInfo(){
    const {id} = useParams()
return(
    <>
    <h1>details{id}</h1>
    <TabsEvents/>
    </>
)

}