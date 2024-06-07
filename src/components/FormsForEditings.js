import * as React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import "../App.css"
import data from "../data.json";
import Forms from './Forms';

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
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

export default function TabsUser() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={value} onChange={handleChange} variant="scrollable"
  scrollButtons
  allowScrollButtonsMobile
  aria-label="scrollable force tabs example">
          <Tab className='tabs' label="Şəxsi məlumatlar" {...a11yProps(0)} />
          <Tab className='tabs' label="Təhsil məlumatları" {...a11yProps(1)} />
          <Tab className='tabs'label="Dil bilikləri" {...a11yProps(2)} />
          <Tab  className='tabs'label="Kompüter bilikləri" {...a11yProps(3)} />
          <Tab className='tabs'label="Kurs və təlimlər" {...a11yProps(4)} />
          <Tab className='tabs'label="FHN təlimləri " {...a11yProps(5)} />
          <Tab className='tabs'label="FHN tədbirləri" {...a11yProps(6)} />
          <Tab className='tabs'label="İdman nailiyyətləri" {...a11yProps(7)} />
          <Tab className='tabs'label="Əlavə biliklər" {...a11yProps(8)} />
          <Tab className='tabs'label="Müqavilələr " {...a11yProps(9)} />
          <Tab className='tabs' label="Sığorta məlumatları" {...a11yProps(10)} />
          <Tab className='tabs'label="Könüllülük fəaliyyəti" {...a11yProps(11)} />
          <Tab className='tabs'label="FHN-də könüllülük fəaliyəti" {...a11yProps(12)} />
          <Tab className='tabs'label="Əmək fəaliyyəti " {...a11yProps(13)} />
          <Tab className='tabs' label="Əşya və ləvazimatlar" {...a11yProps(14)} />
          <Tab className='tabs'label="Elektron sənədlər" {...a11yProps(15)} />

        </Tabs>
      </Box>
      <CustomTabPanel value={value} index={0}>
      < div> 
<Forms/>
</div>
      </CustomTabPanel >
      <CustomTabPanel value={value} index={1}>
<Forms></Forms>
      </CustomTabPanel>
      <CustomTabPanel value={value} index={2}>
      <Forms/>
      </CustomTabPanel>
      <CustomTabPanel value={value} index={3}>
      <Forms/>
      </CustomTabPanel>
      <CustomTabPanel value={value} index={4}>
      <Forms/>

      </CustomTabPanel>
      <CustomTabPanel value={value} index={5}>
      <Forms/>
      </CustomTabPanel>
      <CustomTabPanel value={value} index={6}>
      <Forms/>
      </CustomTabPanel>
      <CustomTabPanel value={value} index={7}>
      <Forms/>
      </CustomTabPanel>
      <CustomTabPanel value={value} index={8}>
      <Forms/>
      </CustomTabPanel>
      <CustomTabPanel value={value} index={9}>
      <Forms/>
      </CustomTabPanel>
      <CustomTabPanel value={value} index={10}>
      <Forms/>
      </CustomTabPanel>
      <CustomTabPanel value={value} index={11}>
      <Forms/>
      </CustomTabPanel>
      <CustomTabPanel value={value} index={12}>
      <Forms/>
      </CustomTabPanel>
      <CustomTabPanel value={value} index={13}>
      <Forms/>
      </CustomTabPanel>
      <CustomTabPanel value={value} index={14}>
      <Forms/>
      </CustomTabPanel>
      <CustomTabPanel value={value} index={15}>
      <Forms/>
      </CustomTabPanel>
    </Box>
  );
}
