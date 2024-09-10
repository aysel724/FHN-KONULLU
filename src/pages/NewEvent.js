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

  // function getTrainingNames(arr) {
  //   return arr.map((e) => e.name + " " + e.surname + " " + e.fatherName);
  // }

  const [selectedImage, setSelectedImage] = useState(null);
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const handleOpen = () => setModalIsOpen(true);
  const handleClose = () => setModalIsOpen(false);
  const [userData, setUserData] = useState({
    name: "",
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

    // setTimeout(() => {
    //   navigate(`/MesTrainings`);
    // }, 20000);

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
    formData.append("Name", userData.name);
    formData.append("DepartmentInCharge", userData.departmentInCharge);
    formData.append("Description", userData.description);
    formData.append("EventDuration", userData.eventDuration);
    formData.append("EventPlace", userData.eventPlace);
    formData.append("FinishDate", convertDate(userData.finishDate));
    [...userData.volunteerIds].forEach((id) => {
      formData.append("VolunteerIds", id);
    });

    // formData.append(
    //   "MesTrainingAttachmentFiles",
    //   userData.mesTrainingAttachmentFiles
    // );

    [...userData.eventAttachments].forEach((file) => {
      formData.append("EventAttachmentFiles", file);
    });

    // Now you can use formData to send the blob to a server using fetch or XMLHttpRequest

    console.log(formData);
    axios
      .post(`https://api-volunteers.fhn.gov.az/api/v1/Events`, formData)
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

  const closeModal = () => {
    setModalIsOpen(false);
  };

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
      <h2>Yeni tədbir əlavə edin</h2>
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
            <TextField
              label="Tədbirin adı *"
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
            <TextField
              label="Tədbiri keçirən qurum*"
              id="Name"
              name="name"
              variant="outlined"
              value={userData.departmentInCharge}
              onChange={(e) => {
                console.log(userData);
                setUserData((prev) => {
                  const data = { ...prev, departmentInCharge: e.target.value };
                  return data;
                });
              }}
            />
            <TextField
              type="date"
              helperText="Tədbirin başlanma tarixi "
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
              helperText="Tədbirin bitmə tarixi "
              name="finishDate"
              id="FinishDate"
              variant="outlined"
              value={userData.finishDate || ""} // Ensure it's either a valid date or an empty string
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
              helperText="Tədbirin sənədləri "
              name="EventAttachmentFiles"
              id="files"
              variant="outlined"
              onChange={(e) => {
                console.log(e.target.files); // Log the new value
                setUserData((prev) => ({
                  ...prev,
                  eventAttachments: e.target.files, // Update the state with the new date
                }));
              }}
            />{" "}
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
              id="filled-basic"
              name="militaryReward"
              label="Təlimin müddəti "
              variant="outlined"
              value={userData?.eventDuration}
              onChange={(e) => {
                console.log(userData);
                setUserData((prev) => {
                  const data = { ...prev, eventDuration: e.target.value };

                  return data;
                });
              }}
            />
            <TextField
              id="Height"
              label="Təlimin keçirilmə yeri "
              name="height"
              variant="outlined"
              value={userData?.eventPlace}
              onChange={(e) => {
                console.log(userData);
                setUserData((prev) => {
                  const data = { ...prev, eventPlace: e.target.value };

                  return data;
                });
              }}
            />
            <TextField
              id="vj"
              name="birthDate"
              label="Təlimçi "
              variant="outlined"
              value={userData?.personInCharge}
              onChange={(e) => {
                console.log(userData);
                setUserData((prev) => {
                  const data = { ...prev, personInCharge: e.target.value };

                  return data;
                });
              }}
            />

            <Autocomplete
              multiple
              disablePortal
              value={value}
              onChange={(e, newValue) => {
                e.preventDefault();
                setValue(newValue);
                setUserData((prev) => {
                  const data = {
                    ...prev,
                    volunteerIds: newValue.map((e) => {
                      return e.id;
                    }),
                  };

                  return data;
                });
              }}
              // value={userData.volunteerIds}
              id="combo-box-demo"
              options={volonteerNames}
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
