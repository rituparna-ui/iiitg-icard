const asyncHandler = require('express-async-handler');

const Card = require('./../../models/card');

exports.getBtechEntries = asyncHandler(async (req, res, next) => {
  const years = await Card.distinct('admissionYear', { type: 1 });
  const data = [];
  for (let i = 0; i < years.length; i++) {
    const count = await Card.countDocuments({
      type: 1,
      admissionYear: years[i],
    });
    data.push({ year: years[i], count });
  }
  res.render('admin/year-wise', {
    degreeFormatted: 'B.Tech',
    degree: 'btech',
    email: req.email,
    years,
    data,
  });
});

exports.getMtechOncampusEntries = asyncHandler(async (req, res, next) => {
  const years = await Card.distinct('admissionYear', {
    type: 2,
    mode: 'on-campus',
  });
  const data = [];
  for (let i = 0; i < years.length; i++) {
    const count = await Card.countDocuments({
      type: 2,
      mode: 'on-campus',
      admissionYear: years[i],
    });
    data.push({ year: years[i], count });
  }
  res.render('admin/year-wise', {
    degreeFormatted: 'M.Tech On-Campus',
    degree: 'mtech-oncampus',
    email: req.email,
    years,
    data,
  });
});

exports.getMtechOnlineEntries = asyncHandler(async (req, res, next) => {
  const years = await Card.distinct('admissionYear', {
    type: 2,
    mode: 'online',
  });
  const data = [];
  for (let i = 0; i < years.length; i++) {
    const count = await Card.countDocuments({
      type: 2,
      mode: 'online',
      admissionYear: years[i],
    });
    data.push({ year: years[i], count });
  }
  res.render('admin/year-wise', {
    degreeFormatted: 'M.Tech Online',
    degree: 'mtech-online',
    email: req.email,
    years,
    data,
  });
});

exports.getPhdFullTimeEntries = asyncHandler(async (req, res, next) => {
  const years = await Card.distinct('admissionYear', {
    type: 3,
    mode: 'full-time',
  });
  const data = [];
  for (let i = 0; i < years.length; i++) {
    const count = await Card.countDocuments({
      type: 3,
      mode: 'full-time',
      admissionYear: years[i],
    });
    data.push({ year: years[i], count });
  }
  res.render('admin/year-wise', {
    degreeFormatted: 'PhD. Full Time',
    degree: 'phd-full-time',
    email: req.email,
    years,
    data,
  });
});

exports.getPhdPartTimeEntries = asyncHandler(async (req, res, next) => {
  const years = await Card.distinct('admissionYear', {
    type: 3,
    mode: 'part-time',
  });
  const data = [];
  for (let i = 0; i < years.length; i++) {
    const count = await Card.countDocuments({
      type: 3,
      mode: 'part-time',
      admissionYear: years[i],
    });
    data.push({ year: years[i], count });
  }
  res.render('admin/year-wise', {
    degreeFormatted: 'PhD. Part Time',
    degree: 'phd-part-time',
    email: req.email,
    years,
    data,
  });
});
