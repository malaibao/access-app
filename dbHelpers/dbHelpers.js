// Helper functions to access database //

module.exports = (db) => {
  const getPins = () => {
    const query = {
      text: `SELECT * FROM pins;`,
    };
    return db.query(query).then((result) => result.rows);
  };

  const getPinsById = function (lat, lon) {
    const query = {
      text: `
      SELECT * FROM pins
      WHERE pins.longitude = $1 AND pins.latitude = $2;
      `,
      values: [lat, lon],
    };
    return db.query(query).then((res) => res.rows[0]);
  };

  const getRatings = (pinId) => {
    const query = {
      text: `SELECT * FROM ratings WHERE pin_id = $1`,
      values: [pinId],
    };
    return db.query(query).then((result) => result.rows);
  };

  const addPin = (userId, name, address, latitude, longitude) => {
    const query = {
      text: `
        INSERT INTO pins(user_id, name, address, latitude, longitude) 
        VALUES ($1, $2, $3, $4, $5)
      `,
      values: [userId, name, address, latitude, longitude],
    };
  };

  const addRating = () => {};

  //validation to determine whether someone has an existing email registered
  const isUserRegistered = (email) => {
    const query = {
      text: `
        SELECT * FROM users
        WHERE users.email = $1;
      `,
      values: [email],
    };
    return db.query(query).then((res) => res.rows.length > 0);
  };

  //login validation that returns the user ID
  const getUserByEmail = function (email) {
    const query = {
      text: `
      SELECT * FROM users
      WHERE users.email = $1;
      `,
      values: [email],
    };
    return db.query(query).then((res) => res.rows[0]);
  };

  //add a user to the db
  const addUser = (email, password, username) => {
    const query = {
      text: `
        INSERT INTO users(email, password, username)
        VALUES ($1, $2, $3)
        RETURNING *;
      `,
      values: [email, password, username],
    };
    return db.query(query).then((result) => result.rows[0]);
  };

  return {
    getPins,
    getRatings,
    addPin,
    addRating,
    isUserRegistered,
    getUserByEmail,
    getPinsById,
    addUser,
  };
};
