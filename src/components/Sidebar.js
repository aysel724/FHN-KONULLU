import React from "react";
import { Link, Outlet } from "react-router-dom";
import { useState } from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import "../App.css";
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

import TrainingsInfo from "../pages/TrainingsInfo";

import { Divider } from "antd";
import EventInfo from "../pages/EventInfo";
import { key } from "localforage";
import NewTrainings from "../pages/NewTrainings";
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
    <Link to="/Volunteers">
      <svg
        width="30"
        height="24"
        viewBox="0 0 30 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M4.5 10.4805C6.15469 10.4805 7.5 9.14567 7.5 7.50391C7.5 5.86215 6.15469 4.52734 4.5 4.52734C2.84531 4.52734 1.5 5.86215 1.5 7.50391C1.5 9.14567 2.84531 10.4805 4.5 10.4805ZM25.5 10.4805C27.1547 10.4805 28.5 9.14567 28.5 7.50391C28.5 5.86215 27.1547 4.52734 25.5 4.52734C23.8453 4.52734 22.5 5.86215 22.5 7.50391C22.5 9.14567 23.8453 10.4805 25.5 10.4805ZM27 11.9688H24C23.175 11.9688 22.4297 12.299 21.8859 12.8338C23.775 13.8617 25.1156 15.7174 25.4062 17.9219H28.5C29.3297 17.9219 30 17.2568 30 16.4336V14.9453C30 13.3036 28.6547 11.9688 27 11.9688ZM15 11.9688C17.9016 11.9688 20.25 9.63866 20.25 6.75977C20.25 3.88087 17.9016 1.55078 15 1.55078C12.0984 1.55078 9.75 3.88087 9.75 6.75977C9.75 9.63866 12.0984 11.9688 15 11.9688ZM18.6 13.457H18.2109C17.2359 13.9221 16.1531 14.2012 15 14.2012C13.8469 14.2012 12.7688 13.9221 11.7891 13.457H11.4C8.41875 13.457 6 15.8569 6 18.8148V20.1543C6 21.3868 7.00781 22.3867 8.25 22.3867H21.75C22.9922 22.3867 24 21.3868 24 20.1543V18.8148C24 15.8569 21.5812 13.457 18.6 13.457ZM8.11406 12.8338C7.57031 12.299 6.825 11.9688 6 11.9688H3C1.34531 11.9688 0 13.3036 0 14.9453V16.4336C0 17.2568 0.670312 17.9219 1.5 17.9219H4.58906C4.88438 15.7174 6.225 13.8617 8.11406 12.8338Z"
          fill="white"
        />
      </svg>
    </Link>
  ),
  getItem(
    "Təlimlər",
    "2",
    <Link to="/MesTrainings">
      <svg
        width="22"
        height="23"
        viewBox="0 0 22 23"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M19.4888 14.6278H11.407C12.324 14.5467 13.1743 14.1183 13.7812 13.4314C14.3881 12.7445 14.7049 11.852 14.6659 10.9394C14.6268 10.0268 14.2349 9.16414 13.5715 8.53076C12.9081 7.89738 12.0243 7.54194 11.1037 7.5383H8.46367C8.85836 7.01173 9.14065 6.41082 9.2933 5.77231C9.44594 5.1338 9.46573 4.47111 9.35144 3.82476C9.23716 3.1784 8.9912 2.56197 8.62862 2.01314C8.26603 1.46432 7.79444 0.994636 7.24267 0.632813L19.4888 0.632812C20.0509 0.633639 20.5897 0.855764 20.9869 1.25041C21.384 1.64506 21.6071 2.17997 21.6071 2.73767V12.5276C21.6071 13.6876 20.658 14.6293 19.4888 14.6293V14.6278ZM4.55395 7.54141C4.94089 7.55035 5.32572 7.48244 5.68584 7.3417C6.04595 7.20095 6.37407 6.9902 6.65091 6.72184C6.92776 6.45347 7.14774 6.1329 7.29794 5.77897C7.44813 5.42505 7.5255 5.0449 7.5255 4.66088C7.5255 4.27686 7.44813 3.89672 7.29794 3.54279C7.14774 3.18886 6.92776 2.86829 6.65091 2.59993C6.37407 2.33156 6.04595 2.12081 5.68584 1.98006C5.32572 1.83932 4.94089 1.77142 4.55395 1.78035C3.79566 1.79785 3.07438 2.10902 2.54432 2.64732C2.01426 3.18562 1.7175 3.90832 1.7175 4.66088C1.7175 5.41345 2.01426 6.13614 2.54432 6.67444C3.07438 7.21274 3.79566 7.52391 4.55395 7.54141ZM12.7175 11.09C12.7175 10.2044 11.9947 9.48724 11.1037 9.48724H4.55552C4.0086 9.48703 3.467 9.59376 2.96167 9.80133C2.45635 10.0089 1.9972 10.3132 1.61047 10.6969C1.22374 11.0807 0.917004 11.5362 0.707802 12.0376C0.498601 12.539 0.391029 13.0763 0.391236 13.619V15.4978C0.391236 16.3272 1.07009 16.9992 1.90609 16.9992H2.17638L2.61952 21.0686C2.66096 21.4507 2.84316 21.8041 3.13115 22.0611C3.41914 22.3181 3.79264 22.4605 4.17995 22.4609H4.96881C5.34789 22.4608 5.71414 22.3247 6.00004 22.0777C6.28593 21.8307 6.47221 21.4895 6.52452 21.1169L7.70781 12.6913H11.1021C11.9931 12.6913 12.716 11.9741 12.716 11.09H12.7175Z"
          fill="white"
        />
      </svg>
    </Link>
  ),
  getItem(
    "Tədbirlər",
    "3",
    <Link to="/events">
      <svg
        width="24"
        height="25"
        viewBox="0 0 24 25"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M19 19.0703H5V8.15625H19M16 1.21094V3.19531H8V1.21094H6V3.19531H5C3.9 3.19531 3 4.08828 3 5.17969V19.0703C3 19.5966 3.21071 20.1013 3.58579 20.4735C3.96086 20.8456 4.46957 21.0547 5 21.0547H19C20.11 21.0547 21 20.1716 21 19.0703V5.17969C21 4.6534 20.7893 4.14866 20.4142 3.77652C20.0391 3.40438 19.5304 3.19531 19 3.19531H18V1.21094M10.88 12.125H7.27L10.19 14.2185L9.08 17.6416L12 15.5282L14.92 17.6416L13.8 14.2284L16.72 12.125H13.12L12 8.71188L10.88 12.125Z"
          fill="white"
        />
      </svg>
    </Link>
  ),

  getItem(
    "Hesabatlar",
    "4",
    <Link to="/reports">
      <svg
        width="27"
        height="27"
        viewBox="0 0 27 27"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M9 6.19466H6.75C6.15326 6.19466 5.58097 6.42115 5.15901 6.8243C4.73705 7.22746 4.5 7.77425 4.5 8.3444V21.2428C4.5 21.813 4.73705 22.3598 5.15901 22.7629C5.58097 23.1661 6.15326 23.3926 6.75 23.3926H13.1591M20.25 15.8685V20.168H24.75M20.25 12.6439V8.3444C20.25 7.77425 20.0129 7.22746 19.591 6.8243C19.169 6.42115 18.5967 6.19466 18 6.19466H15.75"
          stroke="white"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M9 12.6439H13.5M9 16.9434H12.375M9 6.19466C9 5.62451 9.23705 5.07772 9.65901 4.67457C10.081 4.27141 10.6533 4.04492 11.25 4.04492H13.5C14.0967 4.04492 14.669 4.27141 15.091 4.67457C15.5129 5.07772 15.75 5.62451 15.75 6.19466C15.75 6.76481 15.5129 7.3116 15.091 7.71476C14.669 8.11791 14.0967 8.3444 13.5 8.3444H11.25C10.6533 8.3444 10.081 8.11791 9.65901 7.71476C9.23705 7.3116 9 6.76481 9 6.19466ZM15.75 20.168C15.75 21.3083 16.2241 22.4018 17.068 23.2082C17.9119 24.0145 19.0565 24.4674 20.25 24.4674C21.4435 24.4674 22.5881 24.0145 23.432 23.2082C24.2759 22.4018 24.75 21.3083 24.75 20.168C24.75 19.0277 24.2759 17.9341 23.432 17.1278C22.5881 16.3215 21.4435 15.8685 20.25 15.8685C19.0565 15.8685 17.9119 16.3215 17.068 17.1278C16.2241 17.9341 15.75 19.0277 15.75 20.168Z"
          stroke="white"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </Link>
  ),
  getItem(
    "Admin panel",
    "5",
    <Link to="/admin">
      <svg
        width="24"
        height="25"
        viewBox="0 0 24 25"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g clipPath="url(#clip0_3_866)">
          <path
            d="M9.78003 9.81823C11.9892 9.81823 13.78 8.04136 13.78 5.84948C13.78 3.6576 11.9892 1.88073 9.78003 1.88073C7.57089 1.88073 5.78003 3.6576 5.78003 5.84948C5.78003 8.04136 7.57089 9.81823 9.78003 9.81823Z"
            fill="white"
          />
          <path
            d="M10.96 21.407C10.7397 21.1908 10.596 20.9096 10.5503 20.6055C10.5046 20.3014 10.5595 19.9908 10.7067 19.7203L11.06 19.0588L10.3334 18.8405C10.037 18.7485 9.77907 18.5631 9.5986 18.3124C9.41812 18.0617 9.325 17.7594 9.33337 17.4515V16.0955C9.33281 15.7889 9.43168 15.4902 9.61536 15.2436C9.79904 14.9971 10.0578 14.8157 10.3534 14.7262L11.08 14.508L10.7334 13.8465C10.5905 13.5797 10.5361 13.2749 10.578 12.9756C10.6199 12.6763 10.7559 12.3977 10.9667 12.1796C10.4538 12.1129 9.93729 12.0776 9.42004 12.0738C7.89225 12.0381 6.37536 12.3374 4.97753 12.9502C3.57971 13.5631 2.33541 14.4744 1.33337 15.6192V20.7455C1.33337 20.9209 1.40361 21.0892 1.52864 21.2132C1.65366 21.3373 1.82323 21.407 2.00004 21.407H10.96Z"
            fill="white"
          />
          <path
            d="M22.4666 15.8772L21.1333 15.4803C21.0409 15.1536 20.9112 14.8385 20.7466 14.541L21.4133 13.3107C21.4391 13.2651 21.4485 13.2121 21.44 13.1604C21.4315 13.1088 21.4057 13.0615 21.3666 13.0263L20.4 12.0606C20.3627 12.0246 20.3153 12.0009 20.264 11.9926C20.2127 11.9843 20.1601 11.9919 20.1133 12.0143L18.88 12.6757C18.5764 12.5121 18.257 12.3791 17.9266 12.2789L17.52 10.9559C17.5021 10.9072 17.4694 10.8651 17.4264 10.8355C17.3834 10.8059 17.3323 10.7902 17.28 10.7906H15.8933C15.8413 10.792 15.791 10.8093 15.7493 10.8401C15.7076 10.8708 15.6764 10.9136 15.66 10.9626L15.26 12.2855C14.9232 12.3827 14.5988 12.5181 14.2933 12.689L13.0866 12.0275C13.0397 12.0028 12.9862 11.9933 12.9335 12.0004C12.8809 12.0075 12.8318 12.0309 12.7933 12.0672L11.8133 13.0197C11.7747 13.0566 11.7493 13.1049 11.7409 13.1575C11.7324 13.21 11.7415 13.2638 11.7666 13.3107L12.4333 14.5146C12.2547 14.8134 12.1094 15.1305 12 15.4605L10.6666 15.864C10.6162 15.8784 10.5719 15.9089 10.5406 15.9507C10.5093 15.9925 10.4927 16.0434 10.4933 16.0955V17.4515C10.4927 17.5035 10.5093 17.5544 10.5406 17.5962C10.5719 17.638 10.6162 17.6685 10.6666 17.683L12 18.0865C12.0999 18.4104 12.234 18.723 12.4 19.0191L11.7333 20.2759C11.7082 20.3228 11.6991 20.3766 11.7075 20.4292C11.716 20.4817 11.7414 20.53 11.78 20.5669L12.7733 21.526C12.8118 21.5623 12.8609 21.5857 12.9135 21.5928C12.9662 21.5999 13.0197 21.5905 13.0666 21.5657L14.3133 20.9043C14.61 21.0626 14.9229 21.189 15.2466 21.2813L15.6466 22.6373C15.6634 22.6873 15.6956 22.7308 15.7387 22.7617C15.7818 22.7925 15.8335 22.8092 15.8866 22.8093H17.2533C17.3053 22.8078 17.3556 22.7906 17.3973 22.7598C17.439 22.729 17.4702 22.6863 17.4866 22.6373L17.8866 21.2813C18.2065 21.1901 18.5151 21.0637 18.8066 20.9043L20.0666 21.5657C20.1135 21.5905 20.1671 21.5999 20.2198 21.5928C20.2724 21.5857 20.3214 21.5623 20.36 21.526L21.3333 20.5669C21.3699 20.5287 21.3934 20.48 21.4006 20.4278C21.4078 20.3756 21.3982 20.3224 21.3733 20.2759L20.7066 19.0323C20.8661 18.7426 20.9935 18.4365 21.0866 18.1195L22.42 17.716C22.4701 17.7001 22.5141 17.6694 22.5462 17.628C22.5784 17.5867 22.5971 17.5367 22.6 17.4845V16.1153C22.6016 16.0674 22.59 16.0199 22.5666 15.9779C22.5431 15.936 22.5085 15.9012 22.4666 15.8772ZM16.58 18.9993C16.1393 19.0006 15.7081 18.8721 15.3411 18.6302C14.974 18.3882 14.6876 18.0436 14.5181 17.64C14.3485 17.2365 14.3034 16.7921 14.3886 16.3631C14.4738 15.9341 14.6853 15.5398 14.9965 15.2302C15.3076 14.9205 15.7043 14.7095 16.1364 14.6237C16.5686 14.5379 17.0166 14.5813 17.4239 14.7483C17.8311 14.9153 18.1793 15.1985 18.4242 15.5619C18.6692 15.9254 18.8 16.3528 18.8 16.79C18.8 17.3748 18.5663 17.9357 18.1502 18.3499C17.734 18.764 17.1694 18.9975 16.58 18.9993Z"
            fill="white"
          />
        </g>
        <defs>
          <clipPath id="clip0_3_866">
            <rect
              width="94"
              height="23.8125"
              fill="white"
              transform="translate(0 0.359375)"
            />
          </clipPath>
        </defs>
      </svg>
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
];
const Sidebar = () => {
  const [collapsed, setCollapsed] = useState(false);

  // &#9776;
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
                width: "120px",
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
            items={items}
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
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                color: "white",
                alignContent: "center",
                height: "50px",
              }}
            >
              <Notification></Notification>
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
