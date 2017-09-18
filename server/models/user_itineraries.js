// grab the things we need
var mongoose = require("mongoose");
var Schema = require("mongoose").Schema;

// create a Itinerary schema
var ItinSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true
    },
    itinerary: {
      type: String
    }
  },
  {
    timestamps: true
  }
);

var Itinerary = mongoose.model(
  "user_itineraries",
  ItinSchema
); //Use the itinerary Schema

module.exports = Itinerary;
