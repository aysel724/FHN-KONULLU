import * as React from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import "../App.css";
import CachedIcon from "@mui/icons-material/Cached";
import TableForlanguageTabs from "../tabcomponents/TableForlanguageTabs";
import TableForEducationTabs from "../tabcomponents/TableForEducationTabs";
import TableForLanguage from "./TableForTrainingDetails";
import TableFotComputerSkillsTab from "../tabcomponents/TableFotComputerSkillsTab";
import TableForTrainigsTabs from "../tabcomponents/TableForTrainingsTabs";
import TableForFHNtrainings from "../tabcomponents/TableForFHNtrainingsTab";
import TableForOtherSkillsTab from "../tabcomponents/TableForOtherSkillsTab";
import TableForFHNEvents from "../tabcomponents/TableForFHNEvents";
import TableForSportTabs from "../tabcomponents/TableForSportTabs";
import TableForInsuranceTab from "../tabcomponents/TableForInsuranceTab";
import TableForContractsTab from "../tabcomponents/TableForContractsTab";
import TableForActivitiTab from "../tabcomponents/TableForActivitiTab";
import TableForFHNactivityTab from "../tabcomponents/TableForFHNactivityTab";
import TableForSecurity from "../tabcomponents/TableForSecurity";
import TableForJob from "../tabcomponents/TableForJob";
import TableForStaff from "../tabcomponents/TableForStaff";
import TableForDocumentsTab from "../tabcomponents/TableForDocumentsTab";
import { Routes, Route, useParams } from "react-router-dom";

import axios from "axios";

import { useEffect, useState } from "react";
import formatDateTİme from "../utils/convertDate";
function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

CustomTabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

function refreshUser(user) {
  const formData = new FormData();
  formData.append("Id", user.id);
  formData.append("Email", user.email);
  formData.append("PhoneNumber1", user.phoneNumber1);
  formData.append("PhoneNumber2", user.phoneNumber2);
  formData.append("CheckFromIamas", true);
  formData.append("QueryParams", {
    additionalProp1: "string",
    additionalProp2: "string",
    additionalProp3: "string",
  });

  // console.log(data);
  //send api update request here

  const url = `https://api-volunteers.fhn.gov.az/api/v1/Volunteers`;

  const headers = {
    Accept: "*/*",
  };

  axios
    .put(url, formData, { headers })
    .then((response) => {
      console.log("Response:", response.data);
    })
    .catch((error) => {
      console.error("Error:", error);
    });
}

export default function TabsUser() {
  let params = useParams();
  let userId = params.id;
  console.log(userId);

  const [userData, setUserData] = useState({
    militaryReward: "",
    height: "",
    birthDate: "",
    citizenship: "",
    maritalStatus: "",
    identityCardGivenStructureName: "",
    identityCardReceivingDate: "",
    registrationAddress: "",
    currentAddress: "",
    pinCode: "",
    phoneNumber1: "",
    phoneNumber2: "",
    email: "",
    idCardNumber: "",
  });

  useEffect(() => {
    axios
      .get(`https://api-volunteers.fhn.gov.az/api/v1/Volunteers/${userId}`)
      .then((response) => {
        setUserData(response.data.data);

        return userData;
      })
      .catch((error) => {
        console.error("Error fetching data: ", error);
      });
  }, []); // Empty dependency array means this effect runs once after initial render

  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs
          value={value}
          onChange={handleChange}
          variant="scrollable"
          scrollButtons
          allowScrollButtonsMobile
          aria-label="scrollable force tabs example"
        >
          <Tab className="tabs" label="ŞƏXSİ MƏLUMATLAR" {...a11yProps(0)} />

          <Tab
            className="tabs"
            label="FHN-DƏ KÖNÜLLÜK FƏALİYYƏTİ"
            {...a11yProps(1)}
          />

          <Tab
            className="tabs"
            label={<span>DİL BİLİKLƏRİ</span>}
            {...a11yProps(2)}
          />
          <Tab className="tabs" label="KOMPÜTER BİLİKLƏRİ" {...a11yProps(3)} />
          <Tab className="tabs" label="KURS VƏ TƏLİMLƏR" {...a11yProps(4)} />
          <Tab className="tabs" label="FHN TƏLİMLƏRİ " {...a11yProps(5)} />
          <Tab className="tabs" label="FHN TƏDBİRLƏRİ" {...a11yProps(6)} />
          <Tab className="tabs" label="İDMAN NAİLİYYƏTLƏRİ" {...a11yProps(7)} />
          <Tab className="tabs" label="ƏLAVƏ BİLİKLƏR" {...a11yProps(8)} />
          <Tab className="tabs" label="MÜQAVİLƏLƏR " {...a11yProps(9)} />
          <Tab
            className="tabs"
            label="SIĞORTA MƏLUMATLARI"
            {...a11yProps(10)}
          />
          <Tab
            className="tabs"
            label="KÖNÜLLÜLÜK FƏALİYYƏTİ"
            {...a11yProps(11)}
          />
          <Tab className="tabs" label="TƏHSİL MƏLUMATLARI" {...a11yProps(12)} />
          <Tab className="tabs" label="ƏMƏK FƏALİYYƏTİ" {...a11yProps(13)} />
          <Tab
            className="tabs"
            label="ƏŞYA VƏ LƏVAZİMATLAR"
            {...a11yProps(14)}
          />
          <Tab className="tabs" label="ELEKTRON SƏNƏDLƏR" {...a11yProps(15)} />
          <Tab
            className="tabs"
            label="Təhlükəsizlik qeydləri"
            {...a11yProps(16)}
          />
        </Tabs>
      </Box>
      <CustomTabPanel value={value} index={0}>
        <div
          style={{
            border: "1px solid #777",
            padding: "2%",
            borderRadius: "12px",
            boxShadow: "0 10px 30px 5px rgba(0, 0, 0, 0.9);",
            textAlign: "left",
          }}
        >
          {" "}
          <div style={{ textAlign: "right" }}>
            {" "}
            <button
              style={{
                padding: "12px",
                color: "white",
                backgroundColor: "rgb(75, 125, 131)",
                borderRadius: "12px",
                border: "none",
              }}
              onClick={() => {
                refreshUser(userData);
              }}
            >
              IAMASLA YENİLƏ
            </button>
          </div>
          <p>
            <strong>Hərbi mükələfiyyəti: </strong> {userData.militaryReward}
          </p>
          <p>
            <strong>Boy: </strong>
            {userData.height}
          </p>
          <p>
            <strong>Vətəndaşlığı: </strong>
            {userData.citizenship}
          </p>
          <p>
            <strong>Ailə vəziyyəti: </strong> {userData.maritalStatus}
          </p>
          <p>
            <strong>Şəxsiyyət vəsiqəsinin seriya və nömrəsi: </strong>
            {userData.pinCode}
          </p>
          <p>
            <strong>
              Şəxsiyyət vəsiqəsinin verildiyi tarix (gün, ay, il):{" "}
            </strong>{" "}
            {formatDateTİme(userData.identityCardReceivingDate)}
          </p>
          <p>
            <strong>Şəxsiyyət vəsiqəsini verən orqanın adı: </strong>
            {userData.identityCardGivenStructureName}
          </p>
          <p>
            <strong>Qeydiyyat ünvan: </strong>
            {userData.registrationAddress}
          </p>
          <p>
            <strong>Faktiki ünvanı: </strong>
            {userData.currentAddress}
          </p>
          <p>
            <strong>Elektron-poçt ünvanı: </strong> {userData.email}
          </p>
          <p>
            <strong>Əlaqə nömrələri: </strong>
            {userData.phoneNumber1}, {userData.phoneNumber2}
          </p>
        </div>
      </CustomTabPanel>

      <CustomTabPanel value={value} index={1}>
        <TableForFHNactivityTab />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={2}>
        <TableForlanguageTabs />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={3}>
        <TableFotComputerSkillsTab />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={4}>
        <TableForTrainigsTabs />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={5}>
        <TableForFHNtrainings />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={6}>
        <TableForFHNEvents />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={7}>
        <TableForSportTabs />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={8}>
        <TableForOtherSkillsTab />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={10}>
        <TableForInsuranceTab />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={9}>
        <TableForContractsTab />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={11}>
        <TableForActivitiTab />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={12}>
        <TableForEducationTabs />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={13}>
        <TableForJob />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={14}>
        <TableForStaff />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={15}>
        <TableForDocumentsTab />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={16}>
        <TableForSecurity />
      </CustomTabPanel>
    </Box>
  );
}
