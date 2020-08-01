const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');

// TODO: change the db
module.exports = ({ getPins }) => {
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
  router.post('/', (req, res) => {
    // call db
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
