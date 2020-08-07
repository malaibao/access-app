const express = require('express');
const fetch = require('node-fetch');
const router = express.Router();
const auth = require('../middleware/auth');
const { categoryMajority } = require('../dbHelpers/utilities');

// TODO: change the db
module.exports = ({
  getPins,
  addPin,
  addRating,
  getPinById,
  getRatings,
  pinExist,
  getByPlaceId,
}) => {
  /*
  @desc   GET all pins
  @access public
  */
  router.get('/', async (req, res) => {
    try {
      const allPins = await getPins();

      res.status(200).json(allPins);
    } catch (err) {
      console.log('Error in getting pins', err);
    }
  });

  /*
  @desc   CREATE a pin
  @access private
  */

  router.post('/', auth, async (req, res) => {
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
    const userId = req.user.id;

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

      const ratings = await getRatings(newPin.id);
      const tags = categoryMajority(ratings);

      const pinInfo = {
        ...newPin,
        tags,
      };

      res.json(pinInfo);
    } catch (err) {
      console.log('Error in creating pin and rating', err);
      res.status(500).json({ error: 'Server error' });
    }
  });

  router.post('/:id', auth, async (req, res) => {
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
    } = req.body;
    const userId = req.user.id;
    const pinId = req.params.id;
    try {
      const newRating = await addRating(
        pinId,
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

      const pin = await getPinById(pinId);
      const ratings = await getRatings(pinId);
      const tags = categoryMajority(ratings);

      console.log(ratings); // array of objects

      const pinInfo = {
        ...pin,
        tags,
      };

      res.json(pinInfo);
    } catch (err) {
      console.log('Error in creating rating', err);
      res.status(500).json({ error: 'Server error' });
    }
  });

  router.get('/location', async (req, res) => {
    const { placeId } = req.body;

    try {
      const isFound = await pinExist(placeId);

      let result = {};
      if (isFound) {
        const foundPin = await getByPlaceId(placeId);
        const ratings = await getRatings(foundPin.id);
        const tags = categoryMajority(ratings);

        result = {
          found: true,
          pin: { ...foundPin, tags },
        };
      } else {
        const pinResult = await fetch(
          `https://maps.googleapis.com/maps/api/place/details/json?placeid=${placeId}&key=${process.env.REACT_APP_GOOGLE_MAPS_API_KEY}`
        )
          .then((res) => res.json())
          .then((returnedData) => {
            return {
              name: returnedData.result.name,
              address: returnedData.result.formatted_address,
              longitude: returnedData.result.geometry.location.lng,
              latitude: returnedData.result.geometry.location.lat,
            };
          });

        result = {
          found: false,
          pinResult,
        };
      }
      res.status(200).json(result);
    } catch (e) {
      res
        .status(500)
        .json({ errMsg: 'Server Error in finding pin with placeId' });
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
