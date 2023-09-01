const mailer = require('./../utils/mail');

mailer('rwarwatkar@gmail.com', 'Reg. I-CARD', '<h1>Test</h1>')
  .then((result) => {
    console.log(result);
  })
  .catch((err) => {
    console.log(err);
  });
