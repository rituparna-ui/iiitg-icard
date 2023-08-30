const mongoose = require('mongoose');

const studs = require('./dummyData');
const Card = require('../../models/card');

mongoose
  .connect('mongodb://localhost:27017/icard')
  .then((result) => {
    studs.forEach(async (stud) => {
      const newCard = await Card.create({
        name: stud.fullName,
        programme: stud.programme,
        mode: stud.mode,
        roll: stud.roll,
        dateOfBirth: {
          day: stud.dateOfBirth.day,
          month: stud.dateOfBirth.month,
          year: stud.dateOfBirth.year,
        },
        presentAddress: stud.presentAddress,
        guardiansName: stud.guardiansName,
        permenantAddress: stud.permenantAddress,
        bloodGroup: stud.bloodGroup,
        emergencyContact: stud.emergencyContact,
        holdersContact: stud.holdersContact,
        email: stud.email,
        admissionYear: stud.admissionYear,
        type: stud.type,
      });
      console.log(newCard);
    });
  })
  .catch((err) => {
    console.log(err);
    process.exit(0);
  });
