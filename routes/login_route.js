require("dotenv").config();

const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

module.exports = ({ isUserRegistered, getUserByEmail }) => {
  // checks the users email to validate login
  router.post("/", (req, res) => {
    console.log("hello from login");
    const { email, password } = req.body;

    isUserRegistered(email)
      .then((isRegistered) => {
        if (isRegistered) {
          getUserByEmail(email).then((returnedUser) => {
            // Check if user password is correct
            const hash = returnedUser.password;
            bcrypt
              .compare(password, hash)
              .then((result) => {
                if (result) {
                  const payload = {
                    user: {
                      id: returnedUser.id,
                    },
                  };

                  jwt.sign(
                    payload,
                    process.env.JWTSECRET,
                    { expiresIn: 360000 }, //optional
                    (err, token) => {
                      if (err) throw err;
                      res.json({ token });
                    }
                  );
                } else {
                  res.status(400).send("Wrong credential. Please try again.");
                }
              })
              .catch((err) => {
                console.log(err);
              });
          });
        } else {
          res
            .status(400)
            .send(
              "The email does not match a registered user account. Please try again, or register for an account."
            );
          return;
        }
      })
      .catch((err) => {
        console.log(err);
      });
  });

  return router;
};
