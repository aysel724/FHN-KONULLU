// src/App.js

import React, { useEffect, useState, useRef } from "react";
import { Container, Typography, TextField, Button, Grid } from "@mui/material";
import { Formik, Form, Field } from "formik";
import axios from "axios";
import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";

function Cvgenerator() {
  const [userData, setUserData] = useState(null);
  const formRef = useRef(null); // Reference to the form element

  useEffect(() => {
    fetchUserData();
  }, []);

  const fetchUserData = async () => {
    try {
      const response = await axios.get(
        "https://api-volunteers.fhn.gov.az/api/v1/Volunteers/85"
      );
      setUserData(response.data);
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  const handleSubmit = (values) => {
    console.log(values);

    // Generate PDF
    generatePDF();
  };

  const generatePDF = () => {
    const formElement = formRef.current;

    html2canvas(formElement).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("p", "mm", "a4");
      const width = pdf.internal.pageSize.getWidth();
      const height = pdf.internal.pageSize.getHeight();

      pdf.addImage(imgData, "PNG", 0, 0, width, height);
      pdf.save("cv.pdf");
    });
  };

  return (
    <Container maxWidth="md">
      <Typography variant="h4" align="center" gutterBottom>
        CV Generator
      </Typography>
      {userData ? (
        <Formik
          initialValues={{
            name: userData.name || "",
            surname: userData.surname || "",
            email: userData.email || "",
            phoneNumber1: userData.phoneNumber1 || "",
          }}
          onSubmit={handleSubmit}
        >
          {({ handleSubmit }) => (
            <Form ref={formRef}>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <Field
                    name="name"
                    as={TextField}
                    label="First Name"
                    fullWidth
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Field
                    name="surname"
                    as={TextField}
                    label="Last Name"
                    fullWidth
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Field name="email" as={TextField} label="Email" fullWidth />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Field
                    name="phoneNumber1"
                    as={TextField}
                    label="Phone"
                    fullWidth
                  />
                </Grid>

                <Grid item xs={12}>
                  <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    onClick={handleSubmit}
                  >
                    Generate CV
                  </Button>
                </Grid>
              </Grid>
            </Form>
          )}
        </Formik>
      ) : (
        <Typography variant="body1" align="center">
          Loading...
        </Typography>
      )}
    </Container>
  );
}

export default Cvgenerator;
