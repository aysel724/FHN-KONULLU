import * as React from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import "../App.css";
// import data from "../data.json";
import { Table } from "antd";

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
const dataSource = [
  {
    key: "1",

    level: "b2yaxshi",
    address: "-------",
  },
  {
    key: "2",

    level: "a2",
    address: "10 Downing Street",
  },
];
const dataSource1 = [
  {
    key: "1",
    lang: "e",
    level: "b",
    note: "--------",
  },
  {
    note: "2",
    lang: "az",
    level: "a2",
    address: "10 Downing Street",
  },
];

const columns = [
  {
    title: "N",
    dataIndex: "1",
    key: "name",
  },
  {
    title: "Komputer biliyinin adı",
    dataIndex: "1",
    key: "name",
  },
  {
    title: "Komputer biliyinin səviyyəsi",
    dataIndex: "level",
    key: "CSS",
  },
  {
    title: "Qeyd",
    dataIndex: "address",
    key: "html",
  },
];
const columns1 = [
  {
    title: "Təhsilin tipi",
    dataIndex: "name",
    key: "name",
  },
  {
    title: "Təhsilin dərəcəsi",
    dataIndex: "level",
    key: "lang",
  },
  {
    title: "Təhsilin aldığı müəssisə",
    dataIndex: "address",
    key: "address",
  },
  {
    title: "Fakültə",
    dataIndex: "name",
    key: "name",
  },
  {
    title: "İxtisas",
    dataIndex: "level",
    key: "lang",
  },
  {
    title: "Diplomun seriya və nömrəsi",
    dataIndex: "address",
    key: "address",
  },
  {
    title: "Diplomun verilmə tarixi",
    dataIndex: "name",
    key: "name",
  },
  {
    title: "Təhsilə başlama tarixi",
    dataIndex: "level",
    key: "lang",
  },
  {
    title: "Təhsilin bitmə tarixi",
    dataIndex: "address",
    key: "address",
  },
];

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
        ></div>
          {/* <p>
            <strong>Tədbirin başlama tarixi:</strong>
            {data.users[0].events[0].start}
          </p>
          <p>
            <strong>Tədbirin bitmə tarixi:</strong>
            {data.users[0].events[0].finish}
          </p>
          <p>
            <strong>Tədbirin müddəti: </strong>
            {data.users[0].events[0].time}
          </p>
          <p>
            <strong>Tədbirin keçirilmə yeri: </strong>{" "}
            {data.users[0].events[0].address}
          </p>
          <p>
            <strong>Tədbir üzrə məsul şəxs:</strong>
            {data.users[0].events[0].couch}
          </p>
          <p>
            {/* <strong>İştirak edən könüllü sayı: </strong> {data.users.length} */}
          {/* </p>
          <p>
            <strong>Qeyd: </strong>
            {/* {data.users[0].events[0].note} */}
          {/* </p>
       
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
            <ol>
              {/* <li> {data.users[0].name}</li>
              <li> {data.users[1].name}</li>
              <li> {data.users[2].name}</li> */}
            {/* </ol>
          </div>
        </div> */}
      </CustomTabPanel>
      <CustomTabPanel value={value} index={3}></CustomTabPanel>
    </Box>
  );
}
