var mongoose = require('mongoose');
var UserSchema = new mongoose.Schema({
  name: String,
  email: String,
  phone: String,
  address_1: String,
  address_2: String,
  city: String,
  state: String,
  country: String,
  postalCode: String,
  latitude: Number,
  longitude: Number,
  description: String,
  hours: [
    {
      day: {
        type: String,
        enum: [
          'SUNDAY',
          'MONDAY',
          'TUESDAY',
          'WEDNESDAY',
          'THURSDAY',
          'FRIDAY',
          'SATURDAY'
        ]
      },
      start: String,
      end: String
    }
  ],
  availableTo: [
    {
      type: String,
      enum: ['MEN', 'WOMEN', 'TEENS', 'CHILDREN', 'FAMILIES', 'PETS', 'COUPLES']
    }
  ],
  services: [
    {
      type: String,
      enum: [
        'SHELTER',
        'DROPIN',
        'HEALTHCARE',
        'MEALS',
        'ADDICTION',
        'CLOTHING'
      ]
    }
  ],
  bestTimeToCall: String
});
mongoose.model('Service', UserSchema);

module.exports = mongoose.model('Service');
