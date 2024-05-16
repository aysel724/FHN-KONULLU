import * as React from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import "../App.css";
import data from "../data.json";
import { Table } from "antd";
import ImagesForEvents from "./ImagesForEvents";

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
          <Tab className="tabs" label="Şəkillər" {...a11yProps(0)} />
          <Tab
            className="tabs"
            label="Sənədlər"
            {...a11yProps(1)}
          />
        </Tabs>
      </Box>
      <CustomTabPanel  value={value} index={0}>
           <ImagesForEvents/>
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1}>
        <div  style={{textAlign:"left", display:"flex", flexDirection:"column"}}>
<ul> 
    <li>doc1</li>
    <li>doc1</li>
    <li>doc1</li>
    <li>doc1</li>
</ul>
<ul> 
    <li>doc1</li>
    <li>doc1</li>
    <li>doc1</li>
    <li>doc1</li>
</ul>
<ul> 
    <li>doc1</li>
    <li>doc1</li>
    <li>doc1</li>
    <li>doc1</li>
</ul>
</div>
      </CustomTabPanel>

    </Box>
  );
}
