const { Canvas } = require('canvas');
const JsBarcode = require('jsbarcode');

const canvas = new Canvas();

JsBarcode(canvas, '2001162', {
  width: 1,
  height: 20,
  displayValue: false,
  margin: 10,
  background: 'white',
});

canvas.toDataURL('image/png', (err, png) => {
  console.log(png);
});
