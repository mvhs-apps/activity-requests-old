var array;

window.onload = function() {
	var path = window.location.pathname.split('/');
	if(path[1] && path[2]) {
		return firebase.database().ref('/test/' + path[2]).once('value').then(function(snapshot) {
			var data = snapshot.val();
		  	var totalHTML = "";
		  	if(data["general"] != undefined) {
			  	totalHTML += "Student Name: " + data["general"]["student_name"] + "<br />";
			  	totalHTML += "Club Name: " + data["general"]["club_name"] + "<br />";
			  	totalHTML += "Student Email: " + data["general"]["student_email"] + "<br />";
			  	totalHTML += "Advisor Email: " + data["general"]["advisor_email"] + "<br />";
		  	if(data["dates"] != undefined) {
		  		totalHTML += "Dates: ";
		  		for (var j = 0; j < data["dates"].length; j++) {
			  		var fromDate = new Date(data["dates"][j]["from"]);
			  		var toDate = new Date(data["dates"][j]["to"]);
			  		totalHTML += fromDate.toLocaleDateString('en-US', {weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', timeZone: 'America/Los_Angeles', hour12: true, hour: 'numeric', minute: 'numeric'}) + " to " + toDate.toLocaleTimeString('en-US', {timeZone: 'America/Los_Angeles', hour12: true, hour: 'numeric', minute: 'numeric'}) + "<br />";
			  	}
			  	totalHTML += "<br />";
		  	} else {
		  		totalHTML += "<br />";
		  	}
		  	totalHTML += "Event On Campus? " + data["general"]["event_on_campus"] + "<br />";
		  	totalHTML += "Event is Fundraiser? " + data["general"]["is_fundraiser"] + "<br /><br />";

		  	if(data["general"]["event_on_campus"] == "yes") {
		  		if(data["campus"]["gym"] != undefined) {
			  		totalHTML += "Needs Gym <br />";
			  	} else {
			  		totalHTML += "Doesn't need Gym <br />";
			  	}
			  	if(data["campus"]["cafeteria"] != undefined) {
			  		totalHTML += "Needs Cafeteria <br />";
			  	} else {
			  		totalHTML += "Doesn't need Cafeteria <br />";
			  	}
			  	if(data["campus"]["library"] != undefined) {
			  		totalHTML += "Needs Library <br />";
			  	} else {
			  		totalHTML += "Doesn't need Library <br />";
			  	}
			  	if(data["campus"]["classroom"] != undefined) {
			  		totalHTML += "Needs Classroom <br />";
			  	} else {
			  		totalHTML += "Doesn't need Classroom <br />";
			  	}
			  	if(data["campus"]["theater"] != undefined) {
			  		totalHTML += "Needs Theater <br />";
			  	} else {
			  		totalHTML += "Doesn't need Theater <br /><br />";
			  	}

			  	if(data["campus"]["screens"] != undefined) {
			  		totalHTML += "Number of Screens: " + data["campus"]["screens-extra-info"] + "<br />";
			  	}
			  	if(data["campus"]["tables"] != undefined) {
			  		totalHTML += "Number of Tables: " + data["campus"]["tables-extra-info"] + "<br />";
			  	}

			  	if(data["campus"]["chairs"] != undefined) {
			  		totalHTML += "Number of Chairs: " + data["campus"]["chairs-extra-info"]+ "<br />";
			  	}

			  	if(data["campus"]["cashboxes"] != undefined) {
			  		totalHTML += "Number of Cashboxes: " + data["campus"]["cashboxes-extra-info"] + "<br />";
			  	}

			  	if(data["campus"]["setup_image"] != undefined) {
			  		totalHTML += "Setup Image: <a href=\"http://" + data["campus"]["setup_image"] + "\">Click Here</a><br />";
			  	}
			  	totalHTML += "<br />";
			}

			if(data["general"]["is_fundraiser"] == "yes") {
		  		if(data["fundraiser"]["fundraiser_name"] != undefined) {
			  		totalHTML += "Name of Fundraiser: " + data["fundraiser"]["fundraiser_name"] + "<br />";
			  	}

			  	if(data["fundraiser"]["donation_drive-items-to-be-collected"] != undefined) {
			  		totalHTML += "Donation Drive Items to be collected: " + data["fundraiser"]["donation_drive-items-to-be-collected"] + "<br />";
			  	}

			  	if(data["fundraiser"]["donation_drive-receiving-organization-delivery-plan"] != undefined) {
			  		totalHTML += "Donation Drive receiving organization delivery plan: " + data["fundraiser"]["donation_drive-receiving-organization-delivery-plan"] + "<br />";
			  	}

			  	if(data["fundraiser"]["donation_drive-receiving-organization-information"] != undefined) {
			  		totalHTML += "Donation Drive Receiving Organization Information: " + data["fundraiser"]["donation_drive-receiving-organization-information"] + "<br />";
			  	}

			  	if(data["fundraiser"]["food_sales-expected-costs"] != undefined) {
			  		totalHTML += "Food Sales Expected Costs: " + data["fundraiser"]["food_sales-expected-costs"] + "<br />";
			  	}

			  	if(data["fundraiser"]["food_sales-expected-income"] != undefined) {
			  		totalHTML += "Food Sales Expected Income: " + data["fundraiser"]["food_sales-expected-income"] + "<br />";
			  	}

			  	if(data["fundraiser"]["food_sales-expected-items-sold"] != undefined) {
			  		totalHTML += "Food Sales Expected Items Sold: " + data["fundraiser"]["food_sales-expected-items-sold"] + "<br />";
			  	}

			  	if(data["fundraiser"]["food_sales-expected-selling-price"] != undefined) {
			  		totalHTML += "Food Sales Expected Selling Price: " + data["fundraiser"]["food_sales-expected-selling-price"] + "<br />";
			  	}

			  	if(data["fundraiser"]["food_sales-product-description"] != undefined) {
			  		totalHTML += "Food Sales Product Description: " + data["fundraiser"]["food_sales-product-description"] + "<br />";
			  	}

			  	if(data["fundraiser"]["product-expected-costs"] != undefined) {
			  		totalHTML += "Product Expected Costs: " + data["fundraiser"]["product-expected-costs"] + "<br />";
			  	}

			  	if(data["fundraiser"]["product-expected-income"] != undefined) {
			  		totalHTML += "Product Expected Income: " + data["fundraiser"]["product-expected-income"] + "<br />";
			  	}

			  	if(data["fundraiser"]["product-expected-items-sold"] != undefined) {
			  		totalHTML += "Product Expected Items Sold: " + data["fundraiser"]["product-expected-items-sold"] + "<br />";
			  	}

			  	if(data["fundraiser"]["product-expected-selling-price"] != undefined) {
			  		totalHTML += "Product Expected Selling Price: " + data["fundraiser"]["product-expected-selling-price"] + "<br />";
			  	}

			  	if(data["fundraiser"]["product-product-description"] != undefined) {
			  		totalHTML += "Product Description: " + data["fundraiser"]["product-product-description"] + "<br />";
			  	}

			  	if(data["fundraiser"]["restaurant-address"] != undefined) {
			  		totalHTML += "Restaurant Address: " + data["fundraiser"]["restaurant-address"] + "<br />";
			  	}

			  	if(data["fundraiser"]["restaurant-name"] != undefined) {
			  		totalHTML += "Restaurant Name: " + data["fundraiser"]["restaurant-name"] + "<br />";
			  	}

			  	if(data["fundraiser"]["third_party_fundraiser-link"] != undefined) {
			  		totalHTML += "Third Party Fundraiser Link: <a href=\"http://" + data["fundraiser"]["third_party_fundraiser-link"] + "\">Click Here</a><br />";
			  	}
			}
		  	
		  	$("#details").append(totalHTML);
		  }
		});
	}
}

function snapshotToArray(snapshot) {
  let returnArr = [];

  snapshot.forEach(childSnapshot => {
      let item = childSnapshot.val(); 
      item.key = childSnapshot.key;
      returnArr.push(item);
  });

  return returnArr;
};