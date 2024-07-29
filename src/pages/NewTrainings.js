import { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import "../App.css";
import axios from "axios";
import { notification } from "antd";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Backdrop from "@mui/material/Backdrop";
import Autocomplete from "@mui/material/Autocomplete";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import { useNavigate } from "react-router-dom";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import btoa from "btoa-lite";
export default function NewTrainings() {
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
  const onChange = (date, dateString) => {
    console.log(date, dateString);
  };
  const [api, contextHolder] = notification.useNotification();
  const openNotificationWithIcon = (type, message, description) => {
    api[type]({
      message: message,
      description: description,
    });
  };
  const [volonteerNames, setvolonteerNames] = useState([]);
  const [trainingNames, setTrainingNames] = useState([]);
  useEffect(() => {
    const TrainingNamesData = async () => {
      try {
        const response = await axios.get(
          `https://api-volunteers.fhn.gov.az/api/v1/MesTrainingNames?page=1&pageSize=0`,
          {
            headers: { accept: "*/*" },
          }
        );
        console.log(response.data.data);
        const newData = response.data.data.map((e) => {
          const user = {
            name: e.name,
            id: e.id,
          };

          return user;
        });

        console.log(newData);
        setTrainingNames(newData);
      } catch (error) {
        // Handle errors here if needed
        console.error("Error fetching users:", error);
        throw error;
      }
    };
    TrainingNamesData();
  }, []);

  function getTrainingNames(arr) {
    return arr.map((e) => e.name);
  }

  useEffect(() => {
    const TrainingNamesData = async () => {
      try {
        const response = await axios.get(
          `https://api-volunteers.fhn.gov.az/api/v1/Volunteers?page=1&pageSize=0`,
          {
            headers: { accept: "*/*" },
          }
        );
        console.log(response.data.data);
        const newData = response.data.data.map((e) => {
          const user = {
            name: e.name,
            id: e.id,
          };

          return user;
        });

        console.log(newData);
        setvolonteerNames(newData);
      } catch (error) {
        // Handle errors here if needed
        console.error("Error fetching users:", error);
        throw error;
      }
    };
    TrainingNamesData();
  }, []);

  function getTrainingNames(arr) {
    return arr.map((e) => e.name);
  }

  const [selectedImage, setSelectedImage] = useState(null);
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const handleOpen = () => setModalIsOpen(true);
  const handleClose = () => setModalIsOpen(false);
  const [userData, setUserData] = useState({
    mesTrainingNameId: "",
    description: "",
    startDate: "",
    finishDate: "",
    trainingDuration: "",
    trainingPlace: "",
    trainingMaster: "",
    trainingResultId: "",
    priority: "",
    volunteerIds: [85],
  });

  function handleSubmit(statusCode) {
    setLoading(true);

    // setTimeout(() => {
    //   navigate(`/Volunteers`);
    // }, 5000);
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
    formData.append("StartDate", convertDate(userData.startDate));
    formData.append("MesTrainingNameId", userData.mesTrainingNameId);
    formData.append("Description", userData.description);
    formData.append("TrainingDuration", userData.trainingDuration);
    formData.append("TrainingPlace", userData.trainingPlace);
    formData.append("TrainingMaster", userData.trainingMaster);
    formData.append("TrainingResultId", userData.trainingResultId);
    formData.append("FinishDate", convertDate(userData.finishDate));
    formData.append(
      "IdentityCardGivenStructureName",
      userData.identityCardGivenStructureName
    );
    formData.append("Priority", userData.priority);
    formData.append("VolunteerIds", userData.volunteerIds);
    formData.append("Surname", userData.surname);
    formData.append("RegistrationAddress", userData.registrationAddress);
    formData.append("PhoneNumber2", userData.phoneNumber2);
    formData.append("MilitaryReward", userData.militaryReward);
    formData.append("Email", userData.email);

    // function base64ToBlob(base64String, contentType) {
    //   const byteCharacters = atob(base64String); // Decode base64
    //   const byteNumbers = new Array(byteCharacters.length);
    //   for (let i = 0; i < byteCharacters.length; i++) {
    //     byteNumbers[i] = byteCharacters.charCodeAt(i);
    //   }
    //   const byteArray = new Uint8Array(byteNumbers);
    //   return new Blob([byteArray], { type: contentType });
    // }

    // const contentType = "image/jpeg";
    // const base64String = `${userData.mesTrainingAttachmentFiles}`; // Example base64 string
    // const blob = base64ToBlob(base64String, contentType);

    // formData.append("MesTrainingAttachmentFiles", blob, "filename.jpg");

    // Now you can use formData to send the blob to a server using fetch or XMLHttpRequest

    console.log(formData);
    axios
      .post(`https://api-volunteers.fhn.gov.az/api/v1/MesTrainings`, formData)
      .then((response) => {
        setLoading(false);
        openNotificationWithIcon(
          "success",
          "Success Message",
          "This is a success notification."
        );
        console.log(response);
      })
      .catch((err) => {
        setLoading(false);
        console.error("Error:", err.response); // Log the detailed error response
        if (err.response) {
          if (err.response.status === 400) {
            openNotificationWithIcon(
              "error",
              "Error Message",
              "This is an error notification."
            );
            setError("xeta 400");
          } else if (err.response.status === 404) {
            openNotificationWithIcon(
              "error",
              "Error Message",
              "This is an error notification."
            );
            setError("xeta 404");
          } else {
            openNotificationWithIcon(
              "error",
              "Error Message",
              "This is an error notification."
            );
            setError("Something went wrong. Please try again later.");
          }
          setModalIsOpen(true); // Open modal to show error message
        } else {
          setError("xeta 500.");
          openNotificationWithIcon(
            "error",
            "Error Message",
            "This is an error notification."
          );
          setModalIsOpen(true); // Open modal to show error message
        }
      });
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

  // async function getData() {
  //   const options = {
  //     method: "GET",

  //     url: `https://api-volunteers.fhn.gov.az/api/v1/Volunteers/GetInfoFromIamas?documentNumber=${passportData.seriaNumber}${passportData.docNumber}&fin=${passportData.fin}`,
  //     headers: {
  //       accept: "*/*",
  //     },
  //   };

  //   try {
  //     const response = await axios.request(options);
  //     console.log(response.data.data);
  //     setLoading(false);
  //     setUserData((pre) => ({
  //       ...pre,
  //       idCardNumber: response.data.data.idCardNumber,
  //       pinCode: response.data.data.pinCode,
  //       name: response.data.data.name,
  //       surname: response.data.data.surname,
  //       fatherName: response.data.data.fatherName,
  //       gender: response.data.data.gender,
  //       militaryReward: response.data.data.militaryReward,
  //       birthDate: response.data.data.birthDate,
  //       birthPlace: response.data.data.birthPlace,
  //       height: response.data.data.height,
  //       citizenship: response.data.data.citizenship,
  //       maritalStatus: response.data.data.maritalStatus,
  //       identityCardGivenStructureName:
  //         response.data.data.identityCardGivenStructureName,
  //       identityCardReceivingDate: response.data.data.identityCardReceivingDate,

  //       registrationAddress: response.data.data.registrationAddress,
  //       currentAddress: response.data.data.currentAddress,
  //       photo: response.data.data.photo,
  //       isIAMASInfo: true,
  //       phoneNumber1: "",
  //       phoneNumber2: "",
  //       email: "",
  //     }));
  //   } catch (error) {
  //     setError(true);
  //     setLoading(false);
  //     setModalIsOpen(true);
  //     setUserData((pre) => ({ ...pre, isIAMASInfo: false }));
  //   }
  // }

  return (
    <>
      {contextHolder}
      {isLoading && <div className="loader">Loading...</div>}
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
      {/* <FormControl
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
      </FormControl> */}{" "}
      <h2>Yeni təlim əlave edin</h2>
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
            {" "}
            <InputLabel id="demo-simple-select-label">Təlimin adı</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              helperText="Seriya"
              onChange={(e) => {
                console.log(userData);
                setUserData((prev) => {
                  const data = { ...prev, mesTrainingNameId: e.target.value };

                  return data;
                });
              }}
              variant="outlined"
            >
              {trainingNames.map((training) => {
                return <MenuItem value={training.id}>{training.name}</MenuItem>;
              })}
            </Select>
            {/* <TextField
              label="Təlimin adı*"
              id="Name"
              name="name"
              variant="outlined"
              value={userData.mesTrainingName}
              onChange={(e) => {
                console.log(userData);
                setUserData((prev) => {
                  const data = { ...prev, mesTrainingName: e.target.value };

                  return data;
                });
              }}
            /> */}
            <TextField
              label="Təlimin məzmunu"
              name="surname"
              id="Surname"
              variant="outlined"
              value={userData.description}
              onChange={(e) => {
                console.log(userData);
                setUserData((prev) => {
                  const data = { ...prev, description: e.target.value };

                  return data;
                });
              }}
            />
            <TextField
              type="date"
              helperText="Təlimin başlanma tarixi "
              name="fatherName"
              id="FatherName"
              variant="outlined"
              value={userData.startDate}
              onChange={(e) => {
                console.log(userData);
                setUserData((prev) => {
                  const data = { ...prev, startDate: e.target.value };

                  return data;
                });
              }}
            />
            <TextField
              type="date"
              helperText="Təlimin bitmə tarixi "
              name="gender"
              id="Gender"
              variant="outlined"
              value={userData?.finishDate}
              onChange={(e) => {
                console.log(userData);
                setUserData((prev) => {
                  const data = { ...prev, finishDate: e.target.value };

                  return data;
                });
              }}
            />{" "}
            <TextField
              multiple="true"
              type="file"
              helperText="Təlimin bitmə tarixi "
              name="gender"
              id="Gender"
              variant="outlined"
              value={userData?.finishDate}
            />{" "}
            <TextField
              id="filled-basic"
              name="militaryReward"
              label="Təlimin müddəti "
              variant="outlined"
              value={userData?.trainingDuration}
              onChange={(e) => {
                console.log(userData);
                setUserData((prev) => {
                  const data = { ...prev, trainingDuration: e.target.value };

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
              id="Height"
              label="Təlimin keçirilmə yeri "
              name="height"
              variant="outlined"
              value={userData?.trainingPlace}
              onChange={(e) => {
                console.log(userData);
                setUserData((prev) => {
                  const data = { ...prev, trainingPlace: e.target.value };

                  return data;
                });
              }}
            />
            <TextField
              id="vj"
              name="birthDate"
              label="Təlimçi "
              variant="outlined"
              value={userData?.trainingMaster}
              onChange={(e) => {
                console.log(userData);
                setUserData((prev) => {
                  const data = { ...prev, trainingMaster: e.target.value };

                  return data;
                });
              }}
            />
            <TextField
              id="vj"
              name="TrainingResultId"
              label="TrainingResultId "
              variant="outlined"
              value={userData?.trainingResultId}
              onChange={(e) => {
                console.log(userData);
                setUserData((prev) => {
                  const data = { ...prev, trainingResultId: e.target.value };

                  return data;
                });
              }}
            />
            <TextField
              id="vj"
              name="priority"
              label="priority "
              variant="outlined"
              value={userData?.priority}
              onChange={(e) => {
                console.log(userData);
                setUserData((prev) => {
                  const data = { ...prev, priority: e.target.value };

                  return data;
                });
              }}
            />{" "}
            <Autocomplete
              multiple
              disablePortal
              id="combo-box-demo"
              options={getTrainingNames(volonteerNames)}
              sx={{ width: 300 }}
              renderInput={(params) => (
                <TextField {...params} label="Konulluler" />
              )}
            />
            <Button variant="contained" onClick={() => handleSubmit()}>
              Yadda saxla
            </Button>
          </Box>
        </FormControl>
      </div>
    </>
  );
}
