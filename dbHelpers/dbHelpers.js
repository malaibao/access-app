// Helper functions to access database //

module.exports = (db) => {
  const getPins = () => {
    const query = {
      text: `SELECT * FROM pins;`,
    };
    return db.query(query).then((res) => res.rows);
  };

  const getPinById = (pinId) => {
    const query = {
      text: `SELECT * FROM pins WHERE id = $1`,
      values: [pinId],
    };
    return db.query(query).then((res) => res.rows[0]);
  };

  // get pins by coordinates
  const getPinByCoordinates = function (lat, lon) {
    const query = {
      text: `
      SELECT * FROM pins
      WHERE pins.longitude = $1 AND pins.latitude = $2;
      `,
      values: [lat, lon],
    };
    return db.query(query).then((res) => res.rows[0]);
  };

  const addPin = (
    userId,
    name,
    address,
    latitude,
    longitude,
    city,
    type,
    place_id
  ) => {
    const query = {
      text: `
        INSERT INTO pins(user_id, name, address, latitude, longitude, city, type, place_id)
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *;
      `,
      values: [
        userId,
        name,
        address,
        latitude,
        longitude,
        city,
        type,
        place_id,
      ],
    };

    return db.query(query).then((res) => res.rows[0]);
  };

  const getRatings = (pinId) => {
    const query = {
      text: `SELECT 
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
      FROM ratings 
      WHERE pin_id = $1`,
      values: [pinId],
    };
    return db.query(query).then((result) => result.rows);
  };

  const getRatingById = (ratingId) => {
    const query = {
      text: `
        SELECT * FROM ratings WHERE id = $1`,
      values: [ratingId],
    };
    return db.query(query).then((result) => result.rows[0]);
  };

  const addRating = (
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
  ) => {
    const query = {
      text: `
        INSERT INTO ratings(
        pin_id,
        user_id,
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
        stopgap_ramp) 
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18) RETURNING *;
      `,
      values: [
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
        stopgap_ramp,
      ],
    };
    return db.query(query).then((res) => res.rows[0]);
  };

  const getTypeTotal = (userId) => {
    const query = {
      text: `
      SELECT pins.type, CAST(COUNT(*) AS INTEGER) AS Total
      FROM pins, ratings
      WHERE pins.id = ratings.pin_id AND
            ratings.user_id = $1
      GROUP BY pins.type;
      `,
      values: [userId],
    };
    return db.query(query).then((res) => res.rows);
  };

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

  const getUserRatings = (userId) => {
    /*
    
    */
    const query = {
      text: `
        SELECT pins.name, pins.address, pins.longitude, pins.latitude, ratings.*
        FROM pins, ratings
        WHERE pins.id = ratings.pin_id AND
              ratings.user_id = $1
      `,
      values: [userId],
    };
    return db.query(query).then((result) => result.rows);
  };

  const deleteRating = (ratingId) => {
    const query = {
      text: `
        DELETE FROM ratings
        WHERE id = $1`,
      values: [ratingId],
    };
    return db.query(query).then(console.log('deleted'));
  };

  const pinExist = (placeId) => {
    const query = {
      text: `
      SELECT * FROM pins
      WHERE pins.place_id = $1;
      `,
      values: [placeId],
    };
    return db.query(query).then((res) => res.rows.length > 0);
  };

  const getByPlaceId = (placeId) => {
    const query = {
      text: `
      SELECT * FROM pins
      WHERE pins.place_id = $1;
      `,
      values: [placeId],
    };
    return db.query(query).then((res) => res.rows[0]);
  };

  const getTotalContribution = (userId) => {
    const query = {
      text: `
      SELECT COUNT(*) AS totalContribution
      FROM ratings
      WHERE user_id=$1
      `,
      values: [userId],
    };
    return db.query(query).then((res) => res.rows[0]);
  };

  const getPercentContribution = (userId) => {
    const query = {
      text: `
      SELECT x.* FROM 
      (SELECT user_id, count(user_id) as count, sum(count(user_id)) over() as total_count 
      FROM ratings 
      GROUP BY user_id ) AS x
      WHERE x.user_id=$1
      `,
      values: [userId],
    };
    return db.query(query).then((res) => res.rows[0]);
  };

  const getPinsAdded = (userId) => {
    const query = {
      text: `
      SELECT COUNT(*) 
      FROM pins
      WHERE user_id=$1 AND
      date > current_date - interval '30' day;
      `,
      values: [userId],
    };
    return db.query(query).then((res) => res.rows[0]);
  };

  const getRatingsAdded = (userId) => {
    const query = {
      text: `
      SELECT COUNT(*) 
      FROM ratings
      WHERE user_id=$1 AND
      date > current_date - interval '30' day;
      `,
      values: [userId],
    };
    return db.query(query).then((res) => res.rows[0]);
  };

  return {
    getPins,
    addPin,
    addRating,
    getRatings,
    getRatingById,
    getTypeTotal,
    isUserRegistered,
    getUserByEmail,
    getPinById,
    addUser,
    getPinByCoordinates,
    getUserRatings,
    deleteRating,
    pinExist,
    getByPlaceId,
    getTotalContribution,
    getPercentContribution,
    getPinsAdded,
    getRatingsAdded,
  };
};
