require('dotenv').config();

const express = require('express');
const router = express.Router();

const jwt = require('jsonwebtoken');

module.exports = ({
  addUser,
  isUserRegistered,
  getUserByEmail
}) => {
  // gets the registration route and passes the cookie session
  router.get('/', (req, res) => {
    // const templateVars = {
    //   user: req.session["user"],
    //   userId: req.session["user_id"],
    // };
    // res.render("register", templateVars);
  });

  // checks whether the users email already exists in the db
  // either redirects them to home or asks them to login
  router.post("/", (req, res) => {
    console.log('hello from register');
    const {
      email,
      password,
      username
    } = req.body;
    isUserRegistered(email).then(function (user) {
      if (!user) {
        addUser(email, password, username).then(row => {
          
          const userEmail = row.email 
          console.log("email line 35:",userEmail)
          getUserByEmail(userEmail).then((returndUser) => {
            const payload = {
              user: {
                id: returndUser.id,
              },
            };

            jwt.sign(
              payload,
              process.env.JWTSECRET, {
                expiresIn: 360000
              }, //optional
              (err, token) => {
                if (err) throw err;
                res.json({
                  token
                });
              }
            );
          });
        });
      } else {
        res
          .status(400)
          .send("Please login.");
        return;
      }
    });
  });

  return router;
};
