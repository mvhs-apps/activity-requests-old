// automatically hides and shows fundraiser vs. donation drive

var mainFormPart = document.getElementById('main-form-part');
var fundrasierFormPart = document.getElementById('fundraiser-form-part');
var donationFormPart = document.getElementById('donation-form-part');
const emailRegEx = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
var formObject;

var getObjectOfEntireForm = function() {

	var generalObject = $('#main-form-part').serializeArray();
	var campusObject = $('#on-campus-questions').serializeArray();
	var campus = {};
	var general = {};

	for (var i = 0; i < generalObject.length; i++) {
		if (generalObject[i].value !== '') {
			general[generalObject[i].name] = generalObject[i].value;
		}
	}
	for (var i = 0; i < campusObject.length; i++) {
		if (campusObject[i].value !== '') {
			campus[campusObject[i].name] = campusObject[i].value;
		}
	}

	return {
		general,
		campus
	}
}

var formChangeHandler = function() {
	formObject = getObjectOfEntireForm();

	console.log(formObject);

	if (formObject.general) {

		if (formObject.general.event_on_campus === 'yes') {
			$('#on-campus-questions').fadeIn();
		} else {
			$('#on-campus-questions').fadeOut();
		}

		if (formObject.general.is_fundraiser === 'yes') {
			$('#fundraiser-questions').fadeIn();
		} else {
			$('#fundraiser-questions').fadeOut();
		}

	}

	if (formObject.campus) {

		for (var val of ['classroom', 'theater', 'library', 'gym', 'cafeteria', 'screens', 'tables', 'cashboxes']) {

			var id = '#' + val + '-checklist-extension';

			if (formObject.campus[val] === 'on') {
				$(id).fadeIn();
			} else {
				$(id).fadeOut();
			}

		}

	}

}

/*
 * below is where
 * all of the form validation
 * functions are
 * feel free to add more
 * I've made them so most of them are reusable
 */


var dealWithValProblem = (function() {
	
	var elementsWithValidationProblems = [];
	
	return {
		remove: function(element) {
			var i = dealWithValProblem.getIndexOfElement(element);
			if (i > -1) {
				elementsWithValidationProblems.splice(i, 1);
			}
		},
		add: function(element) {
			if (dealWithValProblem.getIndexOfElement(element) === -1) {
				elementsWithValidationProblems.push(element);
			}
		},
		getIndexOfElement: function(element) {
			for (var i = 0; i < elementsWithValidationProblems; i++)
				if (elementsWithValidationProblems[i] === element)
					return i;
			return -1;
		},
		getLength: function() {
			return elementsWithValidationProblems.length;
		}
	}
})();

var capitalizeEachWordInStr = function(str) {
	return str.toLowerCase().split(' ').map(function(word) {
			if (word[0]) return word[0].toUpperCase() + word.substr(1);
		}).join(' ');
}

var areAllArrayValuesLongerThan = function(arr, amount) {
	for (var i = 0; i < arr.length; i++) 
		if (arr[i].length <= amount) 
			return false;
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
		dealWithValProblem.remove(element);
	} else {
		// changes border color and shows the feedback <span>
		element.style.borderColor = '#d50000';
		element.parentNode.querySelector('.feedback').style.display = 'block';
		dealWithValProblem.add(element);
	}
}

var validateNumber = function(element, min, max) {

	var value = parseInt(element.value);

	if (value <= max && value >= min) {
		element.style.borderColor = '';
		element.parentNode.querySelector('.feedback').style.display = 'none';
		dealWithValProblem.remove(element);
	} else {
		element.style.borderColor = '#d50000';
		element.parentNode.querySelector('.feedback').style.display = 'block';
		dealWithValProblem.add(element);
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
		dealWithValProblem.remove(element);
	} else {
		// changes border color and shows the feedback <span>
		element.style.borderColor = '#d50000';
		element.parentNode.querySelector('.feedback').style.display = 'block';
		dealWithValProblem.add(element);
	}

}

function submitForm() {
  firebase.database().ref('test/').push({
    formObject
  });
}