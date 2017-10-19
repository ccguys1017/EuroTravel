// grab the things we need
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create a City schema
const citySchema = new Schema(
  {
    city_ascii: {
      type: String,
      required: true
    },
    lat: {
      type: Number,
      required: true
    },
    lng: {
      type: Number,
      required: true
    },
    country: {
      type: String,
      required: true
    }
  }, 
  {
    versionKey: false
  }
);

let Cities = mongoose.model('cities_lon_lat', citySchema, 'cities_lon_lat');

module.exports = Cities;
