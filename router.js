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

router.get('/asb', (req, res) => {
  res.render('asb');
});

router.post('/email', (req, res) => {
  console.log('sending');
  console.log('recipient: : ' + req.body.recipient);
  console.log('subjuect: : ' + req.body.subject);
  console.log('message: : ' + req.body.message);
  mailer.sendMail({
    recipient: req.body.recipient,
    subject: req.body.subject,
    messageHTML: req.body.message,
  }).then(() => {
    console.log('successfully sent');
  }).catch((err) => {
    console.error('error ' + err);
  });
});

router.post('/submit_form', (req, res) => {

  let formObject = JSON.parse(req.body.form_data);

  let studentEmail = mailer.sendMail({
    recipient: formObject.general.student_email,
    subject: 'Confirmation for submitting your approval',
    messageHTML: '<div style="width: 900px; background-color: gray">You have submitted an approval, you can track it\'s progress here: <a href=\'https://mvhs-approvals.herokuapp.com/track\'>https://mvhs-approvals.herokuapp.com/track</a> using the id: \'' +
    formObject.id_num + '\'' + '</div>',
  });
  let advisorEmail = mailer.sendMail({
    recipient: formObject.general.advisor_email,
    subject: 'A student is requesting your approval',
    messageHTML: '<div style="width: 900px; background-color: gray">' + formObject.general.student_name +
    ' has submitted an approval for ' + formObject.general.club_name +
    '. Please accept or reject the approval below.<br /><button style="background-color: green"><a href=\'https://mvhs-approvals.herokuapp.com/approve?' +
    formObject.id_num +
    '?clubAdvisor\'>Accept</a></button><button><a href=\'https://mvhs-approvals.herokuapp.com/reject?' +
    formObject.id_num + '?clubAdvisor\'>Reject</a></button>' + '</div>',
  });
  let cafeterialEmail = (formObject.campus.cafeteria === true)
      ? mailer.sendMail({
        recipient: 'paran.sonthalia@gmail.com',
        subject: 'A student is requesting your approval for use of the Cafeteria',
        messageHTML: formObject.general.student_name +
        ' has submitted an approval for ' + formObject.general.club_name +
        '. Please accept or reject the approval below.<br /><button><a href=\'https://mvhs-approvals.herokuapp.com/approve?' +
        formObject.id_num +
        '?cafeteria\'>Accept</a></button><button><a href=\'https://mvhs-approvals.herokuapp.com/reject?' +
        formObject.id_num + '?cafeteria\'>Reject</a></button>',
      })
      : Promise.resolve();
  let gymEmail = (formObject.campus.gym === true)
      ? mailer.sendMail({
        recipient: 'paran.sonthalia@gmail.com',
        subject: 'A student is requesting your approval for use of the Gym',
        messageHTML: formObject.general.student_name +
        ' has submitted an approval for ' + formObject.general.club_name +
        '. Please accept or reject the approval below.<br /><button><a href=\'https://mvhs-approvals.herokuapp.com/approve?' +
        formObject.id_num +
        '?gym\'>Accept</a></button><button><a href=\'https://mvhs-approvals.herokuapp.com/reject?' +
        formObject.id_num + '?gym\'>Reject</a></button>',
      })
      : Promise.resolve();
  let libraryEmail = (formObject.campus.library === true)
      ? mailer.sendMail({
        recipient: 'paran.sonthalia@gmail.com',
        subject: 'A student is requesting your approval for use of the library',
        messageHTML: formObject.general.student_name +
        ' has submitted an approval for ' + formObject.general.club_name +
        '. Please accept or reject the approval below.<br /><button><a href=\'https://mvhs-approvals.herokuapp.com/approve?' +
        formObject.id_num +
        '?library\'>Accept</a></button><button><a href=\'https://mvhs-approvals.herokuapp.com/reject?' +
        formObject.id_num + '?library\'>Reject</a></button>',
      })
      : Promise.resolve();
  let cccEmail = (formObject.campus.ccc === true)
      ? mailer.sendMail({
        recipient: 'paran.sonthalia@gmail.com',
        subject: 'A student is requesting your approval for use of the College and Career Center',
        messageHTML: formObject.general.student_name +
        ' has submitted an approval for ' + formObject.general.club_name +
        '. Please accept or reject the approval below.<br /><button><a href=\'https://mvhs-approvals.herokuapp.com/approve?' +
        formObject.id_num +
        '?ccc\'>Accept</a></button><button><a href=\'https://mvhs-approvals.herokuapp.com/reject?' +
        formObject.id_num + '?ccc\'>Reject</a></button>',
      })
      : Promise.resolve();

  let mailTasks = [
    studentEmail,
    advisorEmail,
    cafeterialEmail,
    gymEmail,
    libraryEmail,
    cccEmail];

  Promise.all(mailTasks).then(() => {
    res.json({
      success: true,
    });
  }).catch((err) => {
    console.error('error sending mail ' + err);
  });
})
;

router.post('/');

module.exports = router;
