const mongoose = require('mongoose');

const studs = require('./dummy');
const card = require('../../models/card');

mongoose
  .connect('mongodb://localhost:27017/icard')
  .then((result) => {
    studs.forEach(async (stud) => {
      const newCard = await card.create(stud);
      console.log(newCard);
    });
  })
  .catch((err) => {
    console.log(err);
    process.exit(0);
  });
