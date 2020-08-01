const { data } = require('./data');

const cleanedData = data.map((d) => {
  return {
    name: d.name,
    address: d.address,
    latitude: d.latitude,
    longitude: d.longitude,
    tags: d.tags,
  };
});

console.log(cleanedData.length);

const fs = require('fs');

// fs.writeFile('cleanedData.json', JSON.stringify(cleanedData), (err) => {
//   if (err) {
//     throw err;
//   }
//   console.log('JSON data is saved.');
// });

// INSERT INTO pins (creator_user_id, name, address, longitude, latitude) VALUES (1, d.name, d.address, d.longitude, d.latitude)

let str = '';
const makeSQLString = (cleanedData) => {
  const beginStr = `INSERT INTO pins (creator_user_id, name, address, longitude, latitude) VALUES `;

  for (let i = 0; i < cleanedData.length; i++) {
    str += `${beginStr}(1, "${cleanedData[i].name}", "${cleanedData[i].address}", ${cleanedData[i].longitude}, ${cleanedData[i].latitude})\n`;
  }
};

makeSQLString(cleanedData);

fs.writeFile('sqlString.txt', str, (err) => {
  if (err) {
    throw err;
  }
  console.log('SQL string is saved.');
});
