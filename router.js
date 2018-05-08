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

router.get('/allForms', (req, res) => {
  res.render('allForms');
});

router.get('/approve', (req, res) => {
  res.render('approve');
});

router.get('/reject', (req, res) => {
  res.render('reject');
});

router.post('/email', (req, res) => {
  console.log('sending');
  console.log('recipient: : ' + req.body.recipient);
  console.log('subjuect: : ' + req.body.subject);
  console.log('message: : ' + req.body.message);
  mailer.sendMail({
    recipient: req.body.recipient,
    subject: req.body.subject,
    messageHTML: req.body.message
  }).then(() => {
    console.log('successfully sent');
  }).catch((err) => {
    console.error('error ' + err);
  });
});

router.post('/');

module.exports = router;
