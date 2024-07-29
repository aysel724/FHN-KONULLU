import React from "react";
import TrainingsTabs from "./TrainingsTabs";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";

export default function TrainingsInfo() {
  //   const [userData, setUserData] = useState({

  //     name: ""

  //   });

  //     let params = useParams();
  //     let userId = params.id
  //     useEffect(() => {
  //         axios.get(`https://api-volunteers.fhn.gov.az/api/v1/MesTrainigs/${userId}`)
  //           .then(response => {
  //             console.log(response);
  //             setUserData(response.data.data);

  //             return userData ;
  //           })
  //           .catch(error => {
  //             console.error('Error fetching data: ', error);
  //           });
  //       }, []); // Empty dependency array means this effect runs once after initial render

  return (
    <>
      <h1>Təlinim ətraflı məlumatı</h1>

      {/* <TrainingsTabs></TrainingsTabs> */}
    </>
  );
}
