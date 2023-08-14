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
    enum: [
      'B.Tech (CSE)',
      'B.Tech (ECE)',
      'M.Tech (CSE)',
      'M.Tech (ECE)',
      'PhD. (CSE)',
      'PhD. (ECE)',
      'PhD. (HSS)',
      'PhD. (Maths)',
    ],
  },
  mode: {
    type: String,
    required: true,
    enum: ['on-campus', 'online', 'full-time', 'part-time', 'N/A'],
  },
  roll: {
    type: String,
    required: true,
  },
  dateOfBirth: {
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
  admissionYear: {
    type: Number,
    required: true,
  },
  type: {
    type: Number,
    required: true,
    enum: [1, 2, 3],
  },
  approved: {
    type: Boolean,
    required: true,
    default: false,
  },
});

module.exports = mongoose.model('Card', cardSchema);
