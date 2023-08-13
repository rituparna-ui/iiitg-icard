const Card = require('../models/card');

exports.getHome = async (req, res, next) => {
  const card = await Card.findOne({ email: req.email });
  res.render('home', {
    card,
  });
};
