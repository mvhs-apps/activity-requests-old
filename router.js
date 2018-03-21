let express = require('express');
let router = express.Router();
const mailer = require('gmail-send');

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
  var id = 'asdfasdf';
  sendEmail({
    to: 'ajpat1234@gmail.com',
    subject: 'Hello sd!',
    html: `Some  smessage goes here: ${id}`
  });
});

router.post('/')

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
