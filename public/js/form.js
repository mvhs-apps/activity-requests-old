// automatically hides and shows fundraiser vs. donation drive

var mainFormPart = document.getElementById('main-form-part');
var fundrasierFormPart = document.getElementById('fundraiser-form-part');
var donationFormPart = document.getElementById('donation-form-part');
const emailRegEx = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const urlRegEx = /^((https?|ftp|smtp):\/\/)?(www.)?[a-z0-9]+(\.[a-z]{2,}){1,3}(#?\/?[a-zA-Z0-9#]+)*\/?(\?[a-zA-Z0-9-_]+=[a-zA-Z0-9-%]+&?)?$/;
var formObject;
var dates = [];
var willItAskForConfBeforeClosingTab = false;


var getObjectOfEntireForm = function() {

	var generalObject = $('#main-form-part').serializeArray();
	var campusObject = $('#on-campus-questions').serializeArray();
	var fundraiserObject = $('#fundraiser-questions').serializeArray();
	var campus = {};
	var general = {};
	var fundraiser = {};

	for (var i = 0; i < generalObject.length; i++) {
		if (generalObject[i].value !== '') {
			general[generalObject[i].name] = generalObject[i].value;
		}
	}
	for (var i = 0; i < campusObject.length; i++) {
		if (campusObject[i].value !== '') {
			if (campusObject[i]. value === 'on') campusObject[i].value = true;
			campus[campusObject[i].name] = campusObject[i].value;
		}
	}
	for (var i = 0; i < fundraiserObject.length; i++) {
		if (fundraiserObject[i].value !== '') {
			if (fundraiserObject[i]. value === 'on') fundraiserObject[i].value = true;
			fundraiser[fundraiserObject[i].name] = fundraiserObject[i].value;
		}
	}

	if (!willItAskForConfBeforeClosingTab) {
		window.onbeforeunload = function(e) {
			e = e || window.event;

			// For IE and Firefox prior to version 4
			if (e) e.returnValue = 'Sure?';

			// For Safari
			return 'Sure?';
		}
	}

	return {
		general,
		campus,
		fundraiser,
		dates
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

	if (formObject.fundraiser) {
		var cache = formObject.fundraiser;

		// clear all form types

		for (var val of ['restaurant', 'donation_drive', 'food_sales', 'product', 'third_party_fundraiser']) {

			if (val === cache.is_fundraiser) {
				$(`#${val}-questions-div`).fadeIn();
			} else {
				$(`#${val}-questions-div`).fadeOut();
			}

		}

	}

	if (formObject.campus) {

		for (var val of ['classroom', 'theater', 'library', 'gym', 'cafeteria', 'screens', 'tables', 'cashboxes']) {

			var id = '#' + val + '-checklist-extension';

			if (formObject.campus[val]) {
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
	var value = element.value.trim();
	var parts = value.split(' ');

	if (parts.length > 1 && areAllArrayValuesLongerThan(parts, 1)) {
		// capitalizes each word
		element.value = value;
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

var validateUrl = function(element) {
	element.value = element.value.trim();

	if (urlRegEx.test(element.value)) {
		element.style.borderColor = '';
		element.parentNode.querySelector('.feedback').style.display = 'none';
		dealWithValProblem.remove(element);
	} else {
		element.style.borderColor = '#d50000';
		element.parentNode.querySelector('.feedback').style.display = 'block';
		dealWithValProblem.add(element);
	}
}

var instantlyTrim = function(element) {
	element.value = element.value.trim();
}

for (var button of document.getElementsByClassName('fake-button')) {
	button.onclick = function(e) {
		var me = this;
		e.preventDefault();
		me.disabled = 'true';
		me.innerHTML = 'Sending...<div class="loader" style="width: 50px;"><svg class=\"circular\" viewBox=\"25 25 50 50\"><circle class=\"path\" cx=\"50\" cy=\"50\" r=\"20\" fill=\"none\" stroke-width=\"2\" stroke-miterlimit=\"10\"\/><\/svg></div>';
		setTimeout(function() {
			me.innerHTML = 'Sent!';
		}, 3000); // pretends to send an email for three seconds
	}
}

for (var input of document.querySelectorAll('.text-input textarea')) {
	input.onfocus = function(e) {
		this.style.height = '200px'; this.style.width = '500px'; this.style.border = '1px solid rgb(76, 143, 255)'; this.style.borderRadius = '4px'; this.style.padding = '10px';
	}
}


/* all the disgusting date stuff */

var addDate = function(element) {
	$('.date-input-area').fadeIn();
}

var saveDate = function() {

	var date1;
	var date2;

	try {
		var obj = {
			month: parseInt($('input[name="month"]').val()),
			day: parseInt($('input[name="day"]').val()),
			year: parseInt($('input[name="year"]').val()),
			hours1: parseInt($('input[name="hours-1"]').val()),
			minute1: parseInt($('input[name="minute-1"]').val()),
			timeOfDay1: $('select[name="time-of-day-1"]').val(),
			hours2: parseInt($('input[name="hours-2"]').val()),
			minute2: parseInt($('input[name="minute-2"]').val()),
			timeOfDay2: $('select[name="time-of-day-2"]').val()
		}

		if (obj.timeOfDay1 === 'pm' && obj.hours1 < 12) obj.hours1 += 12;
		if (obj.timeOfDay2 === 'pm' && obj.hours2 < 12) obj.hours2 += 12;

		date1 = new Date(`${obj.month}/${obj.day}/${obj.year} ${obj.hours1}:${obj.minute1}`);
		date2 = new Date(`${obj.month}/${obj.day}/${obj.year} ${obj.hours2}:${obj.minute2}`);

		if (date2.getTime() > date1.getTime()) {
			var confirm = window.confirm(`Note: Once you confirm, there is currently no way to change dates other than filling out the form from scratch.\n\nAre you sure you want to add the timeframe from ${date1.toLocaleDateString('en-US', {weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', timeZone: 'America/Los_Angeles', hour12: true, hour: 'numeric', minute: 'numeric'})} to ${date2.toLocaleTimeString('en-US', {timeZone: 'America/Los_Angeles', hour12: true, hour: '2-digit', minute:'2-digit'})}?`);

			if (confirm) {
				dates.push({
					from: date1.toJSON(), 
					to: date2.toJSON()
				});

				document.getElementById('all-the-dates').innerHTML += `<br><span data-id="${dates.length - 1}" class="one-date">${date1.toLocaleDateString('en-US', {weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', timeZone: 'America/Los_Angeles', hour12: true, hour: 'numeric', minute: 'numeric'})} to ${date2.toLocaleTimeString('en-US', {timeZone: 'America/Los_Angeles', hour12: true, hour: '2-digit', minute:'2-digit'})} <!-- <span onclick="removeDate($(this.parentElement).attr('data-id'))" class="remove-button"><i class="material-icons">remove_circle</i></span> --></span><br>`;
				
				$('.date-input-area').fadeOut();

				$('input[name="month"]').val('');
				$('input[name="day"]').val('');
				$('input[name="year"]').val('');
				$('input[name="hours-1"]').val('');
				$('input[name="minute-1"]').val('');
				$('select[name="time-of-day-1"]').val('');
				$('input[name="hours-2"]').val('');
				$('input[name="minute-2"]').val('');
				$('select[name="time-of-day-2"]').val('');
			}
		} else {
			window.alert("It looks like your beginning time comes after your end time. That doesn't make sense!");
		}


	} catch (e) {
		window.alert('There was a problem with your date. Please make sure your date is entered correctly, makes logical sense, and you have selected the corresponding am/pm for each time.');
	}

	console.log(obj, date1, date2);
}

var removeDate = function(index) {
	// TODO this does not currently work, needs to be fixed
	if (window.confirm('Are you sure you want to delete this date?')) {
		// TODO readjust all the other data-id fields once this happens

		for (var i = index + 1; i < dates.length; i++) {
			$(`span[data-id="${i}"`).attr('data-id', i + 1);
		}

		dates.splice(index, 1);
		$(`span[data-id="${index}"`).remove();
	}
}

function post(path, params, method) {
    method = method || "post"; // Set method to post by default if not specified.

    // The rest of this code assumes you are not using a library.
    // It can be made less wordy if you use one.
    var form = document.createElement("form");
    form.setAttribute("method", method);
    form.setAttribute("action", path);

    for(var key in params) {
        if(params.hasOwnProperty(key)) {
            var hiddenField = document.createElement("input");
            hiddenField.setAttribute("type", "hidden");
            hiddenField.setAttribute("name", key);
            hiddenField.setAttribute("value", params[key]);

            form.appendChild(hiddenField);
        }
    }

    document.body.appendChild(form);
    form.submit();
}

var submitForm = function() {
	// TODO validation!
	formObject = getObjectOfEntireForm();
	var formObject2 = formObject;
	formObject2.recipient = formObject2.general.student_email;
	formObject2.subject = "Confirmation for submitting your approval";
	formObject2.message = "You have submitted an approval, you will hear back once your advisor approves.";

	var formObject3 = formObject2;
	formObject3.recipient = formObject3.general.advisor_email;
	formObject3.subject = "A student is requesting your approval";
	formObject3.message = formObject3.general.student_name + " has submitted an approval for " + formObject3.general.club_name + ". Please accept or reject the approval below.";

	firebase.database().ref('test/').push(formObject);	
	
	post('email/', formObject3, 'post', function() {});
}