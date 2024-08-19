import * as React from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import "../App.css";

import TableForlanguageTabs from "../tabcomponents/TableForlanguageTabs";
import TableForEducationTabs from "../tabcomponents/TableForEducationTabs";
import TableForLanguage from "../components/TableForLanguage";
import TableFotComputerSkillsTab from "../tabcomponents/TableFotComputerSkillsTab";
import TableForTrainigsTabs from "../tabcomponents/TableForTrainingsTabs";
import TableForFHNtrainings from "../tabcomponents/TableForFHNtrainingsTab";
import TableForOtherSkillsTab from "../tabcomponents/TableForOtherSkillsTab";
import TableForEventTabs from "../tabcomponents/TableForEventTabs";
import TableForSportTabs from "../tabcomponents/TableForSportTabs";
import TableForInsuranceTab from "../tabcomponents/TableForInsuranceTab";
import TableForContractsTab from "../tabcomponents/TableForContractsTab";
import TableForActivitiTab from "../tabcomponents/TableForActivitiTab";
import TableForFHNactivityTab from "../tabcomponents/TableForFHNactivityTab";
import TableForJob from "../tabcomponents/TableForJob";
import TableForStaff from "../tabcomponents/TableForStaff";
import TableForDocumentsTab from "../tabcomponents/TableForDocumentsTab";
import { Routes, Route, useParams } from "react-router-dom";
import { Select, Space } from "antd";
import { Button } from "@mui/material";
import axios from "axios";
import Upload from "../components/Upload";
import { useEffect, useState } from "react";
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

export default function TabsUser() {
  let params = useParams();
  let userId = params.id;
  console.log(userId);

  const [userData, setUserData] = useState({
    description: "",
    startDate: "",
    finishDate: "",
    trainingDuration: "",
    trainingPlace: "",
    trainingMaster: "",
    priority: "",
  });
  const handleChange1 = (value) => {
    console.log(`selected ${value}`);
  };
  useEffect(() => {
    axios
      .get(`https://api-volunteers.fhn.gov.az/api/v1/MesTrainings/${userId}`)
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

  const [options, setOptions] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://api-volunteers.fhn.gov.az/api/v1/Volunteers`,
          {
            headers: { accept: "*/*" },
          }
        );

        const newData = response.data.data.map((e) => ({
          label: `${e.name} ${e.surname}  ${e.fatherName}`,
          value: e.id.toString(),
        }));

        setOptions(newData);
      } catch (error) {
        console.error("Error fetching data:", error);
        // Handle errors here if needed
      }
    };

    fetchData();
  }, []);

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
          <Tab
            className="tabs"
            label="Təlimin ətraflı məlumatları"
            {...a11yProps(0)}
          />
          <Tab
            className="tabs"
            label="İştirak edən könüllülər"
            {...a11yProps(1)}
          />
          <Tab className="tabs" label="Təlimin sənədləri" {...a11yProps(2)} />
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
          <p>
            <strong>Təlimin təsviri :</strong> {userData.description}
          </p>
          <p>
            <strong>Təlimin başlama tarixi : </strong>
            {userData.startDate}
          </p>
          <p>
            <strong>Təlimin bitmə tarixi :</strong>
            {userData.finishDate}
          </p>
          <p>
            <strong>Təlimin müddəti :</strong> {userData.trainingDuration}
          </p>
          <p>
            <strong>Təlimin keçirildiyi yer :</strong>
            {userData.trainingPlace}
          </p>
          <p>
            <strong>Təlimçi</strong> {userData.trainingMaster}
          </p>
          <p>
            <strong>Prioritet</strong>
            {userData.priority}
          </p>
          {/* <p>
            <strong>Qeydiyyat ünvan: </strong>
            {userData.volunteers}
          </p>
          <p>
            <strong>Faktiki ünvanı: </strong>
            {userData.mesTrainingAttachments}
          </p> */}
        </div>
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1}>
        <div>
          <Space
            style={{
              width: "100%",
            }}
            direction="vertical"
          >
            <Select
              mode="multiple"
              allowClear
              style={{
                marginBottom: "30px",
                width: "100%",
              }}
              placeholder="Könüllüləri seçin"
              defaultValue={[]}
              onChange={handleChange1}
              options={options}
            />
          </Space>{" "}
          <div
            style={{
              display: "flex",
              alignContent: "center",
              justifyContent: "end",
              marginBottom: "30px",
              width: "100%",
            }}
          >
            <Button>Əlavə et</Button>
          </div>
          <TableForLanguage />
        </div>
      </CustomTabPanel>
      <CustomTabPanel value={value} index={2}>
        <Upload />
      </CustomTabPanel>
    </Box>
  );
}
