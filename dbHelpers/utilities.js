const categoryMajority = (ratings) => {
  const calObj = {};

  for (let rating of ratings) {
    for (key of Object.keys(rating)) {
      if (rating[key]) {
        if (calObj[key]) {
          calObj[key] += 1;
        } else {
          calObj[key] = 1;
        }
      }
    }
  }

  const tags = [];
  for (let key of Object.keys(calObj)) {
    if (calObj[key] / ratings.length > 0.5) {
      tags.push(key);
    }
  }
  return tags;
};

module.exports = { categoryMajority };
