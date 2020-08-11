import React, { useState, useContext } from 'react';
import AlertTag from '../layout/AlertTag';
import { AuthContext } from '../../context';

import axios from 'axios';
import { Redirect } from 'react-router-dom';

import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';

import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';

import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    paddingBottom: 160,
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: '#880e4f',
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const Login = () => {
  const classes = useStyles();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [errorInfo, setErrorInfo] = useState({ errMsg: '', show: false });
  const { authState, dispatch } = useContext(AuthContext);

  if (authState.isAuthenticated) {
    return <Redirect to='/' />;
  }

  const handleCloseAlert = () => {
    setErrorInfo((prev) => ({ ...prev, show: false }));

  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // check if input is empty
    // set error
    if (!email || !password) {
      setErrorInfo((prev) => ({
        ...prev,
        errMsg: 'Empty field(s) found',
        show: true,
      }));
      return;
    }

    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    try {
      const res = await axios.post('/login', { email, password }, config);
      dispatch({ type: 'LOGIN', payload: res.data });
      setErrorInfo({ errMsg: '', show: false });
    } catch (err) {
      const errMsg = err.response.data.errMsg;
      setErrorInfo((prev) => ({ ...prev, errMsg, show: true }));
    }
  };

  return (
    <Container component='main' maxWidth='xs'>
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component='h1' variant='h5'>
          Sign in
        </Typography>
        <form className={classes.form} onSubmit={handleSubmit}>
          {errorInfo.show && (
            <AlertTag
              isOpen={errorInfo.show}
              msg={errorInfo.errMsg}
              onClose={handleCloseAlert}
            />
          )}
          <TextField
            variant='outlined'
            margin='normal'
            required
            fullWidth
            id='email'
            label='Email Address'
            name='email'
            autoComplete='email'
            autoFocus
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />
          <TextField
            variant='outlined'
            margin='normal'
            required
            fullWidth
            name='password'
            label='Password'
            type='password'
            id='password'
            autoComplete='current-password'
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />

          <Button
            type='submit'
            fullWidth
            variant='contained'
            color='primary'
            className={classes.submit}
          >
            Sign In
          </Button>
          <Grid container justify='flex-end'>
            <Grid item>
              <Link href='/register' variant='body2'>
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  );
};

export default Login;
