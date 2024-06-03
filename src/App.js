import * as React from 'react';
import Sidebar from './components/Sidebar';
import { Link } from "react-router-dom";
import { useState } from "react";
import { Route, Routes , Navigate} from "react-router-dom";

import Login from "./pages/Login";
import Admin from "./pages/Admin";
import Users from "./pages/Users";

import Reports from "./pages/Reports";

import UserInfo from "./pages/UserInfo";
import Volonteer from "./pages/Volonteer";
import NewVolonteer from "./pages/NewVolonteer";


import TableForEducationType from "./components/TableForEducationType"

import Events from "./pages/Events";
import Trainings from "./pages/Trainings";
import BloodtypeIcon from "@mui/icons-material/Bloodtype";
import InsuranceTotal from "./pages/InsuranceTotal";
import TrainingsInfo from "./pages/TrainingsInfo";
import DataFromApi from './components/DataFromApi';



function App() {


  return (
  <div className="App" >  
  <Sidebar/>
   
  </div>);
}

export default App;