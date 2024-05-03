import React from "react";
import {
  Box,
  Button,
  TextField,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import styled from "@emotion/styled";

const SignUpContainer = styled(Box)(({ theme }) => ({
  width: "100vw",
  height: "100vh",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
}));

const SignUpForm = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
}));

const SignUpSubContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
}));

function SignUp() {
  return (
    <SignUpContainer>
      <SignUpForm component="form" width={400} marginTop={10}>
        <Typography
          variant="h1"
          align="center"
          fontSize={25}
          fontWeight={400}
          color="primary"
        >
          Create an account
        </Typography>
        <TextField label="First Name" sx={{ marginTop: 2 }} size="medium" />
        <TextField label="Last Name" sx={{ marginTop: 1 }} size="medium" />
        <TextField label="Email" sx={{ marginTop: 2 }} size="medium" />
        <TextField
          label="New Password"
          type="password"
          sx={{ marginTop: 2 }}
          size="medium"
        />
        <TextField
          label="Confirm Password"
          type="password"
          sx={{ marginTop: 1 }}
          size="medium"
        />

        <FormControl fullWidth sx={{ marginTop: 2 }}>
          <InputLabel>Access To</InputLabel>
          <Select label="Access To">
            <MenuItem value={1}>All</MenuItem>
            <MenuItem value={2}>Farm1</MenuItem>
            <MenuItem value={3}>Farm2</MenuItem>
            <MenuItem value={4}>Farm3</MenuItem>
          </Select>
        </FormControl>
        <Button
          variant="contained"
          sx={{ marginTop: 4, p: 1, textTransform: "initial" }}
          size="large"
        >
          Create account
        </Button>
      </SignUpForm>
      <SignUpSubContainer width={400} sx={{ marginTop: 4 }}>
        <Typography>Have an account?</Typography>
        <Button
          size="medium"
          variant="outlined"
          sx={{ textTransform: "initial" }}
        >
          Sign in
        </Button>
      </SignUpSubContainer>
    </SignUpContainer>
  );
}

export default SignUp;
