// grab the things we need
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create a City schema
const citySchema = new Schema({
  city_ascii: String,
  lat: Number,
  lng: Number,
  country: String
});

let Cities = mongoose.model('cities_lng_lat', citySchema);

module.exports = Cities;
