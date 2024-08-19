import * as React from "react";
import Sidebar from "./components/Sidebar";
import { Link } from "react-router-dom";
import { useState } from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Admin from "./pages/Admin";
import NewEvent from "./pages/NewEvent";
import Reports from "./pages/Reports";
import NewTrainings from "./pages/NewTrainings";
import UserInfo from "./pages/UserInfo";
import Volonteer from "./pages/Volonteer";
import NewVolonteer from "./pages/NewVolonteer";
import { AuthProvider } from "./context/AuthContext";
import TableForEducationType from "./components/TableForEducationType";
// import AuthProvider from "./context/AuthContext";
import Events from "./pages/Events";
import Trainings from "./pages/Trainings";
import PrivateRoute from "./context/PrivateRoute";
import TrainingsInfo from "./pages/TrainingsInfo";
import EventInfo from "./pages/EventInfo";
import CertificatePages from "./pages/CertificatePages";

function App() {
  return (
    <AuthProvider>
      <div className="App">
        {" "}
        <>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route element={<PrivateRoute />}>
              <Route path="/" element={<Sidebar />}>
                <Route path="/Volunteers" element={<Volonteer />} />
                <Route path="/Volunteers/:id" element={<UserInfo />} />
                <Route path="/newvolonteer" element={<NewVolonteer />} />
                <Route path="/newevents" element={<NewEvent />} />
                <Route path="/MesTrainings" element={<Trainings />} />
                <Route path="/MesTrainings/:id" element={<TrainingsInfo />} />
                <Route path="/events/:id" element={<EventInfo />} />
                <Route path="/events" element={<Events />} />
                <Route path="/reports" element={<Reports />} />
                <Route path="/certificate" element={<CertificatePages />} />
                {/* <Route path="/Login" element={<Login />} /> */}
                <Route path="/admin" element={<Admin />} />
                <Route path="/newtrainings" element={<NewTrainings />} />
                <Route
                  path="/TrainingResults"
                  element={<TableForEducationType />}
                />
                <Route
                  path="/MesTrainingNames"
                  element={<TableForEducationType />}
                />
                <Route
                  path="/EducationTypes"
                  element={<TableForEducationType />}
                />
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
                <Route
                  path="/SkillLevels"
                  element={<TableForEducationType />}
                />
                <Route
                  path="/MesVoluntaryActivityEndReasons"
                  element={<TableForEducationType />}
                />
                <Route
                  path="/SupplyTypes"
                  element={<TableForEducationType />}
                />
                <Route
                  path="/ElectronicDocumentTypes"
                  element={<TableForEducationType />}
                />
                <Route
                  path="/LanguageNames"
                  element={<TableForEducationType />}
                />
                <Route
                  path="/LanguageProficiencyLevels"
                  element={<TableForEducationType />}
                />
                <Route path="/userinfo" element={<UserInfo />} />{" "}
              </Route>
            </Route>
          </Routes>
        </>
      </div>
    </AuthProvider>
  );
}

export default App;
