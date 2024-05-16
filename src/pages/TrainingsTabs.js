import * as React from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import "../App.css";
import data from "../data.json";
import TabsDocuments from "../components/TabsDocuments"
import ImagesForEvents from "../components/ImagesForEvents";
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
          <Tab className="tabs" label="Ümumi məlumatlar" {...a11yProps(0)} />
          <Tab
            className="tabs"
            label="İştirak edən könüllülər"
            {...a11yProps(2)}
          />
          <Tab className="tabs" label="Elektron sənədlər" {...a11yProps(1)} />

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
            <strong>Təlimin məzmunu: :</strong>
            {data.users[0].trainings[0].desc}
          </p>
          <p>
            <strong>Təlimin başlama tarixi: </strong>
            {data.users[0].trainings[0].start}
          </p>
          <p>
            <strong>Təlimin bitmə tarixi: </strong>
            {data.users[0].trainings[0].finish}
          </p>
          <p>
            <strong>Təlimin müddəti: </strong> {data.users[0].trainings[0].time}
          </p>
          <p>
            <strong>Təlimin keçirilmə yeri:</strong>
            {data.users[0].trainings[0].adress}
          </p>
          <p>
            <strong>Təlimçi: </strong> {data.users[0].trainings[0].couch}
          </p>
          <p>
            <strong>Təlimin nəticəsi: </strong>
            {data.users[0].trainings[0].resault}
          </p>
          <p>
            <strong>İştirak edən könüllü sayı: </strong>
            {data.users.length}
          </p>
        </div>
      </CustomTabPanel>
      <CustomTabPanel value={value} index={2}>
       <TabsDocuments/>


        <CustomTabPanel value={value} index={0}>
          <div>
            <p>
              <strong>Təlimin məzmunu: :</strong>
              {data.users[0].trainings[0].desc}
            </p>
            <p>
              <strong>Təlimin başlama tarixi: </strong>
              {data.users[0].trainings[0].start}
            </p>
            <p>
              <strong>Təlimin bitmə tarixi: </strong>
              {data.users[0].trainings[0].finish}
            </p>
          </div>
        </CustomTabPanel>
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
              <li> {data.users[0].name}</li>
              <li> {data.users[1].name}</li>
              <li> {data.users[2].name}</li>
            </ol>
          </div>
        </div>
      </CustomTabPanel>
      <CustomTabPanel value={value} index={3}></CustomTabPanel>
    </Box>
  );
}
