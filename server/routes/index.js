const Authentication = require('../controllers/authentication');
//const Authentication = require('../controllers/itineraries');
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
  //app.get('/api/v1/itineraries', getItineraries);
  //app.post('/api/v1/iteraries', saveItinerary);
};
