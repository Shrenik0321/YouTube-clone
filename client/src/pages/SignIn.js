import React, { useState, useEffect } from "react";
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
import { useDispatch } from "react-redux";
import { loginFailure, loginStart, loginSuccess } from "../redux/userSlice.js";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { auth, googleProvider } from "../firebase-config/firebase.js";
import { signInWithPopup, onAuthStateChanged, signOut } from "firebase/auth";

export default function SignIn() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [googleUser, setGoogleUser] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUsers) => {
      setGoogleUser(currentUsers);
    });
    return () => {
      unsubscribe();
    };
  }, [googleUser]);

  // Incase the user moves back.He wont be able to go back into the private pages
  useEffect(() => {
    const handleSignOut = () => {
      signOut(auth).catch((error) => {
        console.log(error);
      });
    };
    handleSignOut();
  }, []);

  async function handleSignIn(e) {
    e.preventDefault();
    dispatch(loginStart());

    if (username === "") {
      toast.error("Username not entered!");
    }

    if (password === "") {
      toast.error("Password not entered!");
    }

    try {
      const response = await Axios.post("/api/auth/signin", {
        username,
        password,
      });
      const expirationDate = new Date().getTime() + 3600 * 1000;
      const tokenObject = {
        userId: response.data._id,
        token: response.data.access_token,
        expiresAt: expirationDate,
        fromGoogle: response.data.fromGoogle,
      };
      localStorage.setItem("access_token", JSON.stringify(tokenObject));
      dispatch(loginSuccess(response.data));
      let userId = tokenObject.userId;
      navigate(`/home/${userId}`);
      window.location.reload();
    } catch (err) {
      dispatch(loginFailure());
      toast.error(err.response.data.message);
      console.error(err.response.data);
    }
  }

  async function handleGoogleSignIn(e) {
    e.preventDefault();
    dispatch(loginStart());
    try {
      if (googleUser != null) {
        console.log("Already signed in!");
      } else {
        // Dont have to worry about signing up because if it isnt, it will automatically get signed up. SignIns wont happen twice
        console.log("First time signing in!");
        const authResponse = await signInWithPopup(auth, googleProvider);
        const data = {
          _id: authResponse.user.uid,
          username: authResponse.user.displayName,
          access_token: authResponse._tokenResponse.oauthIdToken,
        };
        try {
          const response = await Axios.post("/api/auth/google", data);
          const expirationDate = new Date().getTime() + 3600 * 1000;
          const tokenObject = {
            userId: response.data.googleId,
            token: response.data.accessToken,
            expiresAt: expirationDate,
            fromGoogle: response.data.fromGoogle,
          };
          localStorage.setItem("access_token", JSON.stringify(tokenObject));
          dispatch(loginSuccess(response.data));
          const userId = tokenObject.userId;
          navigate(`/home/${userId}`);
          window.location.reload();
        } catch (err) {
          console.error(err);
        }
      }
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
        <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
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
            onClick={handleSignIn}
          >
            Sign In
          </Button>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mb: 2 }}
            onClick={handleGoogleSignIn}
          >
            Sign In with Google
          </Button>
          <Grid container>
            <Grid item xs>
              <Link href="#" variant="body2">
                Forgot password?
              </Link>
            </Grid>
            <Grid item>
              <Link href="/signup" variant="body2">
                "Don't have an account? Sign Up"
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
}
