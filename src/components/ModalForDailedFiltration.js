import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import "../App.css";
import MultipleSelectCheckmarks from "./ui/multipleSelect";
import { useLanguages, useComputerSkills, useEducationDegree, useSecurityStatus, useVoluntaryStatus } from "../services/getServices/get";
import { useVolunteers } from "../context/VolunterContext";
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export default function ModalForDailedFiltration() {
  //HOOK
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false)
  const [status, setStatus] = React.useState([]);
  const [language, setLanguage] = React.useState([]);
  const [knowledge, setKnowledge] = React.useState([]);
  const [education, setEducation] = React.useState([]);
  const [security, setSecurity] = React.useState([]);
  const [marriage, setMarriage] = React.useState([]);
  const [gender, setGender] = React.useState([]);

  // CUSTOM HOOK
  const languages = useLanguages();
  const computerSkills = useComputerSkills();
  const educationDegrees = useEducationDegree();
  const securityStatuses = useSecurityStatus();
  const valuntaryStatuses = useVoluntaryStatus();
  const maritalStatus = [{ id: 1, name: 'Evli' }, { id: 2, name: 'Subay' }];
  const genderStatus = [{ id: 1, name: 'Qadın' }, { id: 2, name: 'Kişi' }];

// useContext
const {volunteers,setQueryString} = useVolunteers()
  const handleFilterChange = (setState) => (selected) => {
    setState(selected);
  };

  const handleSubmit = () => {
    const filters = [];
  
    const addFilters = (field, values) => {
      if (values.length > 0) {
        values.forEach(value => {
          filters.push({
            field: field,
            operator: "eq",
            value: value,
          });
        });
      }
    };
  
    addFilters("Educations.EducationType.Name", education);
    addFilters("SecurityCheckResults.SecurityCheckResultName.Name", security);
    addFilters("ComputerSkillToVolunteers.ComputerSkill.ComputerSkillName.Name", knowledge);
    addFilters("VoluntaryOfMesStatus.Name", status);
    addFilters("LanguageToVolunteers.Language.LanguageName.Name", language);
    addFilters("MaritalStatus", marriage);
    addFilters("Gender", gender);
    const queryString = JSON.stringify({ filters, logic: "and" });
    
    // Sadece queryString'i ayarla
    setQueryString(queryString);
  };
  
  console.log(volunteers)
  
  return (
    <div>
      <Button variant="contained" onClick={handleOpen}>
        Detallı filtrasiya
      </Button>
      <Modal
        border="none"
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Könüllülərin detallı axtarışı
          </Typography>
          <MultipleSelectCheckmarks
            label={'Dil biliyi'}
            data={languages}
            selectedValues={language}
            onChange={handleFilterChange(setLanguage)} 
          />
          <MultipleSelectCheckmarks
            label={'Status'}
            data={valuntaryStatuses}
            selectedValues={status}
            onChange={handleFilterChange(setStatus)} 
          />
          <MultipleSelectCheckmarks
            label={'Kompüter bilikləri'}
            data={computerSkills}
            selectedValues={knowledge}
            onChange={handleFilterChange(setKnowledge)} 
          />
          <MultipleSelectCheckmarks
            label={'Təhlükəsizlik statusu'}
            data={securityStatuses}
            selectedValues={security}
            onChange={handleFilterChange(setSecurity)} 
          />
          <MultipleSelectCheckmarks
            label={'Evlilik statusu'}
            data={maritalStatus}
            selectedValues={marriage}
            onChange={handleFilterChange(setMarriage)} 
          />
          <MultipleSelectCheckmarks
            label={'Cinsi'}
            data={genderStatus}
            selectedValues={gender}
            onChange={handleFilterChange(setGender)} 
          />
          <MultipleSelectCheckmarks
            label={'Təhsil səviyyəsi'}
            data={educationDegrees}
            selectedValues={education}
            onChange={handleFilterChange(setEducation)} 
          />
          <Button
            onClick={handleSubmit}
            variant="contained"
            sx={{ margin: "2%" }}
          >
            Filtr et
          </Button>
        </Box>
      </Modal>
    </div>
  );
}


