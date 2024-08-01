import React from "react";
import TrainingsTabs from "./TrainingsTabs";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";

export default function TrainingsInfo() {
  return (
    <>
      <h1>Təlimin ətraflı məlumatı</h1>

      <TrainingsTabs></TrainingsTabs>
    </>
  );
}
