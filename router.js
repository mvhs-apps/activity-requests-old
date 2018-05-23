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

router.post('/submit_form', (req, res) => {

	var formObject = JSON.parse(req.body.form_data);

	console.log(formObject);

	mailer.sendMail({
		recipient: formObject.general.student_email,
		subject: "Confirmation for submitting your approval",
		messageHTML: "You have submitted an approval, you can track it's progress here: <a href='localhost:8080/track'>localhost:8080/track</a> using the id: '" + formObject.id_num + "'"
	}).then((data) => {
		return mailer.sendMail({
			recipient: formObject.general.advisor_email,
			subject: "A student is requesting your approval",
			messageHTML: formObject.general.student_name + " has submitted an approval for " + formObject.general.club_name + ". Please accept or reject the approval below.<br /><button><a href='localhost:8080/approve/clubAdvisor/" + formObject.id_num + "'>Accept</a></button><button><a href='localhost:8080/reject/clubAdvisor/" + formObject.id_num + "'>Reject</a></button>"});
	}).then((data) => {
		if(formObject.campus.cafeteria === true) {
			return mailer.sendMail({
				recipient: "paran.sonthalia@gmail.com",
				subject: "A student is requesting your approval for use of the Cafeteria",
				messageHTML: formObject.general.student_name + " has submitted an approval for " + formObject.general.club_name + ". Please accept or reject the approval below.<br /><button><a href='localhost:8080/approve/cafeteria/" + formObject.id_num + "'>Accept</a></button><button><a href='localhost:8080/reject/cafeteria/" + formObject.id_num + "'>Reject</a></button>"});
		}
		return;
	}).then((data) => {
		if(formObject.campus.gym === true) {
			return mailer.sendMail({
				recipient: "paran.sonthalia@gmail.com",
				subject: "A student is requesting your approval for use of the Gym",
				messageHTML: formObject.general.student_name + " has submitted an approval for " + formObject.general.club_name + ". Please accept or reject the approval below.<br /><button><a href='localhost:8080/approve?" + formObject.id_num + "?gym'>Accept</a></button><button><a href='localhost:8080/reject?" + formObject.id_num + "?gym'>Reject</a></button>"});
		}
		return;
	}).then((data) => {
		if(formObject.campus.library === true) {
			return mailer.sendMail({
				recipient: "paran.sonthalia@gmail.com",
				subject: "A student is requesting your approval for use of the library",
				messageHTML: formObject.general.student_name + " has submitted an approval for " + formObject.general.club_name + ". Please accept or reject the approval below.<br /><button><a href='localhost:8080/approve?" + formObject.id_num + "?library'>Accept</a></button><button><a href='localhost:8080/reject?" + formObject.id_num + "?library'>Reject</a></button>"});
		}
		return;
	}).then((data) => {
		if(formObject.campus.ccc === true) {
			return mailer.sendMail({
				recipient: "paran.sonthalia@gmail.com",
				subject: "A student is requesting your approval for use of the College and Career Center",
				messageHTML: formObject.general.student_name + " has submitted an approval for " + formObject.general.club_name + ". Please accept or reject the approval below.<br /><button><a href='localhost:8080/approve?" + formObject.id_num + "?ccc'>Accept</a></button><button><a href='localhost:8080/reject?" + formObject.id_num + "?ccc'>Reject</a></button>"});
		}
		return;
	}).then((data) => {
		res.json({
			success: true
		});
	}).catch((err) => {
		console.error('error sending mail ' + err);  
	});
});

router.post('/');

module.exports = router;
