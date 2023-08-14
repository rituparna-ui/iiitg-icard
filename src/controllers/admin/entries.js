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

exports.getBtechBatchwise = asyncHandler(async (req, res, next) => {
  const { year } = req.params;

  const approved = await Card.countDocuments({
    type: 1,
    admissionYear: year,
    approved: true,
  });

  const pending = await Card.countDocuments({
    type: 1,
    admissionYear: year,
    approved: false,
  });

  res.render('admin/batchwise', {
    year,
    degreeFormatted: 'B.Tech',
    degree: 'btech',
    email: req.email,
    approved,
    pending,
  });
});
exports.getMtechOncampusBatchwise = asyncHandler(async (req, res, next) => {
  const { year } = req.params;

  const approved = await Card.countDocuments({
    type: 2,
    admissionYear: year,
    mode: 'on-campus',
    approved: true,
  });

  const pending = await Card.countDocuments({
    type: 2,
    admissionYear: year,
    mode: 'on-campus',
    approved: false,
  });

  res.render('admin/batchwise', {
    year,
    degreeFormatted: 'M.Tech On-Campus',
    email: req.email,
    degree: 'mtech-oncampus',
    approved,
    pending,
  });
});
exports.getMtechOnlineBatchwise = asyncHandler(async (req, res, next) => {
  const { year } = req.params;

  const approved = await Card.countDocuments({
    type: 2,
    admissionYear: year,
    mode: 'online',
    approved: true,
  });

  const pending = await Card.countDocuments({
    type: 2,
    admissionYear: year,
    mode: 'online',
    approved: false,
  });

  res.render('admin/batchwise', {
    year,
    degreeFormatted: 'M.Tech On-Campus',
    email: req.email,
    degree: 'mtech-online',
    approved,
    pending,
  });
});
exports.getPhdFullTimeBatchwise = asyncHandler(async (req, res, next) => {
  const { year } = req.params;

  const approved = await Card.countDocuments({
    type: 3,
    admissionYear: year,
    mode: 'full-time',
    approved: true,
  });

  const pending = await Card.countDocuments({
    type: 3,
    admissionYear: year,
    mode: 'full-time',
    approved: false,
  });

  res.render('admin/batchwise', {
    year,
    degreeFormatted: 'Phd. Full Time',
    email: req.email,
    degree: 'phd-full-time',
    approved,
    pending,
  });
});
exports.getPhdPartTimeBatchwise = asyncHandler(async (req, res, next) => {
  const { year } = req.params;

  const approved = await Card.countDocuments({
    type: 3,
    admissionYear: year,
    mode: 'part-time',
    approved: true,
  });

  const pending = await Card.countDocuments({
    type: 3,
    admissionYear: year,
    mode: 'part-time',
    approved: false,
  });

  res.render('admin/batchwise', {
    year,
    degreeFormatted: 'Phd. Part Time',
    email: req.email,
    degree: 'phd-part-time',
    approved,
    pending,
  });
});

exports.getBtechBatchwiseApproved = asyncHandler(async (req, res, next) => {
  const { year } = req.params;

  const approved = await Card.find({
    type: 1,
    admissionYear: year,
    approved: true,
  });

  res.render('admin/card-list-approved', {
    year,
    degreeFormatted: 'B.Tech',
    degree: 'btech',
    email: req.email,
    approved,
  });
});
exports.getBtechBatchwisePending = asyncHandler(async (req, res, next) => {
  const { year } = req.params;

  const pending = await Card.find({
    type: 1,
    admissionYear: year,
    approved: false,
  });

  res.render('admin/card-list-pending', {
    year,
    degreeFormatted: 'B.Tech',
    degree: 'btech',
    email: req.email,
    pending,
  });
});
exports.getMtechOncampusBatchwiseApproved = asyncHandler(
  async (req, res, next) => {
    const { year } = req.params;

    const approved = await Card.find({
      type: 2,
      admissionYear: year,
      mode: 'on-campus',
      approved: true,
    });

    res.render('admin/card-list-approved', {
      year,
      degreeFormatted: 'M.Tech On-Campus',
      email: req.email,
      degree: 'mtech-oncampus',
      approved,
    });
  }
);
exports.getMtechOncampusBatchwisePending = asyncHandler(
  async (req, res, next) => {
    const { year } = req.params;

    const pending = await Card.find({
      type: 2,
      admissionYear: year,
      mode: 'on-campus',
      approved: false,
    });

    res.render('admin/card-list-pending', {
      year,
      degreeFormatted: 'M.Tech On-Campus',
      email: req.email,
      degree: 'mtech-oncampus',
      pending,
    });
  }
);
exports.getMtechOnlineBatchwiseApproved = asyncHandler(
  async (req, res, next) => {
    const { year } = req.params;

    const approved = await Card.find({
      type: 2,
      admissionYear: year,
      mode: 'online',
      approved: true,
    });

    res.render('admin/batchwise', {
      year,
      degreeFormatted: 'M.Tech On-Campus',
      email: req.email,
      degree: 'mtech-online',
      pending,
    });
  }
);
exports.getMtechOnlineBatchwisePending = asyncHandler(
  async (req, res, next) => {
    const { year } = req.params;

    const pending = await Card.find({
      type: 2,
      admissionYear: year,
      mode: 'online',
      approved: false,
    });

    res.render('admin/batchwise', {
      year,
      degreeFormatted: 'M.Tech On-Campus',
      email: req.email,
      degree: 'mtech-online',
      pending,
    });
  }
);
exports.getPhdFullTimeBatchwiseApproved = asyncHandler(
  async (req, res, next) => {
    const { year } = req.params;

    const approved = await Card.find({
      type: 3,
      admissionYear: year,
      mode: 'full-time',
      approved: true,
    });

    res.render('admin/batchwise', {
      year,
      degreeFormatted: 'Phd. Full Time',
      email: req.email,
      degree: 'phd-full-time',
      approved,
    });
  }
);
exports.getPhdFullTimeBatchwisePending = asyncHandler(
  async (req, res, next) => {
    const { year } = req.params;

    const pending = await Card.find({
      type: 3,
      admissionYear: year,
      mode: 'full-time',
      approved: false,
    });

    res.render('admin/batchwise', {
      year,
      degreeFormatted: 'Phd. Full Time',
      email: req.email,
      degree: 'phd-full-time',
      pending,
    });
  }
);
exports.getPhdPartTimeBatchwiseApproved = asyncHandler(
  async (req, res, next) => {
    const { year } = req.params;

    const approved = await Card.find({
      type: 3,
      admissionYear: year,
      mode: 'part-time',
      approved: true,
    });

    res.render('admin/batchwise', {
      year,
      degreeFormatted: 'Phd. Part Time',
      email: req.email,
      degree: 'phd-part-time',
      approved,
    });
  }
);
exports.getPhdPartTimeBatchwisePending = asyncHandler(
  async (req, res, next) => {
    const { year } = req.params;

    const pending = await Card.find({
      type: 3,
      admissionYear: year,
      mode: 'part-time',
      approved: false,
    });

    res.render('admin/batchwise', {
      year,
      degreeFormatted: 'Phd. Part Time',
      email: req.email,
      degree: 'phd-part-time',
      pending,
    });
  }
);
