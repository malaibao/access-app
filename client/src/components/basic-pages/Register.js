import React, { useState, useContext } from "react";
import AlertTag from "../layout/AlertTag";

import axios from "axios";
import { Redirect } from "react-router-dom";
import { AuthContext } from "../../context";
import { REGISTER } from "../../reducers/action-types";

import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    paddingBottom: 160,
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: "#1660ff",
  },
  form: {
    width: "100%",
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
    backgroundColor: "#1660ff",
  },
}));

const Register = () => {
  const classes = useStyles();
  const [userInfo, setUserInfo] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [errorInfo, setErrorInfo] = useState({ errMsg: "", show: false });
  const { authState, dispatch } = useContext(AuthContext);

  if (authState.isAuthenticated) {
    return <Redirect to="/" />;
  }

  const changeInput = (e) => {
    const inputName = e.target.name;
    const inputVal = e.target.value;

    setUserInfo((prev) => ({ ...prev, [inputName]: inputVal }));
  };

  const handleCloseAlert = () => {
    setErrorInfo((prev) => ({ ...prev, show: false }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // check if input is empty
    if (!userInfo.username || !userInfo.email || !userInfo.password) {
      setErrorInfo((prev) => ({
        ...prev,
        errMsg: "Empty field(s) found",
        show: true,
      }));
      return;
    }
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    try {
      const res = await axios.post("/register", userInfo, config);
      dispatch({ type: REGISTER, payload: res.data });
      setErrorInfo({ errMsg: "", show: false });
    } catch (err) {
      const errMsg = err.response.data.errMsg;
      setErrorInfo((prev) => ({ ...prev, errMsg, show: true }));
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        <form
          className={classes.form}
          autoComplete="off"
          onSubmit={handleSubmit}
        >
          {errorInfo.show && (
            <AlertTag
              isOpen={errorInfo.show}
              msg={errorInfo.errMsg}
              onClose={handleCloseAlert}
            />
          )}
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="username"
            label="Username"
            name="username"
            autoFocus
            value={userInfo.username}
            onChange={changeInput}
          />
          <TextField
            type="email"
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            value={userInfo.email}
            onChange={changeInput}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            inputProps={{
              pattern: ".{8,}",
            }}
            helperText="Password must be at least eight characters long"
            value={userInfo.password}
            onChange={changeInput}
          />

          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Sign Up
          </Button>
          <Grid container justify="flex-end">
            <Grid item>
              <Link href="/login" variant="body2">
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  );
};

export default Register;
