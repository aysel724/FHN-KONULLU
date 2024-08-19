import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import "../App.css";
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
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [status, setStatus] = React.useState("");
  const [language, setLanguage] = React.useState("");
  const [gender, setGender] = React.useState("");
  const [knowledge, setKnowledge] = React.useState("");
  const [education, setEducation] = React.useState("");
  const [security, setSecurity] = React.useState("");
  const [marriage, setMarriage] = React.useState("");
  const handleChange = (event) => {
    setStatus(event.target.value);
  };
  const handleChange1 = (event) => {
    setGender(event.target.value);
  };
  const handleChange2 = (event) => {
    setLanguage(event.target.value);
  };
  const handleChange3 = (event) => {
    setKnowledge(event.target.value);
  };
  const handleChange4 = (event) => {
    setEducation(event.target.value);
  };
  const handleChange5 = (event) => {
    setSecurity(event.target.value);
    setMarriage(event.target.value);
  };
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
          <FormControl fullWidth sx={{ margin: "2%" }}>
            <InputLabel id="demo-simple-select-label">Dil biliy</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={language}
              label="Dil biliyi"
              onChange={handleChange2}
            >
              <MenuItem value={1}>en</MenuItem>
              <MenuItem value={2}>rus</MenuItem>
              <MenuItem value={3}>az</MenuItem>
            </Select>
          </FormControl>
          <FormControl fullWidth sx={{ margin: "2%" }}>
            <InputLabel id="demo-simple-select-label">Status</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={status}
              label="Status"
              onChange={handleChange}
            >
              <MenuItem value={10}>active</MenuItem>
              <MenuItem value={20}>deactive</MenuItem>
              <MenuItem value={30}>in grogress</MenuItem>
            </Select>
          </FormControl>
          <FormControl fullWidth sx={{ margin: "2%" }}>
            <InputLabel id="demo-simple-select-label">
              Kompüter biliyi
            </InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={knowledge}
              label="Təhsil səviyyəsi"
              onChange={handleChange3}
            >
              <MenuItem value={4}>html</MenuItem>
              <MenuItem value={5}>css</MenuItem>
              <MenuItem value={6}>js</MenuItem>
            </Select>
          </FormControl>
          <FormControl fullWidth sx={{ margin: "2%" }}>
            <InputLabel id="demo-simple-select-label">
              Təhlükəsizlik statusu
            </InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={security}
              label="T'hluk'sizlik statusu"
              onChange={handleChange5}
            >
              <MenuItem value={4}>+</MenuItem>
              <MenuItem value={5}>-</MenuItem>
            </Select>
          </FormControl>
          <FormControl fullWidth sx={{ margin: "2%" }}>
            <InputLabel id="demo-simple-select-label">
              Evlilik statusu
            </InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={marriage}
              label="Evlilik statusu"
              onChange={handleChange5}
            >
              <MenuItem value={4}>evli</MenuItem>
              <MenuItem value={5}>subay</MenuItem>
            </Select>
          </FormControl>
          <FormControl fullWidth sx={{ margin: "2%" }}>
            <InputLabel id="demo-simple-select-label">Cinsi</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={gender}
              label="Cinsi"
              onChange={handleChange1}
            >
              <MenuItem value={7}>Qadin</MenuItem>
              <MenuItem value={8}>Kishi</MenuItem>
            </Select>
          </FormControl>
          <FormControl fullWidth sx={{ margin: "2%" }}>
            <InputLabel id="demo-simple-select-label">
              Təhsil səviyyəsi
            </InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={education}
              label="Kompüter bilikləri"
              onChange={handleChange4}
            >
              <MenuItem value={11}>Ali</MenuItem>
              <MenuItem value={21}>Orta</MenuItem>
              <MenuItem value={33}>Natamam</MenuItem>
            </Select>
          </FormControl>
          <Button
            onClick={handleClose}
            variant="contained"
            sx={{ margin: "2%" }}
          >
            {" "}
            Filtr et
          </Button>
        </Box>
      </Modal>
    </div>
  );
}
