const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');

module.exports = ({
  getUserRatings,
  getRatingById,
  getTypeTotal,
  deleteRating,
}) => {
  router.get('/', auth, async (req, res) => {
    const userId = req.user.id;

    try {
      const ratings = await getUserRatings(userId);
      const typeTotal = await getTypeTotal(userId);

      const ratingInfo = {
        ratings,
        typeTotal,
      };
      res.status(200).json(ratingInfo);
    } catch (err) {
      console.log('Error getting user ratings', err);
    }
  });

  router.post('/:id', auth, async (req, res) => {
    const userId = req.user.id;
    const ratingId = req.params.id;

    try {
      const rating = await getRatingById(ratingId);

      if (rating.user_id === userId) {
        await deleteRating(ratingId);
        const ratings = await getUserRatings(userId);
        res.status(200).json(ratings);
      } else {
        res.status(400).send('Not your rating. Cannot delete.');
      }
    } catch (err) {
      console.log('Error deleting rating', err);
    }
  });

  return router;
};
