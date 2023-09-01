const asyncHandler = require('express-async-handler');
const fs = require('fs');
const sharp = require('sharp');
const { Rembg } = require('rembg-node');

const Card = require('../models/card');

exports.getHome = asyncHandler(async (req, res, next) => {
  const card = await Card.findOne({ email: req.email });
  res.render('home', {
    card,
  });
});

exports.postSubmitCard = asyncHandler(async (req, res, next) => {
  const {
    fullName,
    programme,
    branch,
    mode,
    blood,
    day,
    month,
    year,
    guardian,
    emergency,
    contact,
    flatNoPermenant,
    localityPermenant,
    cityPermenant,
    statePermenant,
    pinPermenant,
    presentAddr,
    roll,
  } = req.body;
  const fullProgramme = programme.trim() + ' (' + branch.trim() + ')';
  const permenantAddress =
    flatNoPermenant +
    ', ' +
    localityPermenant +
    ', ' +
    cityPermenant +
    ', ' +
    statePermenant +
    '. PIN-' +
    pinPermenant;
  let presentAddress = '';
  if (presentAddr === 'boysHostel') {
    presentAddress = "Boys' Hostel, IIIT-Guwahati, Bongora, Guwahati-781015";
  } else if (presentAddr === 'girlsHostel') {
    presentAddress = "Girls' Hostel, IIIT-Guwahati, Bongora, Guwahati-781015";
  } else {
    presentAddress =
      req.body.flatNo +
      ', ' +
      req.body.locality +
      ', ' +
      req.body.city +
      ', ' +
      req.body.state +
      '. PIN-' +
      req.body.pin;
  }

  fs.rmSync('images/' + roll, { recursive: true, force: true });
  fs.mkdirSync('images/' + roll);
  fs.writeFileSync(
    'images/' + roll + '/' + roll + '_photo.png',
    req.files[0].buffer
  );
  fs.writeFileSync(
    'images/' + roll + '/' + roll + '_sign_org.png',
    req.files[1].buffer
  );

  const input = sharp('images/' + roll + '/' + roll + '_sign_org.png');
  const rembg = new Rembg({
    logging: true,
  });
  const output = await rembg.remove(input);
  await output.png().toFile('images/' + roll + '/' + roll + '_sign.png');

  const card = await Card.create({
    name: fullName.trim(),
    programme: fullProgramme,
    mode,
    roll,
    bloodGroup: blood,
    dateOfBirth: {
      day,
      month,
      year,
    },
    guardiansName: guardian,
    emergencyContact: emergency,
    holdersContact: contact,
    email: req.email,
    permenantAddress,
    presentAddress,
    admissionYear: +roll.substring(0, 2),
    type: +roll.substring(3, 4),
  });
  return res.redirect('/');
});
