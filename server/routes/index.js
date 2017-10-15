const Authentication = require('../controllers/authentication');
// const Itinerary = require('../controllers/itinerary');
// const Cities = require('../controllers/cities_lng_lat');

const passportService = require('../services/passport');
const passport = require('passport');

const requireAuth = passport.authenticate('jwt', { session: false });
const requireSignin = passport.authenticate('local', { session: false });

module.exports = function (app) {
  app.get('/', requireAuth, function (req, res) {
    res.send({ message: 'Token is valid' })
  });
  app.post('/api/v1/signin', requireSignin, Authentication.signin);
  app.post('/api/v1/signup', Authentication.signup);
  // app.post('/api/v1/cities_lng_lat', Cities.getLngLat);
      // --V What we did to save itineraries on user profiles 
  // app.post('/api/v1/save_itin', Itinerary.saveItinerary);
    // --V What we did to get itineraries saved on user profiles 
  // app.post('/api/v1/get_itin', Itinerary.readItinerary);
};
