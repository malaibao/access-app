import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import FormLabel from '@material-ui/core/FormLabel';
import FormControl from '@material-ui/core/FormControl';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  formControl: {
    width: '60%',
    margin: theme.spacing(3),
  },
  form: {
    width: '60%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
}));

export default function Form() {
  const classes = useStyles();
  const [state, setState] = React.useState({
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

  const handleChange = (event) => {
    setState({ ...state, [event.target.name]: event.target.checked });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
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
  } = state;
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
    ].filter((v) => v).length > 1;

  return (
    <div>
      <form className={classes.form} id='rating-form' onSubmit={handleSubmit}>
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
        <Button
          type='submit'
          fullWidth
          variant='contained'
          color='primary'
          className={classes.submit}
        >
          Add Rating
        </Button>
      </form>
    </div>
  );
}
