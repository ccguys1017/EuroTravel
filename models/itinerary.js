// grab the things we need
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create a Saved Itineraries schema
const ItinSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true
    },
    name: {
      type: String,
      required: true,
    },
    place_id: {
      type: String,
      required: true,
      unique: true
    },
    price_level: {
      type: Number
    },
    rating: {
      type: Number
    },
    type: {
      type: String,
      required: true
    },
    vicinity: {
      type: String,
      required: true
    },
    city: {
      type: String,
      required: true
    },
    country: {
      type: String,
      required: true
    },
    photo: {
      type: String
    }
  },
  {
    timestamps: true
  }
);

let Itineraries = mongoose.model('user_itineraries', ItinSchema);

module.exports = Itineraries;
