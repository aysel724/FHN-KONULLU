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
import TableForFHNEvents from "../tabcomponents/TableForFHNEvents";
import TableForSportsTab from "../tabcomponents/TableForSportsTab";
import TableForInsuranceTab from "../tabcomponents/TableForInsuranceTab";
import TableForContractsTab from "../tabcomponents/TableForContractsTab";
import TableForActivitiTab from "../tabcomponents/TableForActivitiTab"
import TableForFHNactivityTab from "../tabcomponents/TableForFHNactivityTab"
import TableForJob from "../tabcomponents/TableForJob"
import TableForStaff from '../tabcomponents/TableForStaff'
import TableForDocumentsTab from "../tabcomponents/TableForDocumentsTab"
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
          <Tab className="tabs" label="Şəxsi məlumatlar" {...a11yProps(0)} />
          <Tab className="tabs" label="FHN-də könüllülük fəaliyəti" {...a11yProps(1)} />
          <Tab className="tabs" label="Dil bilikləri" {...a11yProps(2)} />
          <Tab className="tabs" label="Kompüter bilikləri" {...a11yProps(3)} />
          <Tab className="tabs" label="Kurs və təlimlər" {...a11yProps(4)} />
          <Tab className="tabs" label="FHN təlimləri " {...a11yProps(5)} />
          <Tab className="tabs" label="FHN tədbirləri" {...a11yProps(6)} />
          <Tab className="tabs" label="İdman nailiyyətləri" {...a11yProps(7)} />
          <Tab className="tabs" label="Əlavə biliklər" {...a11yProps(8)} />
          <Tab className="tabs" label="Müqavilələr " {...a11yProps(9)} />
          <Tab
            className="tabs"
            label="Sığorta məlumatları"
            {...a11yProps(10)}
          />
          <Tab
            className="tabs"
            label="Könüllülük fəaliyyəti"
            {...a11yProps(11)}
          />
          <Tab
            className="tabs"
            label="Təhsil məlumatları" 
            {...a11yProps(12)}
          />
          <Tab className="tabs" label="Əmək fəaliyyəti " {...a11yProps(13)} />
          <Tab
            className="tabs"
            label="Əşya və ləvazimatlar"
            {...a11yProps(14)}
          />
          <Tab className="tabs" label="Elektron sənədlər" {...a11yProps(15)} />
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
            <strong>Hərbi mükələfiyyəti:</strong>
            {/* {data.users[0].job.name} */}
          </p>
          <p>
            <strong>Boy: </strong>
            {/* {data.users[0].boy} */}
          </p>
          <p>
            <strong>Vətəndaşlığı: </strong>08.10.2002
          </p>
          <p>
            <strong>Ailə vəziyyəti:</strong> Azərbaycan, Ağdaş rayonu
          </p>
          <p>
            <strong>Şəxsiyyət vəsiqəsinin seriya və nömrəsi:</strong>Fəaliyyəti
            dəvam edən
          </p>
          <p>
            <strong>
              Şəxsiyyət vəsiqəsinin verildiyi tarix (gün, ay, il):{" "}
            </strong>{" "}
            10.02.2024
          </p>
          <p>
            <strong>Şəxsiyyət vəsiqəsini verən orqanın adı: </strong>
            {/* {data.users[0].job.name} */}
          </p>
          <p>
            <strong>Qeydiyyat ünvan: </strong>
          
          </p>
          <p>
            <strong>Faktiki ünvanı: </strong>08.10.2002
          </p>
          <p>
            <strong>Elektron-poçt ünvanı:</strong> Azərbaycan, Ağdaş rayonu
          </p>
          <p>
            <strong>Əlaqə nömrələri: </strong>Fəaliyyəti dəvam edən
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
        <TableForSportsTab />
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
        <TableForJob/>
      </CustomTabPanel>
      <CustomTabPanel value={value} index={14}>
        <TableForStaff />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={15}>
        <TableForDocumentsTab />
      </CustomTabPanel>
    </Box>
  );
}
