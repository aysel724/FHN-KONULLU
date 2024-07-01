import * as React from "react";
import Sidebar from "./components/Sidebar";
import { Link } from "react-router-dom";
import { useState } from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Admin from "./pages/Admin";
import Users from "./pages/Users";

import Reports from "./pages/Reports";

import UserInfo from "./pages/UserInfo";
import Volonteer from "./pages/Volonteer";
import NewVolonteer from "./pages/NewVolonteer";

import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
import TableForEducationType from "./components/TableForEducationType";

import Events from "./pages/Events";
import Trainings from "./pages/Trainings";
import InsuranceTotal from "./pages/InsuranceTotal";
import TrainingsInfo from "./pages/TrainingsInfo";
import EventInfo from "./pages/EventInfo";

function App() {
  return (
    <div className="App">
      {" "}
      <>
        <Routes>
          <Route path="/login" element={<Login />} exact></Route>

          <Route path="/" element={<Sidebar />}>
            <Route element={<Navigate to="login" />} path="/login" />
            <Route path="/Volonteers" element={<Volonteer />} />
            <Route path="/Volonteers/:id" element={<UserInfo />} />
            <Route path="/newvolonteer" element={<NewVolonteer />} />
            <Route path="/MesTrainings" element={<Trainings />} />
            <Route path="/trainings/:id" element={<TrainingsInfo />} />
            <Route path="/events/:id" element={<EventInfo />} />
            <Route path="/events" element={<Events />} />
            <Route path="/reports" element={<Reports />} />
            <Route path="/login" element={<Login />} />
            <Route path="/admin" element={<Admin />} />
        
            
            <Route
              path="/TrainingResults"
              element={<TableForEducationType />}
            />
            <Route
              path="/MesTrainingNames"
              element={<TableForEducationType />}
            />
            <Route path="/EducationTypes" element={<TableForEducationType />} />
            <Route
              path="/EducationDegrees"
              element={<TableForEducationType />}
            />
            <Route
              path="/InsuranceCompanies"
              element={<TableForEducationType />}
            />
            <Route
              path="/ComputerSkillNames"
              element={<TableForEducationType />}
            />
            <Route path="/SkillLevels" element={<TableForEducationType />} />
            <Route
              path="/MesVoluntaryActivityEndReasons"
              element={<TableForEducationType />}
            />
            <Route path="/SupplyTypes" element={<TableForEducationType />} />
            <Route
              path="/ElectronicDocumentTypes"
              element={<TableForEducationType />}
            />
            <Route path="/LanguageNames" element={<TableForEducationType />} />
            <Route
              path="/LanguageProficiencyLevels"
              element={<TableForEducationType />}
            />
            <Route path="/userinfo" element={<UserInfo />} />{" "}
          </Route>
        </Routes>
      </>
    </div>
  );
}

export default App;
