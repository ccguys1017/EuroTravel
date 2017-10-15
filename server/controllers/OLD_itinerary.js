// const Itin = require('../models/itinerary');

// exports.saveItinerary = function (req, res, next) {

//     const email = req.body.user_email;
//     const name = req.body.cb_name;
//     const place_id = req.body.cb_place_id;
//     const price_level = req.body.cb_price_level;
//     const rating = req.body.cb_rating;
//     const type = req.body.cb_type;
//     const vicinity = req.body.cb_vicinity;

//     // See if a Itin with the given place_id exists
//     Itin.findOne({ email: email, place_id: place_id }, function (err, existingItin) {
//       if (err) { return next(err) }
  
//       // If a Itin with place_id does exist, return an error
//       if (existingItin) {
//         return res.status(422).send({ error: 'Itinerary for this place already exists' })
//       }
  
//       // If a user with place_id does NOT exist, create and save user itinerary record
//       const itin = new Itin({
//         email:email,
//         name: name,
//         place_id: place_id,
//         price_level: price_level,
//         rating: rating,
//         type: type,
//         vicinity: vicinity
//       });
  
//       itin.save(function (err) {
//         if (err) { return next(err) }
//       });
//     })
// };

// exports.readItinerary = function(req, res, next) {
//   const email = req.body.user_email;
//   Itin.aggregate(
//     [
//       {
//         $match: { email : email }
//       }
//     ]).sort({ updatedAt: -1 })
//     .then(function(savedItin) {
//       console.log(savedItin);
//       res.send({ payload: savedItin })
//     })
//     .catch(function(err) {
//       res.send("the user saved itinerary lookup failed");
//     });
// };
