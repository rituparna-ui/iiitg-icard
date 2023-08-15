const pdf = require('pdf-creator-node');
const fs = require('fs');
const html = fs.readFileSync('template.html', 'utf8');

const options = {
  format: 'A4',
  orientation: 'portrait',
};

var document = {
  html: html,
  data: {},
  path: './output.pdf',
  type: '',
};
pdf
  .create(document, {
    ...options,
    childProcessOptions: {
      env: {
        OPENSSL_CONF: '/dev/null',
      },
    },
  })
  .then((res) => {
    console.log(res);
  })
  .catch((error) => {
    console.error(error);
  });
