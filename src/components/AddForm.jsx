import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  Box,
  Button,
  Input,
  TextField,
} from "@mui/material";

import FormLoaderAnimation from "./FormLoaderAnimation";
import CustomSnackBar from "./CustomSnackBar";

function AddForm({
  fields,
  title,
  buttonValue,
  open,
  setOpen,
  apiEndPoint,
  formDataTemplate,
  setPageRefresh,
}) {
  const [formData, setFormData] = useState(formDataTemplate);
  const [formError, setFormError] = useState({});
  const [loaderAnimation, setLoaderAnimation] = useState(false);
  const [snackBarData, setSnackBarData] = useState({ status: "", message: "" });
  const [snackBarOpen, setSnackBarOpen] = useState(false);
  const handleInputChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };
  const formValidater = () => {
    if (!formData.name) {
      setFormError({ name: "Name is required" });
      setSnackBarData({ status: "error", message: "Please enter a name" });
      setSnackBarOpen(true);
      return false;
    } else {
      setFormError({});
      return true;
    }
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log(formData);
    const isFormValid = formValidater();

    if (isFormValid) {
      try {
        setLoaderAnimation(true);
        const response = await fetch(apiEndPoint, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        });
        const result = await response.json();
        console.log(result);
        if (response.status === 201) {
          setSnackBarData({ status: "success", message: result.message });
          setSnackBarOpen(true);
          setLoaderAnimation(false);
          setOpen(false);
          setPageRefresh(true);
        } else {
          setSnackBarData({
            status: "error",
            message: result.message,
          });
          setSnackBarOpen(true);
          setLoaderAnimation(false);
          setOpen(false);
        }
      } catch (error) {
        console.log(error);
      } finally {
        setLoaderAnimation(false);
      }
    }
  };
  return (
    <>
      <Dialog onClose={() => setOpen(false)} open={open}>
        <FormLoaderAnimation open={loaderAnimation} />
        <DialogTitle>{title}</DialogTitle>
        <Box
          sx={{
            // border: "2px solid red",
            marginLeft: 3,
            marginRight: 3,
            marginBottom: 3,
          }}
        >
          <Box component="form" noValidate fullWidth autoComplete="off">
            {fields.map((value) => (
              <TextField
                id="outlined-basic"
                label={formError.name ? formError.name : value.label}
                variant="outlined"
                name="name"
                fullWidth
                error={formError.name ? true : false}
                onChange={handleInputChange}
              />
            ))}
          </Box>

          <Box
            sx={{
              // border: "2px solid green",
              display: "flex",
              justifyContent: "end",
              alignItems: "center",
            }}
          >
            <Button
              variant="contained"
              size="medium"
              sx={{ marginTop: 2 }}
              onClick={handleSubmit}
            >
              {buttonValue}
            </Button>
          </Box>
        </Box>
      </Dialog>
      <CustomSnackBar
        status={snackBarData.status}
        message={snackBarData.message}
        open={snackBarOpen}
        setOpen={setSnackBarOpen}
      />
    </>
  );
}

export default AddForm;
