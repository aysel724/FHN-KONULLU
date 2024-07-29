import * as React from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import "../App.css";
// import data from "../data.json";
import { Table } from "antd";
import axios from "axios";
import { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
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
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  let params = useParams();
  let id = params.id;
  const [trainingData, setTrainingData] = useState({
    id: "",

    startDate: "",
    description: "",
    finishDate: "",
    trainingDuration: "",
    trainingPlace: "",
    trainingMaster: "",
    note: "",
    volunteers: [],
  });

  useEffect(() => {
    axios
      .get(`https://api-volunteers.fhn.gov.az/api/v1/MesTrainings/${id}`)
      .then((response) => {
        console.log(response);
        setTrainingData(response.data.data);

        return trainingData;
      })
      .catch((error) => {
        console.error("Error fetching data: ", error);
      });
  }, []); // Empty dependency array means this effect runs once after initial render
  const imageContainerRef = useRef(null);

  // useEffect(() => {
  //   if (trainingData) {
  //     const attachments = trainingData.mesTrainingAttachments;

  //     if (
  //       attachments &&
  //       Array.isArray(attachments) &&
  //       imageContainerRef.current
  //     ) {
  //       attachments.forEach((attachment) => {
  //         if (attachment.url.match(/\.(jpeg|jpg|gif|png|pdf)$/)) {
  //           const img = document.createElement("img");
  //           img.src = attachment.url;
  //           img.alt = "Image";
  //           imageContainerRef.current.appendChild(img);
  //         }
  //       });
  //     }
  //   }
  // }, [trainingData]);

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
          />
          <Tab className="tabs" label="senedelr" {...a11yProps(3)} />
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
            <strong>Təlimin məzmunu:</strong>
            {trainingData?.description}
          </p>
          <p>
            <strong>Təlimin başlama tarixi:</strong>
            {trainingData?.startDate}
          </p>
          <p>
            <strong>Təlimin bitmə tarixi:</strong>
            {trainingData?.finishDate}
          </p>
          <p>
            <strong>Təlimin müddəti: </strong>
            {trainingData?.trainingDuration}
          </p>
          <p>
            <strong>Təlimin keçirilmə yeri: </strong>{" "}
            {trainingData?.trainingPlace}
          </p>
          <p>
            <strong>Təlimin üzrə məsul şəxs:</strong>
            {trainingData?.trainingMaster}
          </p>
          <p>
            <strong>İştirak edən könüllü sayı: </strong>{" "}
            {trainingData?.volunteers}
          </p>
          <p>
            <strong>Qeyd: </strong>
            {trainingData?.note}
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
          {/* <div>
            {trainingData.volunteers.map((e) => {
              return e.name + " " + e.surname + " " + e.fatherName;
            })}
          </div> */}
        </div>
      </CustomTabPanel>
      <CustomTabPanel value={value} index={3}>
        <div>
          <div ref={imageContainerRef} id="imageContainer"></div>
        </div>
      </CustomTabPanel>
    </Box>
  );
}
