// const City = require('../models/cities_lng_lat');

// exports.getLngLat = function (req, res, next) {
//   const city = req.body.city;
//   const country = req.body.country;
//   console.log('API city: ' + city);
//   console.log('API country: '+ country);
//   // See if a city/country exists in the DB
//   City.find({ city_ascii : city, country : country })
//     .then(function(cityCountry) {
//       console.log('DB accessed');
//       console.log(cityCountry);
//       res.send({ 
//         payload : cityCountry
//        });
//     })
//     .catch(function(err) {
//         console.log('DB not accessed');
//         return next(err);
//     });
// }
