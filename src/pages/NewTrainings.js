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
import { convertDate } from "../utils/convertDate";
import { validateTraning } from "../utils/validateUser";
import { FormHelperText } from "@mui/material";
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
  const [files, setFiles] = useState([]);

  const [trainingResult, setTrainingResult] = useState([]);
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
          return {
            label: `${e.name} ${e.surname} ${e.fatherName}`.trim(),
            id: e.id,
          };
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

  useEffect(() => {
    const TrainingResultsData = async () => {
      try {
        const response = await axios.get(
          `https://api-volunteers.fhn.gov.az/api/v1/TrainingResults`,
          {
            headers: { accept: "*/*" },
          }
        );
        console.log(response.data.data);
        const newData = response.data.data.map((e) => {
          return {
            name: e.name,
            id: e.id,
          };
        });

        console.log(newData);
        setTrainingResult(newData);
      } catch (error) {
        // Handle errors here if needed
        console.error("Error fetching users:", error);
        throw error;
      }
    };
    TrainingResultsData();
  }, []);

  // function getTrainingNames(arr) {
  //   return arr.map((e) => e.name + " " + e.surname + " " + e.fatherName);
  // }

  const [selectedImage, setSelectedImage] = useState(null);
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [validation, setValidation] = useState({})
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const handleOpen = () => setModalIsOpen(true);
  const handleClose = () => setModalIsOpen(false);
  
  const [userData, setUserData] = useState({
    mesTrainingNameId: "",
    departmentInCharge: "",
    description: "",
    startDate: "",
    finishDate: "",
    trainingDuration: "",
    trainingPlace: "",
    trainingMaster: "",
    trainingResultId: "",
    priority: "",
    volunteerIds: [],
    mesTrainingAttachmentFiles: [],
  });

  const [value, setValue] = useState([]);
  function testSubmit() {
    console.log(value);
    console.log(userData);
  }

  function getIDs(arr) {
    return arr.map((e) => {
      return e.id;
    });
  }

  function handleSubmit() {
    setLoading(true);
    const errorNotfication = validateTraning(userData)
   

    setError(errorNotfication);
    setUserData((prev) => {
      const data = {
        ...prev,
        volunteerIds: value.map((e) => {
          return e.id;
        }),
      };
      return data;
    });
    console.log(userData);
    const formData = new FormData();
    formData.append("StartDate", convertDate(userData.startDate));
    formData.append("MesTrainingNameId", userData.mesTrainingNameId);
    formData.append("DepartmentInCharge", userData.departmentInCharge);
    formData.append("Description", userData.description);
    formData.append("TrainingDuration", userData.trainingDuration);
    formData.append("TrainingPlace", userData.trainingPlace);
    formData.append("TrainingMaster", userData.trainingMaster);
    formData.append("TrainingResultId", userData.trainingResultId);
    formData.append("FinishDate", convertDate(userData.finishDate));
    formData.append("Priority", userData.priority);
    [...userData.volunteerIds].forEach((id) => {
      formData.append("VolunteerIds", id);
    });
    [...userData.mesTrainingAttachmentFiles].forEach((image) => {
      formData.append("MesTrainingAttachmentFiles", image);
    });

    console.log(formData);
    if (Object.keys(errorNotfication).length === 0) {
      console.log("Form məlumatları göndərilir:", userData);
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
      setLoading(false)
       setTimeout(() => {
      navigate(`/MesTrainings`);
    }, 20000);
    }
    
  }

  const closeModal = () => {
    setModalIsOpen(false);
  };

  return (
    <>
      {contextHolder}
      {/* {isLoading && <div className="loader">Yüklənir...</div>} */}
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
            <FormControl variant="outlined" fullWidth error={!!error?.mesTrainingNameId}>
            <InputLabel id="321">Təlimin adı</InputLabel>
            <Select
              labelId="321"
              id="321"
              onChange={(e) => {
                console.log(userData);
                setUserData((prev) => {
                  const data = { ...prev, mesTrainingNameId: e.target.value };
                  return data;
                });
              }}
              variant="outlined"
              error={!!error?.mesTrainingNameId}
              helperText={error?.mesTrainingNameId || ""}
            >
              {trainingNames.map((training) => {
                return <MenuItem value={training.id}>{training.name}</MenuItem>;
              })}
            </Select>
            <FormHelperText>{error?.mesTrainingNameId || ""}</FormHelperText>
            </FormControl>
            <TextField
              label="Təlimin adı keçirən qurum*"
              id="Name"
              name="name"
              variant="outlined"
              value={userData.departmentInCharge}
              error={!!error?.departmentInCharge}
              helperText={error?.departmentInCharge || ""}
              onChange={(e) => {
                console.log(userData);
                setUserData((prev) => {
                  const data = { ...prev, departmentInCharge: e.target.value };
                  return data;
                });
              }}
            />
            <TextField
              label="Təlimin məzmunu"
              name="surname"
              id="Surname"
              variant="outlined"
              value={userData.description}
              error={!!error?.description}
              helperText={error?.description || ""}
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
              error={!!error?.startDate}
              helperText={error?.startDate || ""}
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
              name="finishDate"
              id="FinishDate"
              variant="outlined"
              value={userData.finishDate || ""} 
              error={!!error?.finishDate}
              helperText={error?.finishDate || ""}
              onChange={(e) => {
                console.log(e.target.value); // Log the new value
                setUserData((prev) => ({
                  ...prev,
                  finishDate: e.target.value, // Update the state with the new date
                }));
              }}
            />
            <input
              multiple
              type="file"
              helperText="Təlimin sənədləri "
              name="MesTrainingAttachmentFiles"
              id="files"
              variant="outlined"
              onChange={(e) => {
                console.log(e.target.files); // Log the new value
                setUserData((prev) => ({
                  ...prev,
                  mesTrainingAttachmentFiles: e.target.files, // Update the state with the new date
                }));
              }}
            />{" "}
          </Box>
          <FormControl
            style={{
              display: "flex",
              flexDirection: "row",
              gap: "60px",
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
            <FormControl variant="outlined" fullWidth error={!!error?.trainingResultId}>
              <InputLabel id="arestrdytfy">Təlimin neticesi</InputLabel>
              <Select
                sx={{
                  width: "50ch",
                }}
                labelId="arestrdytfy"
                id="arestrdytfy"
                onChange={(e) => {
                  console.log(userData);
                  setUserData((prev) => {
                    const data = { ...prev, trainingResultId: e.target.value };
                    return data;
                  });
                }}
                variant="outlined"
                error={!!error?.trainingResultId}
                helperText={error?.trainingResultId || ""}
              >
                {trainingResult.map((training) => {
                  return (
                    <MenuItem value={training.id}>{training.name}</MenuItem>
                  );
                })}
              </Select>
              <FormHelperText>{error?.trainingResultId || ""}</FormHelperText>
            </FormControl>
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
              <TextField
                id="Height"
                label="Təlimin keçirilmə yeri "
                name="height"
                variant="outlined"
                value={userData?.trainingPlace}
                error={!!error?.trainingPlace}
                helperText={error?.trainingPlace || ""}
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
                error={!!error?.trainingMaster}
                helperText={error?.trainingMaster || ""}
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
                name="priority"
                label="Prioritet "
                variant="outlined"
                type="number"
                value={userData?.priority}
                onChange={(e) => {
                  console.log(userData);
                  setUserData((prev) => {
                    const data = { ...prev, priority: e.target.value };
                    return data;
                  });
                }}
              />
              <Autocomplete
                multiple
                disablePortal
                value={value}
                onBlur={() => {
                  if (value.length === 0) {
                    setError((prev) => ({
                      ...prev,
                      volunteerIds: "Bu xana boş qala bilməz",
                    }));
                  } else {
                    setError((prev) => ({
                      ...prev,
                      volunteerIds: "",
                    }));
                  }
                }}
                onChange={(e, newValue) => {
                  setValue(newValue);
                  setUserData((prev) => {
                    const data = {
                      ...prev,
                      volunteerIds: newValue.map((e) => e.id),
                    };
                    return data;
                  });
                  if (newValue.length > 0) {
                    setError((prev) => ({
                      ...prev,
                      volunteerIds: "",
                    }));
                  }
                }}
                options={volonteerNames}
                sx={{ width: 300 }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Konulluler"
                    error={!!error?.volunteerIds} 
                    helperText={error?.volunteerIds || ""} 
                  />
                )}
              />
              <Button variant="contained" onClick={() => handleSubmit()}>
                Yadda saxla
              </Button>
            </Box>
          </FormControl>
        </FormControl>
      </div>
    </>
  );
}
