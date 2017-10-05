const City = require('../models/cities_lng_lat');

exports.getLngLat = function (req, res, next) {
  const city = req.body.city;
  const country = req.body.country;
  // See if a city/country exists in the DB
  City.find({ city_ascii : city, country : country })
    .then(function(cityCountry) {
      res.send({ 
        payload : cityCountry
       });
    })
    .catch(function(err) {
        return next(err);
    });
}
