import React, { useState } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Axios from "../axios.js";
import { toast } from "react-toastify";
import { auth, googleProvider } from "../firebase-config/firebase.js";
import { signInWithPopup, signInWithEmailAndPassword } from "firebase/auth";

export default function SignUp() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [userNameError, setUsernameError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);

  async function handleSignUp(e) {
    e.preventDefault();

    if (username == "") {
      toast.error("Username not entered!");
    }

    if (password == "") {
      toast.error("Password not entered!");
    }

    try {
      const response = await Axios.post("/api/auth/signup", {
        username,
        password,
      });
      console.log(response);
      window.location.reload();
      toast.success("Successfully signed new user!");
    } catch (err) {
      console.error(err.response.data);
    }
  }

  async function handleGoogleSignUp() {
    try {
      const response = await signInWithPopup(auth, googleProvider);
      console.log(response);
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: "red" }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        <Box component="form" noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="userName"
            label="User Name"
            name="userName"
            autoComplete="userName"
            autoFocus
            focused
            error={userNameError}
            InputProps={{
              style: {
                color: "white",
              },
            }}
            onChange={(e) => {
              setUsername(e.target.value);
            }}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            focused
            error={passwordError}
            InputProps={{
              style: {
                color: "white",
              },
            }}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            onClick={handleSignUp}
          >
            Sign up
          </Button>
          <Grid container>
            <Grid item xs>
              <Link href="#" variant="body2">
                Forgot password?
              </Link>
            </Grid>
            <Grid item>
              <Link href="/" variant="body2">
                {"Back"}
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
}
