const axios = require("axios");

async function getCoordinates(location, maptilerKey) {
  const url = `https://api.maptiler.com/geocoding/${encodeURIComponent(
    location
  )}.json?key=${maptilerKey}`;
  const response = await axios.get(url);
  if (response.data.features && response.data.features.length > 0) {
    return response.data.features[0].center; // [lng, lat]
  }
  return null;
}


module.exports = { getCoordinates };
