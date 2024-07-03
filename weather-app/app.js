const geocoding = require("./utils/geocoding");
const forecast = require("./utils/forecast");
const address = process.argv[2];
if (!address) {
  console.log("City Not Found!!");
} else {
  // geocoding(process.argv[2], (error, data) => {
  geocoding(address, (error, { latitude, longitude, place } = {}) => {
    if (error) {
      return console.log(error);
    }
    forecast(longitude, latitude, (error, forecastData) => {
      //longi,latitude
      if (error) {
        return console.log(error);
      }
      console.log(place);
      console.log(forecastData);
    });
  });
}
