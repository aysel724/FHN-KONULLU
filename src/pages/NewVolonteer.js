import { useState } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import "../App.css";
import axios from "axios";
import { notification } from "antd";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Backdrop from "@mui/material/Backdrop";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import { useNavigate } from "react-router-dom";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import btoa from "btoa-lite";
import {
  validateVolunteerAdd,
  validateVolunteerİAMAS,
} from "../utils/validateUser";
import { BASE_URL } from "../api/baseURL";
import { FormHelperText } from "@mui/material";
import convertDate from "../utils/converTime";
import Base64ToBlob from "../utils/base64ToBlob";
export default function NewVolonteer() {
  const navigate = useNavigate();
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
  const [api, contextHolder] = notification.useNotification();
  const openNotificationWithIcon = (type, message, description) => {
    api[type]({
      message: message,
      description: description,
    });
  };
  const [passportData, setPassportData] = useState({
    fin: "",
    seriaNumber: "",
    docNumber: "",
  });

  const [selectedImage, setSelectedImage] = useState(null);
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const handleOpen = () => setModalIsOpen(true);
  const handleClose = () => setModalIsOpen(false);
  const [userData, setUserData] = useState({
    idCardNumber: "",
    bloodType: "",
    pinCode: "",
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
    isIAMASInfo: true,
  });

  function handleSubmit(statusCode) {
    const errorNotfication = validateVolunteerAdd(userData);
    setError(errorNotfication);
    if (Object.keys(errorNotfication).length === 0) {
      setLoading(true);
      // setTimeout(() => {
      //   navigate(`/Volunteers`);
      // }, 2000);

      const formData = new FormData();
      formData.append(
        "IdentityCardReceivingDate",
        convertDate(userData.identityCardReceivingDate)
      );
      formData.append("Gender", userData.gender);
      formData.append("Citizenship", userData.citizenship);
      formData.append("PINCode", passportData.fin);
      formData.append(
        "IDCardNumber",
        `${passportData.seriaNumber}${passportData.docNumber}`
      );
      formData.append("BloodType", userData.bloodType);
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
      formData.append("MilitaryReward", userData.militaryReward);
      formData.append("Email", userData.email);

  
    const contentType = "image/jpeg";
    const base64String = `${userData.photo}`; 
    const blob = Base64ToBlob(base64String, contentType);
    formData.append("File", blob, "filename.jpg");
    axios
      .post(`${BASE_URL}/Volunteers`, formData)
      .then((response) => {
        setLoading(false);
        openNotificationWithIcon(
          "success",
          "Əlavə olundu",
          "Könüllü siyahıya əlavə olundu"
        );
      })
      .catch((err) => {
        setLoading(false);

          if (err.response) {
            if (err.response.status === 400) {
              openNotificationWithIcon(
                "error",
                "Xəta mesajı",
                "Bütün sahələri doldurmalısınız."
              );
              setError("Xəta 400");
            } else if (err.response.status === 404) {
              openNotificationWithIcon(
                "error",
                "Xəta mesajı",
                "Xəta baş verdi"
              );
              setError("Xəta 404. Məlumat tapılmadı");
            } else if (err.response.status === 409) {
              openNotificationWithIcon(
                "error",
                "Xəta mesajı",
                "Xəta baş verdi"
              );
              setError("Məlumat artıq mövcuddur");
            }
            setModalIsOpen(true);
          } else {
            setError("Xəta 500. Server xətası");
            openNotificationWithIcon("error", "Xəta mesajı", "Xəta baş verdi");
            setModalIsOpen(true); // Open modal to show error message
          }
        });
    }
  }

  async function getData() {
    const errorNotfication = validateVolunteerİAMAS(passportData);
    setError(errorNotfication);
    console.log(passportData,'passportData')
    if (Object.keys(errorNotfication).length === 0) {
      const options = {
        method: "GET",
        url: `${BASE_URL}/Volunteers/GetInfoFromIamas?documentNumber=${passportData.seriaNumber=== "AA"?passportData.seriaNumber:''}${passportData.docNumber}&fin=${passportData.fin}`,
        headers: {
          accept: "*/*",
        },
      };
      try {
        const response = await axios.request(options);
        setLoading(false);
        setUserData((pre) => ({
          ...pre,
          idCardNumber: response.data.data.idCardNumber,
          pinCode: response.data.data.pinCode,
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
          identityCardReceivingDate:
            response.data.data.identityCardReceivingDate,
          bloodType: response.data.data.bloodType,
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
        setUserData((pre) => ({ ...pre, isIAMASInfo: false }));
      }
    }
  }

  return (
    <>
      {contextHolder}
      {isLoading && <div className="loader">Yüklənir</div>}
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
                {error}
              </Typography>
            </Box>
          </Fade>
        </Modal>
      )}{" "}
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          gap: "23px",
          padding: "1%",
          height: "100px",
        }}
      >
        <TextField
          autoFocus={true}
          sx={{
            width: "300px",
          }}
          id="outlined-basic"
          label="Vətəndaşın fin kodunu daxil edin"
          variant="outlined"
          inputProps={{ maxLength: 7 }}
          error={!!error?.fin}
          helperText={error?.fin || ""}
          onChange={(e) => {
            setPassportData((prev) => {
              const data = prev;
              data.fin = e.target.value;
              return data;
            });
          }}
        />
        <FormControl
          sx={{
            width: "120px",
          }}
          error={!!error?.seriaNumber}
        >
          <InputLabel id="demo-simple-select-label">Seriya</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            label="Seriya"
            onChange={(e) => {
              setPassportData((prev) => {
                const data = prev;
                data.seriaNumber = e.target.value;
                return data;
              });
            }}
            variant="outlined"
            error={!!error?.seriaNumber}
            helperText={error?.seriaNumber || ""}
          >
            <MenuItem value={"AA"}>AA</MenuItem>
            <MenuItem value={"AZE"}>AZE</MenuItem>
          </Select>
          <FormHelperText>{error?.seriaNumber || ""}</FormHelperText>
        </FormControl>
        <TextField
          sx={{
            width: "300px",
          }}
          label="Vətəndaşın seriya nomrəsnini daxil edin"
          id="outlined-basic"
          inputProps={{ maxLength: 7 }}
          onChange={(e) => {
            setPassportData((prev) => {
              const data = prev;
              data.docNumber = e.target.value;
              return data;
            });
          }}
          variant="outlined"
          error={!!error?.docNumber}
          helperText={error?.docNumber || ""}
        />

        <Button
          style={{ width: "300px", height: "56px" }}
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
                setUserData((prev) => {
                  const data = { ...prev, name: e.target.value };
                  return data;
                });
              }}
            />
            <TextField
              disabled={userData.isIAMASInfo}
              label="Soyad"
              name="surname"
              id="Surname"
              variant="outlined"
              value={userData.surname}
              onChange={(e) => {
                setUserData((prev) => {
                  const data = { ...prev, surname: e.target.value };
                  return data;
                });
              }}
            />
            <TextField
              disabled={userData.isIAMASInfo}
              label="Ata adı"
              name="fatherName"
              id="FatherName"
              variant="outlined"
              value={userData.fatherName}
              onChange={(e) => {
                setUserData((prev) => {
                  const data = { ...prev, fatherName: e.target.value };
                  return data;
                });
              }}
            />{" "}
            <TextField
              disabled={userData.isIAMASInfo}
              label="Qan qrupu"
              name="bloodType"
              id="BloodType"
              variant="outlined"
              value={userData.bloodType}
              onChange={(e) => {
                setUserData((prev) => {
                  const data = { ...prev, bloodType: e.target.value };
                  return data;
                });
              }}
            />
            <TextField
              disabled={userData.isIAMASInfo}
              label="Cinsi"
              name="gender"
              id="Gender"
              variant="outlined"
              value={userData?.gender}
              onChange={(e) => {
                setUserData((prev) => {
                  const data = { ...prev, gender: e.target.value };
                  return data;
                });
              }}
            />
            <TextField
              disabled={userData.isIAMASInfo}
              id="filled-basic"
              name="militaryReward"
              label="Hərbi statusu"
              variant="outlined"
              value={userData?.militaryReward}
              onChange={(e) => {
                setUserData((prev) => {
                  const data = { ...prev, militaryReward: e.target.value };
                  return data;
                });
              }}
            />
            <TextField
              disabled={userData.isIAMASInfo}
              id="Height"
              label="Boy"
              name="height"
              variant="outlined"
              value={userData?.height}
              onChange={(e) => {
                setUserData((prev) => {
                  const data = { ...prev, height: e.target.value };
                  return data;
                });
              }}
            />
            <TextField
              disabled={userData.isIAMASInfo}
              id="vj"
              name="birthDate"
              label="Doğulduğu tarix*"
              variant="outlined"
              value={userData?.birthDate}
              onChange={(e) => {
                setUserData((prev) => {
                  const data = { ...prev, birthDate: e.target.value };
                  return data;
                });
              }}
            />
            <TextField
              disabled={userData.isIAMASInfo}
              id="vj"
              name="birthPlace"
              label="Doğulduğu yer*"
              variant="outlined"
              value={userData.birthPlace}
              onChange={(e) => {
                setUserData((prev) => {
                  const data = { ...prev, birthPlace: e.target.value };
                  return data;
                });
              }}
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
              disabled={userData.isIAMASInfo}
              id="outlined-basic"
              name="citizenship"
              label="Vətəndaşlığı*"
              variant="outlined"
              value={userData?.citizenship}
              onChange={(e) => {
                setUserData((prev) => {
                  const data = { ...prev, citizenship: e.target.value };
                  return data;
                });
              }}
            ></TextField>
            <TextField
              disabled={userData.isIAMASInfo}
              name="MaritalStatus"
              id="outlined-basic"
              label="Ailə vəziyyəti*"
              variant="outlined"
              value={userData?.maritalStatus}
              onChange={(e) => {
                setUserData((prev) => {
                  const data = { ...prev, maritalStatus: e.target.value };
                  return data;
                });
              }}
            />
            <TextField
              disabled={userData.isIAMASInfo}
              name="identityCardGivenStructureName"
              id="outlined-basicsx"
              label="Şəxsiyyət vəsiqəsini verən orqanın adı"
              variant="outlined"
              value={userData?.identityCardGivenStructureName}
              onChange={(e) => {
                setUserData((prev) => {
                  const data = {
                    ...prev,
                    identityCardGivenStructureName: e.target.value,
                  };

                  return data;
                });
              }}
            />
            <TextField
              disabled={userData.isIAMASInfo}
              name="identityCardReceivingDate"
              id="filled-basic"
              label="Şəxsiyyət vəsiqəsinin verildiyi tarix"
              variant="outlined"
              value={userData?.identityCardReceivingDate}
              onChange={(e) => {
                setUserData((prev) => {
                  const data = {
                    ...prev,
                    identityCardReceivingDate: e.target.value,
                  };

                  return data;
                });
              }}
            ></TextField>
            <TextField
              disabled={userData.isIAMASInfo}
              name="registrationAddress"
              id="filled-basic"
              label="Qeydiyyat ünvanı*"
              variant="outlined"
              value={userData?.registrationAddress}
              onChange={(e) => {
                setUserData((prev) => {
                  const data = { ...prev, registrationAddress: e.target.value };

                  return data;
                });
              }}
            />
            <TextField
              disabled={userData.isIAMASInfo}
              name="currentAddress"
              id="outlined-basic"
              label="Faktiki ünvanı*"
              variant="outlined"
              value={userData?.currentAddress}
              onChange={(e) => {
                setUserData((prev) => {
                  const data = { ...prev, currentAddress: e.target.value };

                  return data;
                });
              }}
            />
            <TextField
              required
              name="phoneNumber1"
              id="outlined-basic"
              label="Əlaqə nömrələri 1"
              variant="outlined"
              type="number"
              value={userData.phoneNumber1}
              error={!!error?.phoneNumber1}
              helperText={error?.phoneNumber1 || ""}
              onChange={(e) => {
                setUserData((prev) => {
                  const data = { ...prev, phoneNumber1: e.target.value };
                  return data;
                });
              }}
            />
            <TextField
              required
              name="phoneNumber2"
              id="outlined-basic"
              label="Əlaqə nömrələri 2"
              variant="outlined"
              type="number"
              value={userData.phoneNumber2}
              error={!!error?.phoneNumber2}
              helperText={error?.phoneNumber2 || ""}
              onChange={(e) => {
                setUserData((prev) => {
                  const data = { ...prev, phoneNumber2: e.target.value };
                  return data;
                });
              }}
            />
            <TextField
              required
              name="email"
              id="filled-basic"
              label="Elektron-poçt ünvanı"
              variant="outlined"
              type="email"
              value={userData.email}
              error={!!error?.email}
              helperText={error?.email || ""}
              onChange={(e) => {
                setUserData((prev) => {
                  const data = { ...prev, email: e.target.value };
                  return data;
                });
              }}
            />
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
