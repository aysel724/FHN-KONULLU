import React from "react";
import { Link, Outlet } from "react-router-dom";
import { useState } from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import "../App.css";
import VerifiedUserIcon from "@mui/icons-material/VerifiedUser";
import Login from "../pages/Login";
import Admin from "../pages/Admin";
import { Layout, Menu, theme, Button } from "antd";
import Reports from "../pages/Reports";
import NewEvent from "../pages/NewEvent";
import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import "../App.css";
import UserInfo from "../pages/UserInfo";
import Volonteer from "../pages/Volonteer";
import NewVolonteer from "../pages/NewVolonteer";
import TableForEducationDegree from "../components/TableForEducationDegree";
import logo from "../components/images/logo123.png";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
import TableForEducationType from "../components/TableForEducationType";
import Notification from "./Notification";
import Events from "../pages/Events";
import Trainings from "../pages/Trainings";
import icon1 from "../components/images/3.png";
import TrainingsInfo from "../pages/TrainingsInfo";

import { Divider } from "antd";
import EventInfo from "../pages/EventInfo";
import { key } from "localforage";
import NewTrainings from "../pages/NewTrainings";

import CertificatePages from "../pages/CertificatePages";
import UserIcon from "./UserIcon";
import VolunteerIcon from "../assets/icons/volunteerIcon";
import TraningIncon from "../assets/icons/traningIcon";
import EventIcon from "../assets/icons/eventIcon";
import ReportIcon from "../assets/icons/reportIcon";
import AdminPanelIcon from "../assets/icons/adminPanelIcon";
import { PiCertificateThin, PiCertificateDuotone } from "react-icons/pi";
const { Header, Content, Footer, Sider } = Layout;
function getItem(label, key, icon, children) {
  return {
    label,
    key,
    icon,
    children,
  };
}

const items = [
  getItem(
    "Könüllülər",
    "1",
    <Link to="/Volunteers" style={{ width: "35px" }}>
      <VolunteerIcon />
    </Link>
  ),
  getItem(
    "Təhlükəsizlik nəticələri",
    "21",
    <Link to="/SecurityCheckResultName" style={{ width: "35px" }}>
      <VerifiedUserIcon />
    </Link>
  ),
  getItem(
    "Təlimlər",
    "2",
    <Link to="/MesTrainings" style={{ width: "35px" }}>
      <TraningIncon />
    </Link>
  ),
  getItem(
    "Tədbirlər",
    "3",
    <Link to="/events" style={{ width: "35px" }}>
      <EventIcon />
    </Link>
  ),

  getItem(
    "Hesabatlar",
    "4",
    <Link to="/reports" style={{ width: "35px" }}>
      <ReportIcon />
    </Link>
  ),
  getItem(
    "Admin panel",
    "5",
    <Link to="/admin" style={{ width: "35px" }}>
      <AdminPanelIcon />
    </Link>,

    [
      getItem(
        <Link to="/EducationTypes" reloadDocument="true">
          <FiberManualRecordIcon
            style={{ fontSize: "small", marginRight: "10px" }}
          />
          Təhsilin tipi
        </Link>,
        "8"
      ),
      getItem(
        <Link to="/EducationDegrees" reloadDocument="true">
          <FiberManualRecordIcon
            style={{ fontSize: "small", marginRight: "10px" }}
          />
          Təhsilin dərəcəsi
        </Link>,
        "9"
      ),
      getItem(
        <Link to="/LanguageNames" reloadDocument="true">
          <FiberManualRecordIcon
            style={{ fontSize: "small", marginRight: "10px" }}
          />
          Dil
        </Link>,
        "10"
      ),
      getItem(
        <Link to="/LanguageProficiencyLevels" reloadDocument="true">
          <FiberManualRecordIcon
            style={{ fontSize: "small", marginRight: "10px" }}
          />
          Dil biliyinin səviyyəsi
        </Link>,
        "11"
      ),
      getItem(
        <Link to="/ComputerSkillNames" reloadDocument="true">
          <FiberManualRecordIcon
            style={{ fontSize: "small", marginRight: "10px" }}
          />
          Kompüter bilikləri
        </Link>,
        "12"
      ),
      getItem(
        <Link to="/SkillLevels" reloadDocument="true">
          <FiberManualRecordIcon
            style={{ fontSize: "small", marginRight: "10px" }}
          />
          Kompüter biliklərinin səviyyəsi
        </Link>,
        "13"
      ),
      getItem(
        <Link to="/InsuranceCompanies" reloadDocument="true">
          <FiberManualRecordIcon
            style={{ fontSize: "small", marginRight: "10px" }}
          />
          Sığorta şirkətləri
        </Link>,
        "14"
      ),
      getItem(
        <Link to="/MesVoluntaryActivityEndReasons" reloadDocument="true">
          <FiberManualRecordIcon
            style={{ fontSize: "small", marginRight: "10px" }}
          />
          Fəaliyyətin bitmə səbəbləri
        </Link>,
        "15"
      ),
      getItem(
        <Link to="/SupplyTypes" reloadDocument="true">
          <FiberManualRecordIcon
            style={{ fontSize: "small", marginRight: "10px" }}
          />
          Əşya və ləvazimatların növü
        </Link>,
        "16"
      ),
      getItem(
        <Link to="/ElectronicDocumentTypes" reloadDocument="true">
          <FiberManualRecordIcon
            style={{ fontSize: "small", marginRight: "10px" }}
          />
          Elektron sənədlərin növü
        </Link>,
        "17"
      ),
      getItem(
        <Link to="/MesTrainingNames" reloadDocument="true">
          <FiberManualRecordIcon
            style={{ fontSize: "small", marginRight: "10px" }}
          />
          Təlimlər
        </Link>,
        "18"
      ),
      getItem(
        <Link to="/TrainingResults" reloadDocument="true">
          <FiberManualRecordIcon
            style={{ fontSize: "small", marginRight: "10px" }}
          />
          Təlimlərin nəticəsi
        </Link>,
        "19"
      ),
    ]
  ),
  getItem(
    "Sertifikat",
    "20",
    <Link to="/certificate" style={{ width: "35px" }}>
      <PiCertificateDuotone style={{ width: "25px", height: "25px" }} />
    </Link>
  ),
];
const Sidebar = () => {
  const token = localStorage.getItem("authToken");
  const role = jwtDecode(token).unique_name;
  const [collapsed, setCollapsed] = useState(false);
  const filteredItems = items.filter((item) => {
    if (role !== "Volunteers") {
      // Hide Admin panel and items with keys 2, 3, 4, 5 for non-Volunteers roles
      if (["2", "3", "4", "5", "20"].includes(item.key)) {
        return false;
      }
    }
    // Show the Admin panel item only if the role is "admin"
    if (role === "Volunteers" && item.key === "21") {
      return false;
    }
    return true;
  });
  return (
    <>
      {/* <Login /> */}
      <Layout
        style={{
          minHeight: "100vh",
          width: "100vw",
        }}
      >
        <Sider
          width={330}
          trigger={null}
          style={{
            minHeight: "100vh",

            borderRadius: "15px",
            padding: 0,
            background: "#4b7d83",
            margin: "5px",
          }}
          collapsible
          collapsed={collapsed}
          onCollapse={(value) => setCollapsed(value)}
        >
          <div
            className="logo-container"
            // style={{
            //   backgroundColor: "white",
            // }}
          >
            <img
              src={logo}
              style={{
                width: "150px",
                textAlign: "center",
              }}
            ></img>
            <p style={{ color: "white", fontSize: "12px", marginTop: "-20px" }}>
              FÖVQƏLADƏ HALLAR KÖNÜLLÜLƏRİ
            </p>
            <Divider style={{ backgroundColor: "white", opacity: "50%" }} />
          </div>
          <Menu
            theme="dark"
            style={{
              color: "white",
              textAlign: "left",
              padding: 0,
              background: "#4b7d83",
            }}
            defaultOpenKeys={["5"]}
            darkitemselectedbg="#001529"
            mode="inline"
            items={filteredItems}
          />
        </Sider>

        <Layout style={{ minHeight: "100vh" }}>
          <Header
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              margin: "5px",
              borderRadius: "15px",
              position: "relative",
              background: "#4b7d83",
              padding: "0 50px",
            }}
          >
            <div>
              <Button
                type="text"
                icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
                onClick={() => setCollapsed(!collapsed)}
                style={{
                  color: "white",
                  fontSize: "16px",
                  width: 64,
                  height: 64,
                  marginLeft: "-50px",
                }}
              />
            </div>
            <div
              style={{
                gap: "20px",
                display: "flex",
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
                color: "white",
                alignContent: "center",
                height: "50px",
              }}
            >
              <Notification></Notification>
              <UserIcon />
            </div>
            {/* </div> */}
          </Header>

          <Content
            style={{
              padding: "20px",
            }}
          >
            <Routes>
              <Route element={<Navigate to="login" />} path="/" />

              <Route path="/Volunteers" element={<Volonteer />} />
              <Route path="/Volunteers/:id" element={<UserInfo />} />
              <Route path="/newvolonteer" element={<NewVolonteer />} />
              <Route path="/newtrainings" element={<NewTrainings />} />
              <Route path="/newevents" element={<NewEvent />} />
              <Route path="/MesTrainings" element={<Trainings />} />
              <Route path="/MesTrainings/:id" element={<TrainingsInfo />} />
              <Route path="/events/:id" element={<EventInfo />} />
              <Route path="/events" element={<Events />} />
              <Route path="/reports" element={<Reports />} />
              <Route path="/certificate" element={<CertificatePages />} />

              <Route path="/login" element={<Login />} />
              <Route path="/admin" element={<Admin />} />
              <Route
                path="/SecurityCheckResultName"
                element={<TableForEducationType />}
              />
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
                element={<TableForEducationDegree />}
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
              <Route
                path="/LanguageNames"
                element={<TableForEducationType />}
              />
              <Route
                path="/LanguageProficiencyLevels"
                element={<TableForEducationType />}
              />

              <Route path="/userinfo" element={<UserInfo />} />
            </Routes>
          </Content>
          <Footer
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
              margin: "5px",
              borderRadius: "15px",
              background: "#4b7d83",
              padding: "0 50px",
              color: "white",
            }}
          >
            <p>
              ©{new Date().getFullYear()} Rəqəmsal Texnologiyalar və
              İnnovasiyaların İnkişafı Baş İdarəsi
            </p>
          </Footer>
        </Layout>
      </Layout>
    </>
  );
};
export default Sidebar;
