const express = require('express');
const fetch = require('node-fetch');
const router = express.Router();
const auth = require('../middleware/auth');
const { categoryMajority, filterType } = require('../dbHelpers/utilities');

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
      const allPinsInfo = [];
      
      for (let i = 0; i < allPins.length; i++) {
        const ratings = await getRatings(allPins[i].id);
        const tags = await categoryMajority(ratings);
        const pinInfo = {
          ...allPins[i],
          tags,
        };
        allPinsInfo.push(pinInfo);
      }
      // console.log("all pins info", allPinsInfo);
      res.status(200).json(allPinsInfo);
    } catch (err) {
      console.log('Error in getting pins', err);
    }
  });

  /*
  @desc   CREATE a pin
  @access private
  */

  router.post('/', auth, async (req, res) => {
    const {
      name,
      address,
      longitude,
      latitude,
      place_id,
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

    const type = await fetch(
      `https://maps.googleapis.com/maps/api/place/details/json?placeid=${place_id}&key=${process.env.REACT_APP_GOOGLE_MAPS_API_KEY}`
    )
      .then((res) => res.json())
      .then((returnedData) => {
        return filterType(returnedData.result.types);
      });

    try {
      // create pins
      const newPin = await addPin(
        userId,
        name,
        address,
        latitude,
        longitude,
        type,
        place_id
      );

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

  router.post('/ratings', auth, async (req, res) => {
    const {
      id,
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

    try {
      const newRating = await addRating(
        id,
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

      res.status(200).json(newRating);
    } catch (e) {
      console.log('Error in creating rating for existing pin', err);
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

      // console.log(ratings); // array of objects

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

  router.get('/place_id/:id', async (req, res) => {
    const placeId = req.params.id;

    try {
      const isFound = await pinExist(placeId);

      let result = {};
      if (isFound) {
        const foundPin = await getByPlaceId(placeId);
        const ratings = await getRatings(foundPin.id);
        const tags = await categoryMajority(ratings);

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
            // console.log(returnedData.result.types);
            const type = filterType(returnedData.result.types);
            return {
              name: returnedData.result.name,
              address: returnedData.result.formatted_address,
              longitude: returnedData.result.geometry.location.lng,
              latitude: returnedData.result.geometry.location.lat,
              type,
              place_id: returnedData.result.place_id,
            };
          });

        result = {
          found: false,
          ...pinResult,
        };
      }
      res.status(200).json(result);
    } catch (e) {
      console.log('Error?', e);
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
