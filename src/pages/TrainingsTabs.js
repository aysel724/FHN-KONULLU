import * as React from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import "../App.css";
import TableForTrainingDetails from "../components/TableForTrainingDetails";

import { Routes, Route, useParams } from "react-router-dom";
import { message, Select, Space } from "antd";
import { Button } from "@mui/material";
import axios from "axios";
import Upload from "../components/Upload";
import { useEffect, useState } from "react";
import formatDateTİme from "../utils/convertDate";
import { BASE_URL } from "../api/baseURL";
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

  const [volonteerIDs, setVolonteerIDs] = useState([]);
  const [validationError, setValidationError] = useState(false);


  const handleChange1 = (value) => {
    setVolonteerIDs(value);
    setValidationError(false)
    console.log(`selected ${value}`);
  };

  async function postVolonteers(array) {
    if(volonteerIDs.length === 0){
      setValidationError(false)
      message.error("Zəhmət olmasa ən azı bir könüllü seçin."); 
      return;
      }
    const url = `${BASE_URL}/MesTrainings/AddVolunteerToMesTraining`;

    const headers = {
      Accept: "*/*",
      "Content-Type": "application/json",
    };

    const newUser = {
      mesTrainingId: userId,
      volunteerIds: array,
    };

    try {
      const response = await axios.post(url, newUser, { headers });
      window.location.reload();
      // console.log(user);
      console.log(response.data);
    } catch (error) {
      console.error("Error:", error);
    }
  }

  const [userData, setUserData] = useState({
    mesTrainingName: "",
    description: "",
    startDate: "",
    finishDate: "",
    trainingDuration: "",
    trainingPlace: "",
    trainingMaster: "",
    priority: "",
    volunteers: [],
  });

  useEffect(() => {
    axios
      .get(`${BASE_URL}/MesTrainings/${userId}`)
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
          `${BASE_URL}/Volunteers`,
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
            label="TƏLİMİN ətraflı məlumatları"
            {...a11yProps(0)}
          />
          <Tab
            className="tabs"
            label="İştİrak edən könüllülər"
            {...a11yProps(1)}
          />
          <Tab className="tabs" label="TƏLİMİN  sənədlərİ" {...a11yProps(2)} />
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
            <strong>Təlimin adı :</strong> {userData.mesTrainingName.name}
          </p>
          <p>
            <strong>Təlimin təsviri :</strong> {userData.description}
          </p>
          <p>
            <strong>Təlimin başlama tarixi : </strong>
            {formatDateTİme(userData.startDate)}
          </p>
          <p>
            <strong>Təlimin bitmə tarixi :</strong>
            {formatDateTİme(userData.finishDate)}
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
          <p>
            <strong>İştirak edən könüllü sayı: </strong>
            {userData.volunteers.length}
          </p>
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
              placeholder="Təlimə yeni könüllü əlavə edin"
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
          >{validationError && (
            <div style={{ color: "red" }}>
              Zəhmət olmasa ən azı bir könüllü seçin.
            </div>
          )}
            <Button
              variant="contained"
              onClick={() => {
                postVolonteers(volonteerIDs);
              }}
            >
              Əlavə et
            </Button>
          </div>
          <TableForTrainingDetails />
        </div>
      </CustomTabPanel>
      <CustomTabPanel value={value} index={2}>
        <Upload />
      </CustomTabPanel>
    </Box>
  );
}
