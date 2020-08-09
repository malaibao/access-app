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

const filterType = (types) => {
  if (
    types.includes("bar") ||
    types.includes("cafe") ||
    types.includes("restaurant")
  ) {
    return "Restaurant";
  } else if (types.includes("park")) {
    return "Park";
  } else if (types.includes("tourist_attraction") || types.includes("museum")) {
    return "Tourist Attraction";
  } else if (types.includes("movie_theater")) {
    return "Entertainment";
  } else if (types.includes("university") || types.includes("college")) {
    return "School";
  } else if (
    types.includes("grocery_or_supermarket") ||
    types.includes("pharmacy")
  ) {
    return "Grocery";
  } else if (
    types.includes("furniture_store") ||
    types.includes("store") ||
    types.includes("shopping_mall")
  ) {
    return "Shopping";
  } else {
    return "Entertainment";
  }
};

module.exports = { categoryMajority, filterType };
