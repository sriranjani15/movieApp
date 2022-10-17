import React, { useState,useEffect } from "react";
import {
  TextField,
  Container,
  Button,
  IconButton,
  Typography,
} from "@mui/material";
import { Grid } from "@mui/material";
import { Paper, Box } from "@mui/material";
import InputAdornment from "@mui/material/InputAdornment";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { Link, useHistory } from "react-router-dom";
import axios from "axios";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import Divider from "@mui/material/Divider";
import { GoogleLogin } from "react-google-login";
import { gapi } from 'gapi-script';
import { Alert } from "@mui/material";
import { Snackbar } from "@mui/material";
const clientId =
  "939399432671-lvbca7459s546fksaind07cfr91r6vkc.apps.googleusercontent.com";
const Login = () => {
  const navigate = useHistory();
  const [mode, setMode] = useState("Login");
  const [value, setValue] = useState(false);
  const [alertText,setAlertText] = useState("");
  const [values, setValues] = useState({
    email: "",
    pass: "",
    showPass: false,
  });
  const styleObj = {
    "&:hover": {
      backgroundColor: "#45345f",
      color: "#ffffff",
    },
  };
  useEffect(() => {
    const initClient = async () => {
          gapi.client.init({
          clientId: clientId,
          scope: ''
        });
     };
     gapi.load('client:auth2', initClient);
 });

 const handleToClose = (event, reason) => {
  if ("clickaway" == reason) return;
  setValue(false);
};
  const handlePassVisibility = () => {
    setValues({
      ...values,
      showPass: !values.showPass,
    });
  };
  const handleSubmit = async () => {
    // e.preventDefault();
    let username = values.email;
    let password = values.pass;
    // const response = await loginUser({
    //     username,
    //     password
    //   });
    //   console.log(response);
    // if ('accessToken' in response) {
    //     new Swal("Success", response.message, "success", {
    //       buttons: false,
    //       timer: 2000,
    //     })
    //     .then((value) => {
    //       localStorage.setItem('key', response['accessToken']);
    //       localStorage.setItem('user', JSON.stringify(response['user']));
    //     //   window.location.href = "/";
    //       navigate.goBack();
    //       navigate.push(`/`, { from: "login" });
    //     });
    //   } else {
    //     new Swal("Failed", response.message, "error");
    //   }
    if (mode === "Login") {
      const res = await fetch("http://localhost:4000/api/auth/login", {
        method: "POST",
        body: JSON.stringify({ email: username, password: password }),
        headers: { "Content-Type": "application/json" },
      });
      const data = await res.json();
      console.log(data);
      if (res.status === 400 || res.status === 401) {
        if(data.message === "Login not Successful"){
          setValue(true);
          setAlertText("Enter Valid Email Id and Password");
        }
        else if(data.message === "email or password not present"){
          setAlertText("Email Id or Password is not present");
          setValue(true);
        }
        console.log(data.error);
      }
      if (data.message === "Login Successful") {
        localStorage.setItem("key", "32432424");
        //navigate.goBack();
        localStorage.setItem("count", "1");
        navigate.push(`/`, { from: "login" });
      }
    } else {
      const res = await fetch("http://localhost:4000/api/auth/register", {
        method: "POST",
        body: JSON.stringify({ email: username, password: password }),
        headers: { "Content-Type": "application/json" },
      });
      const data = await res.json();
      console.log(data);
      if (res.status === 400 || res.status === 401) {
        if(data.message === "User Already Present"){
          setAlertText("Email Id already Registered");
          setValue(true);
        }
        else if(data.message === "Password less than 6 characters"){
          setAlertText("Password must not be less than 6 characters");
          setValue(true);
        }
        console.log(data.error);
      }
      if (data.message === "user successfully created") {
        setMode("Login");
      }
    }
  };

  const onSuccess = (res) => {
    console.log('Login Success: currentUser:', res.profileObj);
    console.log(
      `Logged in successfully welcome ${res.profileObj.name}`
    );
    localStorage.setItem('key',res.profileObj.googleId);
    localStorage.setItem("count", "1");
    localStorage.setItem("mode","Google");
    navigate.push(`/`, { from: "login" });
  };

  const onFailure = (res) => {
    console.log('Login failed: res:', res);
    console.log(
      `Failed to login.`
    );
  };

  const handleSignupLogin = () => {
    if (mode === "Login") {
      setValues({
        showPass: false,
        email:"",
        pass:""
      });
      setMode("Register");
    } else {
      setValues({
        showPass: false,
        email:"",
        pass:""
      })
      setMode("Login");
    }
  };
  return (
    <div>
      <Snackbar
        anchorOrigin={{
          horizontal: "left",
          vertical: "bottom",
        }}
        autoHideDuration={500}
        open={value}
        onClose={() => setValue(false)}
      >
        <Alert severity="error">{alertText}</Alert>
      </Snackbar>
      <Container maxWidth="sm">
        <Grid
          container
          spacing={2}
          direction="column"
          justifyContent="center"
          style={{ minHeight: "80vh" }}
        >
          <Paper elevation={2} sx={{ padding: 5, backgroundColor: "#4b3b6d" }}>
            <Grid container direction="column" spacing={2}>
              <Grid item>
                <TextField
                  type="email"
                  fullWidth
                  label="Enter your Email"
                  name="email"
                  placeholder="Email Address"
                  value={values.email}
                  variant="filled"
                  sx={{ backgroundColor: "white" }}
                  required
                  onChange={(e) => {
                    setValues({ ...values, email: e.target.value });
                  }}
                />
              </Grid>
              <Grid item>
                <TextField
                  type={values.showPass ? "Text" : "password"}
                  fullWidth
                  label="Enter Password"
                  placeholder="Password"
                  value={values.pass}
                  name="password"
                  variant="filled"
                  required
                  sx={{ backgroundColor: "white" }}
                  onChange={(e) => {
                    setValues({ ...values, pass: e.target.value });
                  }}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          onClick={handlePassVisibility}
                          aria-label="toggle password"
                          edge="end"
                        >
                          {values.showPass ? (
                            <VisibilityOffIcon />
                          ) : (
                            <VisibilityIcon />
                          )}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>
              <Grid item>
                <Button
                  variant="contained"
                  onClick={handleSubmit}
                  sx={{
                    ...styleObj,
                    padding: 1,
                    backgroundColor: "white",
                    color: "#4b3b6d",
                    marginLeft: 25,
                  }}
                >
                  {mode === "Login" ? "Sign In" : "Register"}
                </Button>
              </Grid>
              <Divider sx={{ marginTop: 3, color: "white" }}>OR</Divider>
              <Box sx={{marginLeft:20,marginTop:3}}>
              <GoogleLogin
                clientId={clientId}
                buttonText="Sign in with Google "
                onSuccess={onSuccess}
                onFailure={onFailure}
                cookiePolicy={"single_host_origin"}
                isSignedIn={true}
              />
              </Box>
              {mode === "Login" ? (
                <>
                  <Grid item sx={{ marginTop: 4 }}>
                    <Box display="flex" sx={{ justifyContent: "center" }}>
                      <Typography sx={{ color: "white", marginTop: 1 }}>
                        Need an Account?
                      </Typography>
                      <Button
                        variant="contained"
                        onClick={handleSignupLogin}
                        sx={{
                          ...styleObj,
                          padding: 1,
                          backgroundColor: "white",
                          color: "#4b3b6d",
                          marginLeft: 1,
                        }}
                      >
                        SIGN UP
                      </Button>
                    </Box>
                  </Grid>
                </>
              ) : (
                <>
                  <Grid item sx={{ marginTop: 4 }}>
                    <Box display="flex" sx={{ justifyContent: "center" }}>
                      <Typography sx={{ color: "white", marginTop: 1 }}>
                        Already a User?
                      </Typography>
                      <Button
                        variant="contained"
                        onClick={handleSignupLogin}
                        sx={{
                          ...styleObj,
                          padding: 1,
                          backgroundColor: "white",
                          color: "#4b3b6d",
                          marginLeft: 1,
                        }}
                      >
                        SIGN IN
                      </Button>
                    </Box>
                  </Grid>
                </>
              )}
            </Grid>
          </Paper>
        </Grid>
      </Container>
    </div>
  );
};

export default Login;
