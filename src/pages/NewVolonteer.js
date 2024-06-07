import { usersData } from "../makeData";
import { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import axios from "axios";
import Pop from "../components/Pop";
import Test from "./Test"
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

export default function NewVolonteer() {
  // const [passportData, setFin] = useState({fin:"", seria:"", seriaNum: ""});
  const [docSeria, setDocSeria] = useState('');
  const description = 'Əgər seriya AA-dırsa parametr olaraq [Seriya]+[Seriya nömrəsi] göndərilir:  AA1122345. Əgər seriya AZE-dirsə onda sadəcə [Seriya nömrəsi] göndərilir:  11922345 ';
const text = 'Şəxsiyyət vəsiqəsinin seriya nömrəsi';
  const [fin, setFin] = useState("");
  const [userData, setUserData] = useState({ firstName: "" });
  const handleChange = (event) => {
    setSeria(event.target.value);
    setDocSeria(event.target.value)
  };

  // async function postData() {
  //   try {
  //     let result = await fetch(
  //       "https://webhook.site/c0cdcfe9-8b99-4191-9ae6-b21db9832f1b",
  //       {
  //         method: "POST",
  //         mode: "no-cors",
  //         headers: {
  //           Accept: "aplication/json",
  //           "Content-type": "aplication/json",
  //         },

  //         body: JSON.stringify({
  //           Fin: "1sdgfchvbjn",
  //         }),
  //       }
  //     );
  //     console.log(result);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // }
  const [seria, setSeria] = useState("Seriya");

  async function getData() { 
 



    const options = {
      method: 'GET',
      url: `https://imdb-top-100-movies.p.rapidapi.com/${fin}`,
      headers: {
        'X-RapidAPI-Key': 'bf647e4a99msha8138dcc8cc2a78p1c5356jsn037d99130b76',
        'X-RapidAPI-Host': 'imdb-top-100-movies.p.rapidapi.com'
      }
    };
    

    // const options = {
    //   method: "GET",
    //   url: `https://streaming-availability.p.rapidapi.com/shows/${fin}`,
    //   // url: `https://streaming-availability.p.rapidapi.com/shows/?fin=${passportData.fin}&seria=${passportData.seria}&fin=${passportData.seriaNum}`,
    //   params: {
    //     series_granularity: "episode",
    //     output_language: "en",
    //   },
    //   headers: {
    //     "X-RapidAPI-Key": "bf647e4a99msha8138dcc8cc2a78p1c5356jsn037d99130b76",
    //     "X-RapidAPI-Host": "streaming-availability.p.rapidapi.com",
    //   },
    // };

    try {
      const response = await axios.request(options);
      console.log(response.data);
      setUserData(response.data)
    } catch (error) { 
      console.error(error);
    }
  }

  return (
    <>
      {" "}
  
      <div style={{ display:"flex", flexDirection:"row", gap:"25px", padding:"1%"}}> 
   
          <TextField
            autoFocus={true}
            sx={{ boxShadow: "10px 10px 21px -6px rgba(11,77,77,0.47)", width:"300px" }}
            id="outlined-basic"
            label="Vətəndaşın fin kodunu daxil edin"
            variant="outlined"
            onChange={(e) => {
              setFin(e.target.value);
            }}
          />
            <FormControl   sx={{ boxShadow: "10px 10px 21px -6px rgba(11,77,77,0.47)", width:"120px"}}>
        <InputLabel id="demo-simple-select-label">Seriya</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={docSeria}
          label="Seriya"
          onChange={handleChange}
        >
          <MenuItem value={"AA"}>AA</MenuItem>
          <MenuItem value={"AZE"}>AZE</MenuItem>
       
        </Select>
      </FormControl>
         
            <TextField
            
              sx={{ boxShadow: "10px 10px 21px -6px rgba(11,77,77,0.47)", width:"300px"}}
              label="Vətəndaşın seriya kodunu daxil edin"
              id="outlined-basic"
              onChange={(e) => {
                setSeria(e.target.value);}}
              variant="outlined"
              value={userData.seriya}
            />       
      
            
         
          <Button  style={{width:"300px"}}
            variant="contained"
            onClick={() => getData()}
          >
            Yoxla
      </Button>    

          {/* <Button variant="contained" onClick={() => postData()}>
            post
          </Button>*/} 
      {/* <Button variant="contained" onClick={() => getData()}>
    get
     </Button>  */}
    
      </div>
      <div style={{ display: "flex", flexDirection: "row" }}>
        <Box
          component="form"
          sx={{
            "& > :not(style)": {
              m: 2,
              width: "50ch",
              display: "flex",
              flexDirection: "column",
            },
          }}
        >
          <TextField
            helperText="Ad"
            id="outlined-basic"
            variant="outlined"
            value={userData?.genre?.[0]}
          />
     <TextField
            helperText="soyad"
            id="outlined-basic"
            variant="outlined"
            value={userData?.surname}
          />
          <TextField
            helperText="Cinsi"
            id="outlined-basic"
            variant="outlined"
            value={userData?.gender}
          />
          <TextField
            id="filled-basic"
            helperText="Hərbi mükələfiyyəti*" 
            variant="outlined"
            value={userData?.militaryStatusList?.militaryStatus}
          />
          <TextField
            id="outlined-basic"
            helperText="Boy"
            variant="outlined"
            value={userData?.height}
          />
          <TextField
            id="filled-basic"
            helperText="Doğulduğu tarix*"
            variant="outlined"
            value={userData?.birthdate?.date}
          />
          <TextField
            id="outlined-basic"
            helperText="Vətəndaşlığı*"
            variant="outlined"
            value={userData.nationality?.nameShortAz}></TextField>
   
          <TextField
            id="outlined-basic"
            helperText="Ailə vəziyyəti*"
            variant="outlined"
            value={userData.maritalStatusList?.maritalStatus}
          />
         
        </Box>
        <Box
          component="form"
          sx={{
            "& > :not(style)": {
              m: 2,
              width: "50ch",
              display: "flex",
              flexDirection: "column",
            },
          }}
        >
        
          <TextField
            id="outlined-basic"
            helperText="Şəxsiyyət vəsiqəsini verən orqanın adı"
            variant="outlined"
            value={userData.ognanisation?.name}
          />
          <TextField
            id="filled-basic"
            helperText="Şəxsiyyət vəsiqəsinin verildiyi tarix"
            variant="outlined"
            value={userData.issuingDate}
          ></TextField>
          <TextField
            id="filled-basic"
            helperText="Qeydiyyat ünvanı*"
            variant="outlined"
            value={userData.personAz?.addresses?.addresses}
          />
          <TextField
            id="outlined-basic"
            helperText="Faktiki ünvanı*"
            variant="outlined"
            value={userData.iamasAddress?.fullAdress}
          />
          <TextField
            id="outlined-basic"
            helperText="Əlaqə nömrələri 1*"
            variant="outlined"
            // value={userData.title}
          />
          <TextField
            id="outlined-basic"
            helperText="Əlaqə nömrələri 2*"
            variant="outlined"
            // value={userData.title}
          />
            <TextField
            id="filled-basic"
            helperText="Elektron-poçt ünvanı*"
            variant="outlined"
            // value={userData.title}
          />
            <TextField type="file" 
          
             name="file" 
            id="outlined-basic"
            helperText="images"
            variant="outlined"
          
            // value={userData.title}
          />
        
          <Button variant="contained">Yadda saxla</Button>
        </Box>
        <Box
          component="form"
          sx={{
            "& > :not(style)": {
              m: 2,
              width: "50ch",
              display: "flex",
              flexDirection: "column",
            },
          }}
        >
         <img  style={{
            resizeMode: 'cover',
        
            width: 200,
          }}
            // type="file"
            // id="filled-basic"
            // helperText="docs"
       
            src={userData?.image}
          />
       
        </Box>
        
      </div>
    </>
  );

}
