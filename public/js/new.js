// automatically hides and shows fundraiser vs. donation drive

var mainFormPart = document.getElementById('main-form-part');
var fundrasierFormPart = document.getElementById('fundraiser-form-part');
var donationFormPart = document.getElementById('donation-form-part');
const emailRegEx = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
var typeOfForm;

var insertNodeAfter = function(referenceNode, newNode) {
	referenceNode.parentNode.insertBefore(newNode, referenceNode.nextSibling);
}


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


var addAnotherInputField = function(element, type) {

	var newNode = document.createElement('input');
	newNode.style.marginTop = '10px';
	newNode.type = type;
	newNode.placeholder = 'mm/dd/yyyy';

	insertNodeAfter(element, newNode);
}




/*
 * below is where
 * all of the form validation
 * functions are
 * feel free to add more
 * I've made them so most of them are reusable
 */



var capitalizeEachWordInStr = function(str) {
	return str.toLowerCase().split(' ').map(function(word) {
			if (word[0]) return word[0].toUpperCase() + word.substr(1);
		}).join(' ');
}

var areAllArrayValuesLongerThan = function(arr, amount) {
	for (var i = 0; i < arr.length; i++) {
		if (arr[i].length <= amount) {
			return false;
		}
	}
	return true;
}

var validateFullName = function(element) {
	var value = element.value;
	var parts = value.split(' ');

	if (parts.length > 1 && areAllArrayValuesLongerThan(parts, 1)) {
		// capitalizes each word
		element.value = capitalizeEachWordInStr(element.value);
		element.style.borderColor = '';
		element.parentNode.querySelector('.feedback').style.display = 'none';
	} else {
		// changes border color and shows the feedback <span>
		element.style.borderColor = '#d50000';
		element.parentNode.querySelector('.feedback').style.display = 'block';
	}
}

var validateEmail = function(element, shouldEndWith) {
	// trims any extra white space off the value
	element.value = element.value.trim();
	var value = element.value;
	// if no argument for that, sets defualt arg
	if (!shouldEndWith) var shouldEndWith = '';

	// tests for vailidity using the emailRegEx const defined above
	if (emailRegEx.test(value) && value.endsWith(shouldEndWith)) {
		element.style.borderColor = '';
		element.parentNode.querySelector('.feedback').style.display = 'none';
	} else {
		// changes border color and shows the feedback <span>
		element.style.borderColor = '#d50000';
		element.parentNode.querySelector('.feedback').style.display = 'block';
	}

}