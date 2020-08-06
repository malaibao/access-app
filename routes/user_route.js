const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");

module.exports = ({ getUserRatings, getRatingById, deleteRating }) => {
  router.get("/", auth, async (req, res) => {
    const userId = req.user.id;

    try {
      const ratings = await getUserRatings(userId);
      res.status(200).json(ratings);
    } catch (err) {
      console.log("Error getting user ratings", err);
    }
  });

  router.post("/:id", auth, (req, res) => {
    const userId = req.user.id
    const ratingId = req.params.id

    try {
      const rating = await getRatingById(ratingId);

      if (rating.id === userId) {
        await deleteRating(ratingId);
        res.status(200).send("Dish deleted");
      } else {
        res.status(400).send("Not your rating");
      }

    } catch (err) {
      console.log("Error deleting rating", err)
    }
  })
};
