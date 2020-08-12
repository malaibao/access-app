const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');

module.exports = ({
  getUserRatings,
  getRatingById,
  getTypeTotal,
  deleteRating,
  getTotalContribution,
  getPercentContribution,
  getPinsAdded,
  getRatingsAdded,
  getMostRatedType,
}) => {
  router.get('/', auth, async (req, res) => {
    const userId = req.user.id;

    try {
      const ratings = await getUserRatings(userId);
      const typeTotal = await getTypeTotal(userId);

      const totalContribution = await getTotalContribution(userId);
      let percentContribution = await getPercentContribution(userId);
      const totalPins = await getPinsAdded(userId);
      const totalRatings = await getRatingsAdded(userId);
      const mostRatedType = await getMostRatedType(userId);

      // percentContribution,

      percentContribution = (
        (percentContribution.count / percentContribution.total_count) *
        100
      ).toFixed(2);

      const ratingInfo = {
        ratings,
        typeTotal,
        ...totalContribution,
        percent_contribution: percentContribution,
        // ...totalPins,
        ...mostRatedType,
        ...totalRatings,
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
        const typeTotal = await getTypeTotal(userId);
        const totalContribution = await getTotalContribution(userId);

        let percentContribution = await getPercentContribution(userId);
        percentContribution = (
          (percentContribution.count / percentContribution.total_count) *
          100
        ).toFixed(2);
        const totalPins = await getPinsAdded(userId);
        const totalRatings = await getRatingsAdded(userId);
        const mostRatedType = await getMostRatedType(userId);

        res.status(200).json({
          ratings,
          typeTotal,
          ...mostRatedType,
          ...totalContribution,
          // ...totalPins,
          ...totalRatings,
          percent_contribution: percentContribution,
        });
      } else {
        res.status(400).send('Not your rating. Cannot delete.');
      }
    } catch (err) {
      console.log('Error deleting rating', err);
    }
  });

  return router;
};
