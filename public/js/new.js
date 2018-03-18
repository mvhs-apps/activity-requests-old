// automatically hides and shows fundraiser vs. donation drive

var mainFormPart = document.getElementById('main-form-part');
var fundrasierFormPart = document.getElementById('fundraiser-form-part');
var donationFormPart = document.getElementById('donation-form-part');

var typeOfForm;

var fundOrDonationShow = function(value) {
	if (value === 'fundraiser') {
		fundrasierFormPart.style.display = 'block';
		donationFormPart.style.display = 'none';
		typeOfForm = value;
	} else if (value === 'donation-drive') {
		donationFormPart.style.display = 'block';
		fundrasierFormPart.style.display = 'none';
		typeOfForm = value;
	} else {
		fundrasierFormPart.style.display = 'none';
		donationFormPart.style.display = 'none';
	}
}