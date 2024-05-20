import { usersData } from '../makeData';
import {useState}  from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

export default function NewVolonteer() {
    const [fin, setFin] = useState("")
    const [userData, setUserData] = useState({firstName:"Bosdur"})
  return (
    <Box
      component="form"
      sx={{
        '& > :not(style)': { m: 1, width: '25ch' },
      }}
      noValidate
      autoComplete="off"
    >
      <TextField id="outlined-basic" label="Outlined" variant="outlined" onChange={(e)=>{setFin(e.target.value)}} />
      <TextField id="filled-basic"  variant="filled" value={userData.firstName} />
      <Button variant="contained" onClick={()=>(setUserData(usersData[fin]))}>Yoxla</Button>
    </Box>
  );
}
