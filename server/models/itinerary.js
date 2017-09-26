// grab the things we need
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create a City schema
const ItinSchema = new Schema({
  name: String,
  place_id: String,
  price_level: Number,
  rating: Number,
  vicinity: String
});

let Itineraries = mongoose.model('user_itineraries', ItinSchema);

module.exports = Itineraries;
