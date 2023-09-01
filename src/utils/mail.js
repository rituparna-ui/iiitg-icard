const nodemailer = require('nodemailer');

const refreshToken =
  '1//04_JfslsLoaajCgYIARAAGAQSNwF-L9IrcQYtkqWi0b90RBiPGPSJctQ6_eyQYvyDd2T3tDF0RcwGxZLOnHe7fNYgi4ognFkAO2Y';
const accessToken =
  'ya29.a0AfB_byBTYOr_U1dH37ejgwcwdxaE31gOWGjBKjl4_70Rtyv5uoywDoXyuRHUO8x_t3pqMD-eU_jJqBimw1FdbYjHySVBe0-Ee1-vgUoBX0EW8dr6dDUIQooiSa57vVAbQgrUjLy0oszNbHLwZBW5NXu64ucnSefEFnMvbwaCgYKARMSARESFQHsvYls5Rd1k8a8J0GwQKvEfulM-A0173';
const clientId =
  '533727701745-2jjh670jk35qsbb6rmarrfla0gn5gh35.apps.googleusercontent.com';
const clientSecret = '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';

const transport = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    type: 'OAuth2',
    accessToken,
    refreshToken,
    clientId,
    clientSecret,
    user: 'rituw1610@gmail.com',
  },
});

module.exports = (to, subject, html) => {
  return new Promise((res, rej) => {
    transport
      .sendMail({
        from: '"IIIT-G I-CARD" rituw1610@gmail.com',
        to,
        subject,
        html,
      })
      .then(() => {
        res('Mail Sent');
      })
      .catch((e) => {
        console.log(e);
        rej('Error Mailing');
      });
  });
};
