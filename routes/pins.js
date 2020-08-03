const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');

// TODO: change the db
module.exports = ({ getPins, addPin, addRating }) => {
  /*
  @desc   GET all pins
  @access public
  */
  router.get('/', async (req, res) => {
    try {
      const allPins = await getPins();

      res.status(200).json(allPins);
    } catch (e) {
      console.log('Error in getting pins', e);
    }
  });

  /*
  @desc   CREATE a pin
  @access private
  */

  router.post('/', async (req, res) => {
    //gets the location, name, address from the google api call on search
    const {
      name,
      address,
      longitude,
      latitude,
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
    } = req.body;

    // TODO: get from req.user.id
    const userId = 2;

    try {
      // create pins
      const newPin = await addPin(userId, name, address, latitude, longitude);

      // create rating
      const newRating = await addRating(
        newPin.id,
        userId,
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
        stopgap_ramp
      );

      const pinInfo = {
        ...newPin,
        rating: newRating,
      };

      res.json(pinInfo);
    } catch (err) {
      console.log('Something went wrong during pin creation', err);
      res.status(500).json({ error: 'Server error' });
    }
  });

  /*
  @desc   GET pin by id
  @access public
  */
  router.get('/:id', async (req, res) => {
    const { latitude, longitude } = req.body;
    try {
      const getPinId = await getPinsById(longitude, latitude);

      res.status(200).json(getPinId);
    } catch (e) {
      console.log('Error in getting pin by Id', e);
    }
  });

  return router;
};
