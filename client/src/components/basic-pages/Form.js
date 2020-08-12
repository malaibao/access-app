import React, { useState, useContext, useEffect } from 'react';
import { AuthContext, PinContext } from '../../context';

import axios from 'axios';
import { Redirect } from 'react-router-dom';

import FormLabel from '@material-ui/core/FormLabel';
import FormControl from '@material-ui/core/FormControl';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import SuccessAlertTag from "../layout/SuccessAlert";

import './Form.scss';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    width: 0.25,
  },
  formControl: {
    margin: theme.spacing(3),
  },
  form: {
    padding: 0,
    margin: 0,
    marginTop: theme.spacing(1),
  },
  submit: {
    backgroundColor: '#880f4f',
    color: 'white',
    marginLeft: 20,
  },
}));

export default function Form({ pin, isOldPin }) {
  // const { authState, dispatch } = useContext(AuthContext);
  const { setPinInfo } = useContext(PinContext);
  const [redirect, setRedirect] = useState(false);
  const [submit, setSubmit] = useState(false); 

  const classes = useStyles();
  const [rating, setRating] = useState({
    accessible_parking: false,
    accessible_washroom: false,
    alternative_entrance: false,
    automatic_door: false,
    elevator: false,
    braille: false,
    gender_neutral_washroom: false,
    large_print: false,
    outdoor_access_only: false,
    quiet: false,
    ramp: false,
    scent_free: false,
    service_animal_friendly: false,
    sign_language: false,
    spacious: false,
    stopgap_ramp: false,
  });

  const [errorInfo, setErrorInfo] = useState({ errMsg: '', show: false });
  const [successInfo, setSuccessInfo] = useState({ successMsg: '', show: false });

  useEffect(() => {
    let timeout = null;
    timeout = setTimeout(() => {
      if (successInfo.show) {
        setRedirect(true);
      }
    }, 2000);
    return () => timeout ? clearTimeout(timeout) : null;
  }, [successInfo.show])
  
  // if (redirect) {
  //   return <Redirect to='/map' />;
  // }

  if (submit) {
    return <Redirect to= '/register' />;
  }

  const handleChange = (event) => {
    setRating({ ...rating, [event.target.name]: event.target.checked });
  };

  const handleCloseAlert = () => {
    setErrorInfo((prev) => ({ ...prev, show: false }));
    setSuccessInfo((prev) => ({
      ...prev,
      show: false
    }));

  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // check if input is empty
    const filled = Object.values(rating).includes(true);


    if (filled === false) {
      setErrorInfo((prev) => ({
        ...prev,
        errMsg: 'Select at least 1 option',
        show: true,
      }));
      return;
    }

    const pinInfo = {
      ...pin,
      ...rating,
    };

    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    try {
      let res;
      if (isOldPin) {
        res = await axios.post('/pins/ratings', pinInfo, config);
      } else {
        res = await axios.post('/pins', pinInfo, config);
      }
      setErrorInfo({ errMsg: '', show: false });
      
      if (res.status === 200) {
        setPinInfo(null);
        const successMsg = 'Success: Pin Added!'
        setSuccessInfo((prev) => ({
        ...prev,
        successMsg,
        show: true
      }));
        // setRedirect(true); uncomment if we remove the useEffect
      }
    } catch (err) {
      if (err.message.match(/401/)) {
        console.log("received 401")
        setSubmit(true); //if a user isn't authorized (401 is true) setState to true and redirect outside of submit handler
      }
      const errMsg = err.response.data.errMsg;
      setErrorInfo((prev) => ({ ...prev, errMsg, show: true }));
    }
  };

  const {
    accessible_parking,
    accessible_washroom,
    alternative_entrance,
    automatic_door,
    elevator,
    braille,
    gender_neutral_washroom,
    large_print,
    outdoor_access_only,
    quiet,
    ramp,
    scent_free,
    service_animal_friendly,
    sign_language,
    spacious,
    stopgap_ramp,
  } = rating;

  const error =
    [
      accessible_parking,
      accessible_washroom,
      alternative_entrance,
      automatic_door,
      elevator,
      braille,
      gender_neutral_washroom,
      large_print,
      outdoor_access_only,
      quiet,
      ramp,
      scent_free,
      service_animal_friendly,
      sign_language,
      spacious,
      stopgap_ramp,
    ].filter((v) => v).length < 1;

  return (
    <>
    { submit && <Redirect to= '/register' />}
    {
      redirect && <Redirect to= '/map' /> 
    }
    {!redirect && 
    <div className='form'>
      {pin ? (
        <>
          <h3>{pin.name}</h3>
          <p>{pin.address}</p>
          <p>Type: {pin.type}</p>
        </>
      ) : null}
      <form className={classes.form} id='rating-form' onSubmit={handleSubmit}>
        {successInfo.show && (
          <SuccessAlertTag
            isOpen={successInfo.show}
            msg={successInfo.successMsg}
            onClose={handleCloseAlert}
          />
        )}
        <FormControl component='fieldset' className={classes.formControl}>
          <FormLabel component='legend'>Select all that apply:</FormLabel>
          <FormGroup>
            <FormControlLabel
              control={
                <Checkbox
                  checked={accessible_parking}
                  onChange={handleChange}
                  name='accessible_parking'
                />
              }
              label='accessible parking'
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={accessible_washroom}
                  onChange={handleChange}
                  name='accessible_washroom'
                />
              }
              label='accessible washroom'
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={alternative_entrance}
                  onChange={handleChange}
                  name='alternative_entrance'
                />
              }
              label='alternative entrance'
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={automatic_door}
                  onChange={handleChange}
                  name='automatic_door'
                />
              }
              label='automatic door'
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={elevator}
                  onChange={handleChange}
                  name='elevator'
                />
              }
              label='elevator'
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={braille}
                  onChange={handleChange}
                  name='braille'
                />
              }
              label='braille'
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={gender_neutral_washroom}
                  onChange={handleChange}
                  name='gender_neutral_washroom'
                />
              }
              label='gender neutral washroom'
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={large_print}
                  onChange={handleChange}
                  name='large_print'
                />
              }
              label='large print'
            />
          </FormGroup>
        </FormControl>
        <FormControl
          required
          error={error}
          component='fieldset'
          className={classes.formControl}
          style={{ paddingTop: 18 }}
        >
          <FormGroup>
            <FormControlLabel
              control={
                <Checkbox
                  checked={outdoor_access_only}
                  onChange={handleChange}
                  name='outdoor_access_only'
                />
              }
              label='outdoor access only'
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={quiet}
                  onChange={handleChange}
                  name='quiet'
                />
              }
              label='quiet'
            />
            <FormControlLabel
              control={
                <Checkbox checked={ramp} onChange={handleChange} name='ramp' />
              }
              label='ramp'
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={scent_free}
                  onChange={handleChange}
                  name='scent_free'
                />
              }
              label='scent free'
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={service_animal_friendly}
                  onChange={handleChange}
                  name='service_animal_friendly'
                />
              }
              label='service animal friendly'
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={sign_language}
                  onChange={handleChange}
                  name='sign_language'
                />
              }
              label='sign language'
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={spacious}
                  onChange={handleChange}
                  name='spacious'
                />
              }
              label='spacious'
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={stopgap_ramp}
                  onChange={handleChange}
                  name='stopgap_ramp'
                />
              }
              label='stopgap ramp'
            />
          </FormGroup>
        </FormControl>
        <br />
        <Button type='submit' variant='contained' className={classes.submit}>
          Add Rating
        </Button>
      </form>
    </div>
    } 
   </> 
  );

}
