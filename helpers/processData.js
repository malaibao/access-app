const { data } = require('./data');
// const { data2 } = require('./data2');

const types = [
  'accessible_parking',
  'accessible_washroom', // core
  'alternative_entrance',
  'automatic_door', // core
  'elevator',
  'braille',
  'gender_neutal_washroom',
  'stopgap_ramp',
  'spacious',
  'sign_language',
  'service_animal_friendly',
  'scent_free',
  'ramp',
  'quiet',
  'outdoor_access_only',
  'large_print',
];

const coreTypes = ['accessible_washroom', 'automatic_door'];

const cleanedData = data.map((d) => {
  let tags = [];

  if (d.tags.includes('accessible parking')) {
    tags.push('accessible_parking');
  }
  if (d.tags.includes('accessible washroom')) {
    tags.push('accessible_washroom');
  }
  if (d.tags.includes('alternative entrance')) {
    tags.push('alternative_entrance');
  }
  if (d.tags.includes('automatic door')) {
    tags.push('automatic_door');
  }
  if (d.tags.includes('elevator')) {
    tags.push('elevator');
  }
  if (d.tags.includes('braille')) {
    tags.push('braille');
  }
  if (d.tags.includes('gender neutral washroom')) {
    tags.push('gender_neutral_washroom');
  }
  if (d.tags.includes('stopgap ramp')) {
    tags.push('stopgap_ramp');
  }
  if (d.tags.includes('spacious')) {
    tags.push('spacious');
  }
  if (d.tags.includes('sign language')) {
    tags.push('sign_language');
  }
  if (d.tags.includes('service animal friendly')) {
    tags.push('service_animal_friendly');
  }
  if (d.tags.includes('scent-free')) {
    tags.push('scent_free');
  }
  if (d.tags.includes('ramp')) {
    tags.push('ramp');
  }
  if (d.tags.includes('quiet')) {
    tags.push('quiet');
  }
  if (d.tags.includes('outdoor access only')) {
    tags.push('outdoor_access_only');
  }
  if (d.tags.includes('large print')) {
    tags.push('large_print');
  }

  if (tags.length === 0) {
    const randNum = Math.floor(Math.random() * 10) + 1; // 1 to 9

    if (randNum <= 6) {
      tags = coreTypes;
    } else {
      // seed some random tags
      for (let i = 1; i <= randNum; i++) {
        const randTag = types[Math.floor(Math.random() * 16)];
        if (!tags.includes(randTag)) {
          tags.push(randTag);
        }
      }
    }
  }

  return {
    name: d.name,
    address: d.address,
    latitude: d.latitude,
    longitude: d.longitude,
    tags,
  };
});

const fs = require('fs');

fs.writeFile('helpers/cccccleanData.js', JSON.stringify(cleanedData), (err) => {
  if (err) {
    throw err;
  }
  console.log('JSON data is saved.');
});

// INSERT INTO pins (creator_user_id, name, address, longitude, latitude) VALUES (1, d.name, d.address, d.longitude, d.latitude)

let str = '';
const makeSQLString = (cleanedData) => {
  const beginStr = `INSERT INTO pins (creator_user_id, name, address, longitude, latitude) VALUES `;

  for (let i = 0; i < cleanedData.length; i++) {
    str += `${beginStr}(1, "${cleanedData[i].name}", "${cleanedData[i].address}", ${cleanedData[i].longitude}, ${cleanedData[i].latitude})\n`;
  }
};
/*

makeSQLString(cleanedData);

fs.writeFile('sqlString.txt', str, (err) => {
  if (err) {
    throw err;
  }
  console.log('SQL string is saved.');
});
*/

///////////////////////////////////////////////////
/*
const cleanedData = data.map((d) => {
  return {
    name: d.name,
    address: d.address,
    latitude: d.latitude,
    longitude: d.longitude,
    tags: d.tags,
  };
});

console.log(cleanedData.length);*/
