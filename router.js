let express = require('express');
let router = express.Router();
const mailer = require('./mailer');

router.get('/', (req, res) => {
  res.render('index');
});

router.get('/form', (req, res) => {
  res.render('form');
});

router.get('/track', (req, res) => {
  res.render('track');
});

router.get('/trackForm', (req, res) => {
  res.render('trackForm');
});

router.post('/email', (req, res) => {
  console.log('sending');
  let id = 'asdfasdf';
  mailer.sendMail({
    recipient: 'marc.bacvanski@gmail.com',
    subject: 'Hello sd!',
    messageHTML: `Some message goes here: ${id}`,
  }).then(() => {
    console.log('successfully sent');
  }).catch((err) => {
    console.error('error ' + err);
  });
});

module.exports = router;
