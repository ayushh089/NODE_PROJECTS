const request = require("postman-request");
const geocoding = (address, callback) => {
  const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${address}.json?access_token=pk.eyJ1IjoiZ3VwdGFheXVzaDEyODAiLCJhIjoiY2xzYWcxZ2J3MDNjYjJxbzZjeWhvYW9wNCJ9.pOpVyUlEONM0GJZRKcKHog&limit=1`;
  request({url, json: true }, (error, {body}) => {
    if (error) {
      callback("Unable to connect to server !!", undefined);
    } else if (body.features.length === 0) {
      callback("City Not found", undefined);
    } else {
      callback(undefined, {
        latitude:body.features[0].center[1],
        longitude:body.features[0].center[0],
        place:body.features[0].place_name,
      });
    }
  });
};
module.exports = geocoding;
