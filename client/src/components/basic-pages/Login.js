import React, { useState, useContext } from "react";
import setAuthToken from "../../utils/setAuthToken";

import axios from "axios";
import { Link as DomLink, Redirect } from "react-router-dom";
import { UserContext } from "../../context/UserContext";
import { AuthContext } from "../../App";

import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";

import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: "#880e4f",
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function Login() {
  const classes = useStyles();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { state, dispatch } = useContext(AuthContext);

  if (state.isAuthenticated) {
    return <Redirect to="/" />;
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    // check if input is empty
    // set error
    if (!email || !password) {
      return;
    }
    //
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    axios.post("/login", { email, password }, config).then((res) => {
      dispatch({ type: "LOGIN", payload: res.data });
    });

    // const res = await axios.post("/login", { email, password }, config);
    // // res.data is token
    // console.log("response", res.data);
    // await dispatch({ type: "LOGIN", payload: res.data });
    // console.log("state", state);

    // // if authenticated, then redirect
    // if (state.isAuthenticated) {
    //   console.log("here 12345678");
    //   return <Redirect to="/" />;
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <form className={classes.form} noValidate onSubmit={handleSubmit}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            value={email}
            onChange={(event) => setEmail(event.target.value)}
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
            autoComplete="current-password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />

          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Sign In
          </Button>
          <Grid container justify="flex-end">
            <Grid item>
              <Link href="/register" variant="body2">
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  );
}
