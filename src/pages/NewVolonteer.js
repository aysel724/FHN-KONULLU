import { usersData } from "../makeData";
import { useState } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

import MenuItem from "@mui/material/MenuItem";

import Select from "@mui/material/Select";

export default function NewVolonteer() {
  const [age, setAge] = useState("");

  const [fin, setFin] = useState("");
  const [userData, setUserData] = useState({ firstName: "Bosdur" });
  const handleChange = (event) => {
    setAge(event.target.value);
  };

  return (
    <>
      <Box
        component="form"
        sx={{
          "& > :not(style)": { m: 1, width: "25ch" },
        }}
        noValidate
        autoComplete="off"
      >
        <TextField
          id="outlined-basic"
          label="Outlined"
          variant="outlined"
          onChange={(e) => {
            setFin(e.target.value);
          }}
        />
        <TextField
          id="filled-basic"
          variant="filled"
          value={userData.firstName}
        />
        <Button variant="contained" onClick={() => setUserData(usersData[fin])}>
          Yoxla
        </Button>
      </Box>
      <div style={{ display: "flex", flexDirection: "row" }}>
        {" "}
        <div></div>
        <Box
          component="form"
          sx={{
            "& > :not(style)": {
              m: 2,
              width: "30ch",
              display: "flex",
              flexDirection: "column",
            },
          }}
          noValidate
          autoComplete="off"
        >
          <TextField
            id="outlined-basic"
            placeholder="state"
            variant="outlined"
            value={userData?.state}
          />
          <TextField
            id="filled-basic"
            placeholder="doğum tarixi"
            variant="filled"
            value={userData.birthdate}
          />
          <TextField
            id="outlined-basic"
            placeholder="fəaliyyəta başlama tarixi"
            variant="outlined"
            value={userData.start}
          />
          <TextField
            id="filled-basic"
            placeholder="Outlied"
            variant="filled"
            value={userData.gender}
          />
          <TextField
            id="outlined-basic"
            placeholder="fəaliyyəti bitirmə tarixi"
            variant="outlined"
            value={userData.finish}
          />
          <TextField
            id="filled-basic"
            placeholder="elektro pocht ünvanı"
            variant="filled"
            value={userData.mail}
          />
          <TextField
            id="outlined-basic"
            placeholder="status"
            variant="outlined"
            value={userData.status}
          />
          <TextField
            id="filled-basic"
            placeholder="fin"
            variant="filled"
            value={userData.fin}></TextField>
         
        </Box>
        <Box
          component="form"
          sx={{
            "& > :not(style)": {
              m: 2,
              width: "30ch",
              display: "flex",
              flexDirection: "column",
            },
          }}
          noValidates
          autoComplete="off"
        >
           
          <Select style={{width:"90px"}}
            value={age}
            onChange={handleChange}
            displayEmpty
            inputProps={{ "aria-label": "Without label" }}
          >
            <MenuItem value={userData.passport}>
            
            </MenuItem>
            <MenuItem value={10}>AA</MenuItem>
            <MenuItem value={20}>AZE</MenuItem>
           
          </Select>
          <TextField
            id="outlined-basic"
            placeholder="state"
            variant="outlined"
            value={userData.famylystatus}
          />
          <TextField
            id="filled-basic"
            placeholder="doğum tarixi"
            variant="filled"
            value={userData.army}
          />
          <TextField
            id="outlined-basic"
            placeholder="fəaliyyəta başlama tarixi"
            variant="outlined"
            value={userData.famylystatus}
          />
          <TextField
            id="filled-basic"
            placeholder="Outlied"
            variant="filled"
            value={userData.boy}
          />
          <TextField
            id="outlined-basic"
            placeholder="fəaliyyəti bitirmə tarixi"
            variant="outlined"
            value={userData.finish}
          />
          <TextField
            id="filled-basic"
            placeholder="elektro pocht ünvanı"
            variant="filled"
            value={userData.mail}
          />
          <TextField
            id="outlined-basic"
            placeholder="status"
            variant="outlined"
            value={userData.status}
          />
          <TextField
            id="filled-basic"
            placeholder="fin"
            variant="filled"
            value={userData.fin}
          />
          <TextField
            id="filled-basic"
            placeholder="fin"
            variant="filled"
            value={userData.fin}
          />{" "}
          <Button variant="contained">Yadda saxla</Button>
        </Box>
      </div>
    </>
  );
}
