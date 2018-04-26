
let mongoose = require('mongoose');
// SCHEMA SETUP, Mongoose model config
const customerSchema = new mongoose.Schema({
  name: String,
  last: String,
  middle: String,
  email: String,
  phone: String,
  company: String,
  typeOfBusiness: String,
  address_1: String,
  address_2: String,
  city: String,
  state: String,
  zip: Number,
  notes: String,
  created: {type: Date, default: Date.now}
});

module.exports = mongoose.model('Customer', customerSchema);