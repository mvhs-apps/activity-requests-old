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

router.post('/');

let sendEmail = (params) => {
  if (params.to && params.subject && params.html) {
    let send = mailer({
      user: process.env.GMAIL_USERNAME,
      pass: process.env.GMAIL_PASSWORD,
      from: 'MVHS ASB Approvals',
      to: params.to,
      subject: params.subject,
      html: params.html,
    });

    // Override any default option and send email
    send({}, function(err, response) {
      if (!err) {
        // res.status(200).send({response: response});
      } else {
        console.error('error ' + err);
        // res.status(400).send({error: err});
      }
    });
  }
};

module.exports = router;
