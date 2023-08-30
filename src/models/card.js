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

cardSchema.virtual('dob').get(function () {
  return (
    this.dateOfBirth.day.toLocaleString({}, { minimumIntegerDigits: 2 }) +
    '/' +
    this.dateOfBirth.month.toLocaleString({}, { minimumIntegerDigits: 2 }) +
    '/' +
    this.dateOfBirth.year
  );
});

cardSchema.virtual('issueNo').get(function () {
  const roll = this.roll;
  // 1901xxx UG
  // 1902xxx PG
  // 1903xxx RS
  let ret = '';
  switch (roll[3]) {
    case '1':
      ret += 'UG/';
      break;

    case '2':
      ret += 'PG/';
      break;

    case '3':
      ret += 'PhD/';
      break;

    default:
      break;
  }

  ret += '20' + roll[0] + roll[1] + '/';
  ret += roll;
  return ret;
});

cardSchema.virtual('validity').get(function () {
  let ret = '30/06/';

  if (this.programme.startsWith('B')) {
    ret += this.admissionYear + 4 + 2000;
  } else if (this.programme.startsWith('M')) {
    ret += this.admissionYear + 2 + 2000;
  } else if (this.programme.startsWith('P')) {
    ret += this.admissionYear + 8 + 2000;
  }

  return ret;
});

cardSchema.virtual('emergencyContactFormatted').get(function () {
  let ret = '+91 ';
  ret += this.emergencyContact.substring(0, 5) + ' ';
  ret += this.emergencyContact.substring(5, 10);
  return ret;
});

cardSchema.virtual('holdersContactFormatted').get(function () {
  let ret = '+91 ';
  ret += this.holdersContact.substring(0, 5) + ' ';
  ret += this.holdersContact.substring(5, 10);
  return ret;
});

cardSchema.virtual('programmeFormatted').get(function () {
  if (this.mode === 'online') {
    return this.programme + ' Online';
  } else if (this.mode === 'part-time') {
    return this.programme + ' Part Time';
  } else {
    return this.programme;
  }
});

module.exports = mongoose.model('Card', cardSchema);
