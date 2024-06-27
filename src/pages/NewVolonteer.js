import { usersData } from "../makeData";
import { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import axios from "axios";
import Pop from "../components/Pop";
import Test from "./Test";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";

import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import UploadImage from "../components/UploadImage";

export default function NewVolonteer() {
  const [passportData, setPassportData] = useState({
    fin: "",
    seriaNumber: "",
    docNumber: "",
  });
  const [postdata, setPostData] = useState("")
  const [selectedImage, setSelectedImage] = useState(null);

  const [docSeria, setDocSeria] = useState("");
  const [fin, setFin] = useState("");
  const [docNumber, setDocNumber] = useState("");

  const [userData, setUserData] = useState({
   
    name: "",
    surname: "",
    fatherName: "",
    gender: "",
    militaryReward: "",
    height: "",
    birthDate: "",
    citizenship: "",
    maritalStatus: "",
    identityCardGivenStructureName: "",
    identityCardReceivingDate: "",
    registrationAddress: "",
    currentAddress: "",
    photo:"",
    phoneNumber1: "",
    phoneNumber2: "",
    email: "",
    isIAMASInfo:""
  });

 function handleSubmit (e)  {

    axios.post(`https://api-volunteers.fhn.gov.az/api/v1/Volunteers`, {userData}).then(response => console.log(response)).catch(err=> console.log(err))
  };

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = () => {
      setSelectedImage(reader.result);
    };

    if (file) {
      reader.readAsDataURL(file);
    }
  };



    // async function postData() {
    //   const url = "https://api-volunteers.fhn.gov.az/api/v1/Volunteers";
    
    //   // Convert dates to ISO 8601 format
    //   const isoDateTime = new Date(userData.identityCardReceivingDate).toISOString();
    //   const isoDateTime1 = new Date(userData.birthDate).toISOString();

    //   // Construct FormData object
    //   const form = new FormData();
    //   form.append("Name", userData.name);
    //   console.log( userData.name);
    //   form.append("Surname", userData.surname);
    //   form.append("FatherName", userData.fatherName);
    //   form.append("Gender", userData.gender);
    //   form.append("MilitaryReward", userData.militaryReward);
    //   form.append("BirthDate", isoDateTime1);
    //   form.append("Height", userData.height);
    //   form.append("Citizenship", userData.citizenship);
    //   form.append("MaritalStatus", userData.maritalStatus);
    //   form.append("IdentityCardGivenStructureName", userData.identityCardGivenStructureName);
    //   form.append("IdentityCardReceivingDate", isoDateTime);
    //   form.append("RegistrationAddress", userData.registrationAddress);
    //   form.append("CurrentAddress", userData.currentAddress);
    //   form.append("File", `data:image/jpeg;base64,${userData.photo}`);
    //   console.log(userData.photo); // Assuming userData.photo is a File object or Blob
    //   form.append("IsIAMASInfo", "true");
    //   form.append("Email", userData.email);
    //   form.append("PhoneNumber1", userData.phoneNumber1);
    //   form.append("PhoneNumber2", userData.phoneNumber2);
    
    //   const config = {
    //     headers: {
    //       Accept: "*/*", 
    //     },
    //   };
    
    //   try {
    //     const response = await axios.post(url, form, config);
    //     console.log("Success:", response.data);
    //     // Handle successful response
    //   } catch (error) {
    //     console.error("Error:", error);
    //     console.error("Error Response:", error.response); // Log detailed response for debugging
    //     // Handle error
    //   }
    // }
    
  async function getData() {
    const options = {
      method: "GET",

      url: `https://api-volunteers.fhn.gov.az/api/v1/Volunteers/GetInfoFromIamas?documentNumber=${passportData.seriaNumber}${passportData.docNumber}&fin=${passportData.fin}`,
      headers: {
        accept: "*/*",
      },
    };

    try {
      const response = await axios.request(options);
      console.log(response.data)
      setUserData((pre) => ({
        ...pre,
        name: response.data.data.name,
        surname: response.data.data.surname,
        fatherName: response.data.data.fatherName,
        gender: response.data.data.gender,
        militaryReward: response.data.data.militaryReward,
        birthDate: response.data.data.birthDate,
        height: response.data.data.height,
        citizenship: response.data.data.citizenship,
        maritalStatus: response.data.data.maritalStatus,
        identityCardGivenStructureName:
          response.data.data.identityCardGivenStructureName,
        identityCardReceivingDate: response.data.data.identityCardReceivingDate,
        registrationAddress: response.data.data.registrationAddress,
        currentAddress: response.data.data.currentAddress,
        photo: response.data.data.photo,
        isIAMASInfo:true,
        phoneNumber1:"",
        phoneNumber2:"", 
        email:""
        
      }))
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <>
      {" "}
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          gap: "25px",
          padding: "1%",
        }}
      >
        <TextField
          autoFocus={true}
          sx={{
            boxShadow: "10px 10px 21px -6px rgba(11,77,77,0.47)",
            width: "300px",
          }}
          id="outlined-basic"
          label="Vətəndaşın fin kodunu daxil edin"
          variant="outlined"
          onChange={(e) => {
            console.log(passportData);
            setPassportData((prev) => {
              const data = prev;
              data.fin = e.target.value;
              return data;
            });
          }}
        />
        <FormControl
          sx={{
            boxShadow: "10px 10px 21px -6px rgba(11,77,77,0.47)",
            width: "120px",
          }}
        >
          <InputLabel id="demo-simple-select-label">Seriya</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            label="Seriya"
            onChange={(e) => {
              console.log(passportData);
              setPassportData((prev) => {
                const data = prev;
                data.seriaNumber = e.target.value;
                return data;
              });
            }}
            variant="outlined"
          >
            <MenuItem value={"AA"}>AA</MenuItem>
            <MenuItem value={""}>AZE</MenuItem>
          </Select>
        </FormControl>

        <TextField
          sx={{
            boxShadow: "10px 10px 21px -6px rgba(11,77,77,0.47)",
            width: "300px",
          }}
          label="Vətəndaşın seriya nomrəsnini daxil edin"
          id="outlined-basic"
          onChange={(e) => {
            console.log(passportData);
            setPassportData((prev) => {
              const data = prev;
              data.docNumber = e.target.value;
              return data;
            });
          }}
          variant="outlined"
        />

        <Button
          style={{ width: "300px" }}
          variant="contained"
          onClick={() => getData()}
        >
          Yoxla
        </Button>
      

      </div>  <hr></hr>
      <div style={{ display: "flex", flexDirection: "row" }}>
        <FormControl style={{
          display: "flex",
          flexDirection: "row",
          gap: "60px",
          padding: "1%"}}>
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
            label="Ad"
              id="Name"
              name="name"
              variant="outlined"
              value={userData.name}
              onChange={(e) => {
                console.log(userData);
                setUserData((prev) => {
                  const data = prev;
                  data.docNumber = e.target.value;
                  return data;
                });
              }}
            
            />
            <TextField
             label="Soyad"
              name="surname"
              id="Surname"
              variant="outlined"
              value={userData.surname}
            />
            <TextField
              label="Ata adı"
              name="fatherName"
              id="FatherName"
              variant="outlined"
              value={userData.fatherName}
            />
            <TextField
              label="Cinsi"
              name="gender"
              id="Gender"
              variant="outlined"
              value={userData?.gender}
            />
            <TextField
              id="filled-basic"
              name="militaryReward"
            label="Hərbi statusu"
              variant="outlined"
              value={userData?.militaryReward}
            />
            <TextField
              id="Height"
             label="Boy"
           name="height"
              variant="outlined"
              value={userData?.height}
            />
            <TextField
              id="vj" name="birthDate"
              label="Doğulduğu tarix*"
              variant="outlined"
              value={userData.birthDate}
            />
            <TextField
              id="outlined-basic" 
              name="citizenship"
              label="Vətəndaşlığı*"
              variant="outlined"
              value={userData?.citizenship}
            ></TextField>

         
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
          >  <TextField 
            name="MaritalStatus"
              id="outlined-basic"
             label="Ailə vəziyyəti*"
              variant="outlined"
              value={userData?.maritalStatus}
            />
            <TextField name="identityCardGivenStructureName"
              id="outlined-basic"
             label="Şəxsiyyət vəsiqəsini verən orqanın adı"
              variant="outlined"
              value={userData?.identityCardGivenStructureName}
            />
            <TextField name="identityCardReceivingDate"
              id="filled-basic"
             label="Şəxsiyyət vəsiqəsinin verildiyi tarix"
              variant="outlined"
              value={userData?.identityCardReceivingDate}
            ></TextField>
            <TextField name="registrationAddress"
              id="filled-basic"
              label="Qeydiyyat ünvanı*"
              variant="outlined"
              value={userData?.registrationAddress}
            />
            <TextField name="currentAddress"
              id="outlined-basic"
             label="Faktiki ünvanı*"
              variant="outlined"
              value={userData?.currentAddress}
            />
            <TextField name="phoneNumber1"
              id="outlined-basic"
              label="Əlaqə nömrələri 1*"
              variant="outlined"
              value={usersData.phoneNumber1}
              onChange={(e) => {
                setUserData((prev) => {
                  const data = prev;
                  data.phoneNumber1 = e.target.value;
                  console.log(data);
                  return data;
                });
              }}
            />
            <TextField name="phoneNumber2"
              id="outlined-basic"
              label="Əlaqə nömrələri 2*"
              variant="outlined"
              value={usersData.phoneNumber2}
              onChange={(e) => {
                setUserData((prev) => {
                  const data = prev;
                  data.phoneNumber2 = e.target.value;
                  console.log(data);
                  return data;
                });
              }}
            />
            <TextField name="email"
              id="filled-basic"
             label="Elektron-poçt ünvanı*"
              variant="outlined"
              value={usersData.email}
              onChange={(e) => {
                setUserData((prev) => {
                  const data = prev;
                  data.email = e.target.value;
                  console.log(data);
                  return data;
                });
              }}
            />{" "}

       
     
            <Button variant="contained" onClick={()=> handleSubmit()}>
              Yadda saxla
            </Button>
          </Box>
         
          <Box>
            {userData && userData.photo && (
              <img 
                src={`data:image/jpeg;base64,${userData.photo}`}
                alt="User"
                width={"80%"}
                style={{padding:"2%"}}
              />
            )}
          </Box>
        </FormControl>
      </div>
    </>
  );
}
