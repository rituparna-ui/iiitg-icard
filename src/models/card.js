const mongoose = require('mongoose');

const dateSchema = new mongoose.Schema({
  day: {
    type: Number,
    required: true,
    min: 1,
    max: 31,
  },
  month: {
    type: Number,
    required: true,
    min: 1,
    max: 12,
  },
  year: {
    type: Number,
    required: true,
  },
});

const cardSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  programme: {
    type: String,
    required: true,
    enum: ['B.Tech (CSE)', 'B.Tech (ECE)', 'M.Tech (CSE)', 'M.Tech (ECE)'],
  },
  roll: {
    type: String,
    required: true,
  },
  dateOfBirth: {
    type: dateSchema,
    required: true,
  },
  validUpto: {
    type: dateSchema,
    required: true,
  },
  presentAddress: {
    type: String,
    required: true,
  },
  guardiansName: {
    type: String,
    required: true,
  },
  permenantAddress: {
    type: String,
    required: true,
  },
  bloodGroup: {
    type: String,
    required: true,
    enum: ['A+', 'A-', 'B+', 'B-', 'O+', 'O-', 'AB+', 'AB-'],
  },
  emergencyContact: {
    type: String,
    required: true,
  },
  holdersContact: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    unique: true,
    index: true,
    required: true,
  },
});

module.exports = mongoose.model('Card', cardSchema);
