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
import Backdrop from "@mui/material/Backdrop";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";

import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import UploadImage from "../components/UploadImage";

export default function NewVolonteer() {
  const style = {
    textAlign: "center",
    borderRadius: "20px",
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 600,
    bgcolor: "background.paper",
    border: "1px solid grey",
    boxShadow: 60,

    p: 4,
  };
  const [validEmail, setValidEmail] = useState(true);
  const [passportData, setPassportData] = useState({
    fin: "",
    seriaNumber: "",
    docNumber: "",
  });
  const [postdata, setPostData] = useState("");
  const [selectedImage, setSelectedImage] = useState(null);

  const [docSeria, setDocSeria] = useState("");
  const [fin, setFin] = useState("");
  const [docNumber, setDocNumber] = useState("");
  const [isLoading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const handleOpen = () => setModalIsOpen(true);
  const handleClose = () => setModalIsOpen(false);
  const [userData, setUserData] = useState({
    name: "",
    surname: "",
    fatherName: "",
    gender: "",
    militaryReward: "",
    height: "",
    birthDate: "",
    birthPlace: "",
    citizenship: "",
    maritalStatus: "",
    identityCardGivenStructureName: "",
    identityCardReceivingDate: "",
    registrationAddress: "",
    currentAddress: "",
    photo: "",
    phoneNumber1: "",
    phoneNumber2: "",
    email: "",
    isIAMASInfo: false,
  });


 
  function handleSubmit(e) {
   
  ;
    console.log(userData);
    function convertDate(date) {
      const dateObject = new Date(date);

      // Get UTC time string
      const utcYear = dateObject.getUTCFullYear();
      const utcMonth = dateObject.getUTCMonth() + 1; // months are zero-indexed
      const utcDay = dateObject.getUTCDate();
      const utcHours = dateObject.getUTCHours();
      const utcMinutes = dateObject.getUTCMinutes();
      const utcSeconds = dateObject.getUTCSeconds();

      // Construct the UTC date string in ISO 8601 format
      const utcDateTimeString = `${utcYear}-${utcMonth
        .toString()
        .padStart(2, "0")}-${utcDay.toString().padStart(2, "0")}T${utcHours
        .toString()
        .padStart(2, "0")}:${utcMinutes
        .toString()
        .padStart(2, "0")}:${utcSeconds.toString().padStart(2, "0")}Z`;
      return utcDateTimeString;
    }

    const formData = new FormData();
    formData.append(
      "IdentityCardReceivingDate",
      convertDate(userData.identityCardReceivingDate)
    ); console.log(userData.identityCardReceivingDate);
    formData.append("Gender", userData.gender);
    formData.append("Citizenship", userData.citizenship);
    formData.append("MaritalStatus", userData.maritalStatus);
    formData.append("Height", userData.height);
    formData.append("FatherName", userData.fatherName);
    formData.append("BirthPlace", userData.birthPlace);
    formData.append("IsIAMASInfo", "true");
    formData.append("Name", userData.name);
    formData.append("BirthDate", convertDate(userData.birthDate));
    formData.append(
      "IdentityCardGivenStructureName",
      userData.identityCardGivenStructureName
    );
    formData.append("PhoneNumber1", userData.phoneNumber1);
    formData.append("CurrentAddress", userData.currentAddress);
    formData.append("Surname", userData.surname);
    formData.append("RegistrationAddress", userData.registrationAddress);
    formData.append("PhoneNumber2", userData.phoneNumber2);
    // formData.append('File', file, 'Снимок экрана 2024-06-29 в 16.37.38.png');
    formData.append("MilitaryReward", userData.militaryReward);
    formData.append("Email", userData.email);

    axios
      .post(`https://api-volunteers.fhn.gov.az/api/v1/Volunteers`, formData)
      .then((response) => console.log(response))
      .catch((err) => console.log(err));
  }

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
  const closeModal = () => {
    setModalIsOpen(false);
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
      console.log(response.data.data);
      setLoading(false);
      setUserData((pre) => ({
        ...pre,
        name: response.data.data.name,
        surname: response.data.data.surname,
        fatherName: response.data.data.fatherName,
        gender: response.data.data.gender,
        militaryReward: response.data.data.militaryReward,
        birthDate: response.data.data.birthDate,
        birthPlace: response.data.data.birthPlace,
        height: response.data.data.height,
        citizenship: response.data.data.citizenship,
        maritalStatus: response.data.data.maritalStatus,
        identityCardGivenStructureName:
          response.data.data.identityCardGivenStructureName,
        identityCardReceivingDate: response.data.data.identityCardReceivingDate,

        registrationAddress: response.data.data.registrationAddress,
        currentAddress: response.data.data.currentAddress,
        photo: response.data.data.photo,
        isIAMASInfo: true,
        phoneNumber1: "",
        phoneNumber2: "",
        email: "",
      }));
    } catch (error) {
      setError(true);
      setLoading(false);
      setModalIsOpen(true);
    }
  }

  return (
    <>
      {error && (
        <Modal
          aria-labelledby="transition-modal-title"
          aria-describedby="transition-modal-description"
          open={modalIsOpen}
          onClose={handleClose}
          closeAfterTransition
          slots={{ backdrop: Backdrop }}
          slotProps={{
            backdrop: {
              timeout: 200,
            },
          }}
        >
          <Fade in={modalIsOpen}>
            <Box sx={style}>
              <Typography
                id="transition-modal-title"
                variant="h6"
                component="h2"
              >
                Xəta!
              </Typography>
              <Typography id="transition-modal-description" sx={{ mt: 2 }}>
                IAMAS servisinə qoşulma zamanı xeta bash verdi. Zəhmət olmasa
                daha sonra cəhd edin.
              </Typography>
            </Box>
          </Fade>
        </Modal>
      )}{" "}
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
      </div>{" "}
      <hr></hr>
      <div style={{ display: "flex", flexDirection: "row" }}>
        <FormControl
          style={{
            display: "flex",
            flexDirection: "row",
            gap: "60px",
            padding: "1%",
          }}
        >
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
            disabled={userData.isIAMASInfo}
              label="Ad"
              id="Name"
              name="name"
              variant="outlined"
              value={userData.name}
              onChange={(e) => {
                console.log(userData);
                setUserData((prev) => {
                  const data = { ...prev, name: e.target.value };

                  return data;
                });
              }}
            />
            <TextField   disabled={userData.isIAMASInfo}
              label="Soyad"
              name="surname"
              id="Surname"
              variant="outlined"
              value={userData.surname}
              onChange={(e) => {
                console.log(userData);
                setUserData((prev) => {
                  const data = { ...prev, surname: e.target.value };

                  return data;
                });}}
            />
            <TextField
              disabled={userData.isIAMASInfo}
              label="Ata adı"
              name="fatherName"
              id="FatherName"
              variant="outlined"
              value={userData.fatherName}
              onChange={(e) => {
                console.log(userData);
                setUserData((prev) => {
                  const data = { ...prev, fatherName: e.target.value };

                  return data;
                });}}
            />
            <TextField disabled={userData.isIAMASInfo}
              label="Cinsi"
              name="gender"
              id="Gender"
              variant="outlined"
              value={userData?.gender}
              onChange={(e) => {
                console.log(userData);
                setUserData((prev) => {
                  const data = { ...prev, gender: e.target.value };

                  return data;
                });}}
            />
            <TextField disabled={userData.isIAMASInfo}
              id="filled-basic"
              name="militaryReward"
              label="Hərbi statusu"
              variant="outlined"
              value={userData?.militaryReward}
              onChange={(e) => {
                console.log(userData);
                setUserData((prev) => {
                  const data = { ...prev, militaryReward: e.target.value };

                  return data;
                });}}
            />
            <TextField disabled={userData.isIAMASInfo}
              id="Height"
              label="Boy"
              name="height"
              variant="outlined"
              value={userData?.height}
              onChange={(e) => {
                console.log(userData);
                setUserData((prev) => {
                  const data = { ...prev, height: e.target.value };

                  return data;
                });}}
            />
            <TextField disabled={userData.isIAMASInfo}

              id="vj"
              name="birthDate"
              label="Doğulduğu tarix*"
              variant="outlined"
              value={userData?.birthDate}
              onChange={(e) => {
                console.log(userData);
                setUserData((prev) => {
                  const data = { ...prev, birthDate: e.target.value };

                  return data;
                });}}
              
            />
             <TextField disabled={userData.isIAMASInfo}
              id="vj"
              name="birthPlace"
              label="Doğulduğu yer*"
              variant="outlined"
              value={userData.birthPlace}
              onChange={(e) => {
                console.log(userData);
                setUserData((prev) => {
                  const data = { ...prev,birthPlace: e.target.value };

                  return data;
                });}}
              
            />
            <TextField disabled={userData.isIAMASInfo}
              id="outlined-basic"
              name="citizenship"
              label="Vətəndaşlığı*"
              variant="outlined"
              value={userData?.citizenship}
              onChange={(e) => {
                console.log(userData);
                setUserData((prev) => {
                  const data = { ...prev,citizenship: e.target.value };

                  return data;
                });}}
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
          >
            <TextField disabled={userData.isIAMASInfo}
              name="MaritalStatus"
              id="outlined-basic"
              label="Ailə vəziyyəti*"
              variant="outlined"
              value={userData?.maritalStatus}
              onChange={(e) => {
                console.log(userData);
                setUserData((prev) => {
                  const data = { ...prev,maritalStatus: e.target.value };

                  return data;
                });}}
            />
            <TextField disabled={userData.isIAMASInfo}
              name="identityCardGivenStructureName"
              id="outlined-basic"
              label="Şəxsiyyət vəsiqəsini verən orqanın adı"
              variant="outlined"
              value={userData?.identityCardGivenStructureName}
              onChange={(e) => {
                console.log(userData);
                setUserData((prev) => {
                  const data = { ...prev,identityCardGivenStructureName: e.target.value };

                  return data;
                });}}
            />
            <TextField disabled={userData.isIAMASInfo}
              name="identityCardReceivingDate"
              id="filled-basic"
              label="Şəxsiyyət vəsiqəsinin verildiyi tarix"
              variant="outlined"
              value={userData?.identityCardReceivingDate}
              onChange={(e) => {
                console.log(userData);
                setUserData((prev) => {
                  const data = { ...prev,identityCardReceivingDate: e.target.value };

                  return data;
                });}}
            ></TextField>
            <TextField disabled={userData.isIAMASInfo}
              name="registrationAddress"
              id="filled-basic"
              label="Qeydiyyat ünvanı*"
              variant="outlined"
              value={userData?.registrationAddress}
              onChange={(e) => {
                console.log(userData);
                setUserData((prev) => {
                  const data = { ...prev,registrationAddress: e.target.value };

                  return data;
                });}}
            />
            <TextField disabled={userData.isIAMASInfo}
              name="currentAddress"
              id="outlined-basic"
              label="Faktiki ünvanı*"
              variant="outlined"
              value={userData?.currentAddress}
              onChange={(e) => {
                console.log(userData);
                setUserData((prev) => {
                  const data = { ...prev,currentAddress: e.target.value };

                  return data;
                });}}
            />
            <TextField 
              name="phoneNumber1"
              id="outlined-basic"
              label="Əlaqə nömrələri 1*"
              variant="outlined"
              value={userData.phoneNumber1}
              onChange={(e) => {
                setUserData((prev) => {
                  const data = { ...prev, phoneNumber1: e.target.value };

                  console.log(data);
                  return data;
                });
              }}
            />
            <TextField 
              name="phoneNumber2"
              id="outlined-basic"
              label="Əlaqə nömrələri 2*"
              variant="outlined"
              value={userData.phoneNumber2}
              onChange={(e) => {
                setUserData((prev) => {
                  const data = { ...prev,phoneNumber2: e.target.value };

                  console.log(data);
                  return data;
                });
              }}
            />
            <TextField      
            
              name="email"
              id="filled-basic"
              label="Elektron-poçt ünvanı*"
              variant="outlined"
              value={userData.email}
              onChange={(e) => {
              
                setUserData((prev) => {
                  const data = { ...prev, email: e.target.value };

                  console.log(data);
                  return data;
                });
              }}
            />{" "}
            <Button variant="contained" onClick={() => handleSubmit()}>
              Yadda saxla
            </Button>
          </Box>

          <Box>
            {userData && userData.photo && (
              <img
                src={`data:image/jpeg;base64,${userData.photo}`}
                alt="User"
                width={"80%"}
                style={{ padding: "2%" }}
              />
            )}
          </Box>
        </FormControl>
      </div>
    </>
  );
}
