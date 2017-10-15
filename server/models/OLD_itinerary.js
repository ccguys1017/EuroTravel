/*
  I kept this as an example of how to save things, like itineraries, or hair styles, user profile pictures, posts, etc, to users data

*/

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
    }
  },
  {
    timestamps: true
  }
);

let Itineraries = mongoose.model('user_itineraries', ItinSchema);

module.exports = Itineraries;
