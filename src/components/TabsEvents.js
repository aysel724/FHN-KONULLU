import * as React from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import "../App.css";
import { useParams } from "react-router-dom";
import TableForLanguage from "../components/TableForLanguage";
import Upload from "../components/Upload";
import axios from "axios";
import { useEffect, useState } from "react";

import { Select, Space } from "antd";
import { Button } from "@mui/material";
import { supports } from "localforage";

const handleChange1 = (value) => {
  console.log(`selected ${value}`);
};
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

  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  // const [userData, setUserData] = useState({
  //   pinCode: "",
  //   name: "",
  //   surname: "",
  //   fatherName: "",
  // });

  const handleSubmit = () => {};

  const [eventData, seteventData] = useState({
    id: "",
    name: "",
    startDate: "",
    finishDate: "",
    eventDuration: "",
    eventPlace: "",
    personInCharge: "",
    note: "",
  });

  let params = useParams();
  let id = params.id;

  useEffect(() => {
    axios
      .get(`https://api-volunteers.fhn.gov.az/api/v1/Events/${id}`)
      .then((response) => {
        console.log(response);
        seteventData(response.data.data);

        return eventData;
      })
      .catch((error) => {
        console.error("Error fetching data: ", error);
      });
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
          <Tab className="tabs" label="Ümumi məlumatlar" {...a11yProps(0)} />
          <Tab
            className="tabs"
            label="İştirak edən könüllülər"
            {...a11yProps(1)}
          />{" "}
          <Tab className="tabs" label="Tədbirin sənədləri" {...a11yProps(2)} />
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
          <h2> {eventData.name}</h2>
          <p>
            <strong>Tədbirin başlama tarixi:</strong>
            {eventData.startDate}
          </p>
          <p>
            <strong>Tədbirin bitmə tarixi:</strong>
            {eventData.finishDate}
          </p>
          <p>
            <strong>Tədbirin müddəti: </strong>
            {eventData.eventDuration}
          </p>
          <p>
            <strong>Tədbirin keçirilmə yeri: </strong> {eventData.eventPlace}
          </p>
          <p>
            <strong>Tədbir üzrə məsul şəxs:</strong>
            {eventData.personInCharge}
          </p>
          <p>
            <strong>İştirak edən könüllü sayı: </strong> {eventData.volunteers}
          </p>
          <p>
            <strong>Qeyd: </strong>
            {eventData.note}
          </p>{" "}
        </div>
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1}>
        <div
          style={{
            border: "1px solid #777",
            padding: "2%",
            borderRadius: "12px",
            boxShadow: "0 10px 30px 5px rgba(0, 0, 0, 0.9);",
            textAlign: "left",
          }}
        >
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
              <Button
                style={{ border: "1px solid #4b7d83", color: " #4b7d83 " }}
              >
                Əlavə et
              </Button>
            </div>
            <TableForLanguage />
          </div>
        </div>
      </CustomTabPanel>
      <CustomTabPanel value={value} index={2}>
        {" "}
        <Upload />
      </CustomTabPanel>
    </Box>
  );
}
