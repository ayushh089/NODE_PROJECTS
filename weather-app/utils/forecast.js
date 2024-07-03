const request = require("postman-request");
const forecast = (longitude, latitude, callback) => {
  const url = `http://api.weatherstack.com/current?access_key=fb6cdae7f6d102b0bf7b5d9b4e0855d8&query=${latitude},${longitude}`;
  request({ url, json: true }, (error, { body }) => {
    // request({ url: url, json: true }, (error, response) => { url:url->url
    if (error) {
      callback("Unable to connect to server !!", undefined);
    } else if (body.error) {
      callback("Unable to find City !!", undefined);
    } else {
      const temp = body.current.temperature;
      const feelslike = body.current.feelslike;
      const city = body.location.name;
      callback(
        undefined,
        // console.log(url)
        `In ${city} It is ${temp} degree C in. It feels like ${feelslike} degrees C out.`
      );
    }
  });
};
module.exports = forecast;
