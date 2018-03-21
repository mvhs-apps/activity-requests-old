let express = require('express');
let router = express.Router();

router.get('/', (req, res) => {
  res.render('index');
});

router.get('/new', (req, res) => {
  res.render('new');
});

let sendEmail = (email, type, id) => {
  if (email && type && id) {
    let emailValidator = require('email-validator');

    let trackingLink = 'localhost:8000/track?id=' + id;
    let message = '';
    let subject = '';
    if (type === 'confirmation') {
      message = 'Hello!\n\nThank you for submitting a fundraising form! Your tracking' +
          'code is ' + id + '. Follow this link ' + trackingLink + ' to track the status' +
          'of your application.';
    }
    let send = require('gmail-send')({
      user: process.env.GMAIL_USERNAME,
      pass: process.env.GMAIL_PASSWORD,
      to: email,
      subject: subject,
      text: message
    });

    // Override any default option and send email
    send({}, function(err, response) {
      if (!err) {
        res.status(200).send({response: response});
      } else {
        res.status(400).send({error: err});
      }
    });
  }
};

module.exports = router;
