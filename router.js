require('dotenv').config();
let express = require('express');
let router = express.Router();
const mailer = require('./mailer');

//const generateMail = require('./generateMail'); <- not ready for use

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

router.get('/approve/:person/:id', (req, res) => {
  res.render('approve');
});

router.get('/reject', (req, res) => {
  res.render('reject');
});

router.get('/reject/:person/:id', (req, res) => {
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

  const CAFETERIA_EMAIL = process.env.CAFETERIA_EMAIL; // tami.kittle@mvla.net
  const GYM_EMAIL = process.env.GYM_EMAIL; // debra.godfrey@mvla.net
  const GYM_AFTER_HOURS = process.env.GYM_AFTER_HOURS; // shelley.smith@mvla.net
  const LIBRARY_EMAIL = process.env.LIBRARY_EMAIL; // susan.lamarche@mvla.net
  const CCC_EMAIL = process.env.CCC_EMAIL; // jaimie.tabuchi@mvla.net

  let formObject = JSON.parse(req.body.form_data);

  let studentEmail = mailer.sendMail({
    recipient: formObject.general.student_email,
    subject: 'Confirmation for submitting your approval',
    messageHTML: '<center><div style="width: 90%; background-color: #f4f4f4"><p style="font-size: 30px">You have submitted an approval, you can track it\'s progress here: <a href=\'https://mvhs-approvals.herokuapp.com/track\'>https://mvhs-approvals.herokuapp.com/track</a> using the id: \'' +
    formObject.id_num + '\'' + '</p></div></center>',
  });
  let advisorEmail = mailer.sendMail({
    recipient: formObject.general.advisor_email,
    subject: 'A student is requesting your approval',
    messageHTML: '<center><div style="width: 90%; background-color: #f4f4f4"><p style="text-align: center; font-size: 30px;">' +
    formObject.general.student_name +
    ' has submitted an approval for ' + formObject.general.club_name +
    '. Please accept or reject the approval below.</p><br /><center><button style="background-color: green; width: 200px; font-size: 15px; height: 100px"><a href=\'https://mvhs-approvals.herokuapp.com/approve/' +
    formObject.id_num +
    '/clubAdvisor\'><p style="font-size: 25px; color: black">Accept</p></a></button><button style="background-color: red; width: 200px; font-size: 15px; height: 100px"><a href=\'https://mvhs-approvals.herokuapp.com/reject/' +
    formObject.id_num +
    '/clubAdvisor\'><p style="font-size: 25px; color: black">Reject</p></a></button></center>' +
    '</div></center>',
  });
  let cafeterialEmail = (formObject.campus.cafeteria === true)
      ? mailer.sendMail({
        recipient: CAFETERIA_EMAIL,
        subject: 'A student is requesting your approval for use of the Cafeteria',
        messageHTML: '<center><div style="width: 90%; background-color: #f4f4f4"><p style="text-align: center; font-size: 30px;">' +
        formObject.general.student_name +
        ' has submitted an approval for ' + formObject.general.club_name +
        '. Please accept or reject the approval below.</p><br /><center><button style="background-color: green; width: 200px; font-size: 15px; height: 100px"><a href=\'https://mvhs-approvals.herokuapp.com/approve/' +
        formObject.id_num +
        '/cafeteria\'><p style="font-size: 25px; color: black">Accept</p></a></button><button style="background-color: red; width: 200px; font-size: 15px; height: 100px"><a href=\'https://mvhs-approvals.herokuapp.com/reject/' +
        formObject.id_num +
        '/cafeteria\'><p style="font-size: 25px; color: black">Reject</p></a></button></center>' +
        '</div></center>',
      })
      : Promise.resolve();
  let gymEmail = (formObject.campus.gym === true && formObject.dates.length !==
      0 && new Date(formObject.dates[0].from).getHours() > 7 &&
      new Date(formObject.dates[0].from).getHours() < 15 )
      ? mailer.sendMail({
        recipient: GYM_EMAIL,
        subject: 'A student is requesting your approval for use of the Gym/fields during school hours',
        messageHTML: '<center><div style="width: 90%; background-color: #f4f4f4"><p style="text-align: center; font-size: 30px;">' +
        formObject.general.student_name +
        ' has submitted an approval for ' + formObject.general.club_name +
        '. Please accept or reject the approval below.</p><br /><center><button style="background-color: green; width: 200px; font-size: 15px; height: 100px"><a href=\'https://mvhs-approvals.herokuapp.com/approve/' +
        formObject.id_num +
        '/gym\'><p style="font-size: 25px; color: black">Accept</p></a></button><button style="background-color: red; width: 200px; font-size: 15px; height: 100px"><a href=\'https://mvhs-approvals.herokuapp.com/reject/' +
        formObject.id_num +
        '/gym\'><p style="font-size: 25px; color: black">Reject</p></a></button></center>' +
        '</div></center>',
      })
      : Promise.resolve();
  let gymEmailAfterHours = (formObject.campus.gym === true &&
      formObject.dates.length !== 0 &&
      (new Date(formObject.dates[0].from).getHours() < 7 ||
          new Date(formObject.dates[0].from).getHours() > 15 ))
      ? mailer.sendMail({
        recipient: GYM_AFTER_HOURS,
        subject: 'A student is requesting your approval for use of the Gym/fields after school hours',
        messageHTML: '<center><div style="width: 90%; background-color: #f4f4f4"><p style="text-align: center; font-size: 30px;">' +
        formObject.general.student_name +
        ' has submitted an approval for ' + formObject.general.club_name +
        '. Please accept or reject the approval below.</p><br /><center><button style="background-color: green; width: 200px; font-size: 15px; height: 100px"><a href=\'https://mvhs-approvals.herokuapp.com/approve/' +
        formObject.id_num +
        '/gym\'><p style="font-size: 25px; color: black">Accept</p></a></button><button style="background-color: red; width: 200px; font-size: 15px; height: 100px"><a href=\'https://mvhs-approvals.herokuapp.com/reject/' +
        formObject.id_num +
        '/gym\'><p style="font-size: 25px; color: black">Reject</p></a></button></center>' +
        '</div></center>',
      })
      : Promise.resolve();
  let libraryEmail = (formObject.campus.library === true)
      ? mailer.sendMail({
        recipient: LIBRARY_EMAIL,
        subject: 'A student is requesting your approval for use of the library',
        messageHTML: '<center><div style="width: 90%; background-color: #f4f4f4"><p style="text-align: center; font-size: 30px;">' +
        formObject.general.student_name +
        ' has submitted an approval for ' + formObject.general.club_name +
        '. Please accept or reject the approval below.</p><br /><center><button style="background-color: green; width: 200px; font-size: 15px; height: 100px"><a href=\'https://mvhs-approvals.herokuapp.com/approve/' +
        formObject.id_num +
        '/library\'><p style="font-size: 25px; color: black">Accept</p></a></button><button style="background-color: red; width: 200px; font-size: 15px; height: 100px"><a href=\'https://mvhs-approvals.herokuapp.com/reject/' +
        formObject.id_num +
        '/library\'><p style="font-size: 25px; color: black">Reject</p></a></button></center>' +
        '</div></center>',
      })
      : Promise.resolve();
  let cccEmail = (formObject.campus.ccc === true)
      ? mailer.sendMail({
        recipient: CCC_EMAIL,
        subject: 'A student is requesting your approval for use of the College and Career Center',
        messageHTML: '<center><div style="width: 90%; background-color: #f4f4f4"><p style="text-align: center; font-size: 30px;">' +
        formObject.general.student_name +
        ' has submitted an approval for ' + formObject.general.club_name +
        '. Please accept or reject the approval below.</p><br /><center><button style="background-color: green; width: 200px; font-size: 15px; height: 100px"><a href=\'https://mvhs-approvals.herokuapp.com/approve/' +
        formObject.id_num +
        '/ccc\'><p style="font-size: 25px; color: black">Accept</p></a></button><button style="background-color: red; width: 200px; font-size: 15px; height: 100px"><a href=\'https://mvhs-approvals.herokuapp.com/reject/' +
        formObject.id_num +
        '/ccc\'><p style="font-size: 25px; color: black">Reject</p></a></button></center>' +
        '</div></center>',
      })
      : Promise.resolve();

  let mailTasks = [
    studentEmail,
    advisorEmail,
    cafeterialEmail,
    gymEmail,
    gymEmailAfterHours,
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
