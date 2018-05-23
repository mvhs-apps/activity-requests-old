var array;

window.onload = function() {
	return firebase.database().ref('/test/').once('value').then(function(snapshot) {
	  array = snapshotToArray(snapshot);
	  for (var i = 0; i < array.length; i++) {
	  	var totalHTML = "<tr>";
	  	if(array[i]["general"] != undefined) {
	  		totalHTML += "<td>" + (i+1) + "</td>";
		  	totalHTML += "<td>" + array[i]["general"]["student_name"] + "</td>";
		  	totalHTML += "<td>" + array[i]["general"]["club_name"] + "</td>";
		  	totalHTML += "<td>" + array[i]["general"]["student_email"] + "</td>";
		  	totalHTML += "<td>" + array[i]["general"]["advisor_email"] + "</td>";
	  	}
	  	if(array[i]["dates"] != undefined) {
	  		totalHTML += "<td>";
	  		for (var j = 0; j < array[i]["dates"].length; j++) {
		  		var fromDate = new Date(array[i]["dates"][j]["from"]);
		  		var toDate = new Date(array[i]["dates"][j]["to"]);
		  		totalHTML += fromDate.toLocaleDateString('en-US', {weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', timeZone: 'America/Los_Angeles', hour12: true, hour: 'numeric', minute: 'numeric'}) + " to " + toDate.toLocaleTimeString('en-US', {timeZone: 'America/Los_Angeles', hour12: true, hour: 'numeric', minute: 'numeric'}) + "<br>";

		  		// totalHTML += (fromDate.getMonth() + 1) + "/" + fromDate.getDate() + "/" + fromDate.getFullYear() + " " + fromDate.getHours() + ":" + fromDate.getMinutes() + "  -  " + (toDate.getMonth() + 1) + "/" + toDate.getDate() + "/" + toDate.getFullYear() + " " + toDate.getHours() + ":" + toDate.getMinutes() + "<br>";
		  	}
		  	totalHTML += "</td>";
	  	} else {
	  		totalHTML += "<td></td>";
	  	}
	  	totalHTML += "<td>" + array[i]["general"]["event_on_campus"] + "</td>";
	  	totalHTML += "<td>" + array[i]["general"]["is_fundraiser"] + "</td>";

	  	if(array[i]["approvedClubAdvisor"] == undefined) {
	  		totalHTML += "<td>pending</td>";
	  	} else {
	  		totalHTML += "<td>" + array[i]["approvedClubAdvisor"] + "</td>";
	  	}
	  	if(array[i]["approvedLibrary"] == undefined) {
	  		totalHTML += "<td>pending</td>";
	  	} else {
	  		totalHTML += "<td>" + array[i]["approvedLibrary"] + "</td>";
	  	}
	  	if(array[i]["approvedGym"] == undefined) {
	  		totalHTML += "<td>pending</td>";
	  	} else {
	  		totalHTML += "<td>" + array[i]["approvedGym"] + "</td>";
	  	}
	  	if(array[i]["approvedCafeteria"] == undefined) {
	  		totalHTML += "<td>pending</td>";
	  	} else {
	  		totalHTML += "<td>" + array[i]["approvedCafeteria"] + "</td>";
	  	}
	  	if(array[i]["approvedCCC"] == undefined) {
	  		totalHTML += "<td>pending</td>";
	  	} else {
	  		totalHTML += "<td>" + array[i]["approvedCCC"] + "</td>";
	  	}
	  	if(array[i]["approvedASB"] == undefined) {
	  		totalHTML += "<td>pending</td>";
	  	} else {
	  		totalHTML += "<td>" + array[i]["approvedASB"] + "</td>";
	  	}


	  	if(array[i]["general"]["event_on_campus"] == "yes") {
	  		if(array[i]["campus"]["gym"] != undefined) {
		  		totalHTML += "<td>yes</td>";
		  	} else {
		  		totalHTML += "<td></td>";
		  	}
		  	if(array[i]["campus"]["cafeteria"] != undefined) {
		  		totalHTML += "<td>yes</td>";
		  	} else {
		  		totalHTML += "<td></td>";
		  	}
		  	if(array[i]["campus"]["library"] != undefined) {
		  		totalHTML += "<td>yes</td>";
		  	} else {
		  		totalHTML += "<td></td>";
		  	}
		  	if(array[i]["campus"]["classroom"] != undefined) {
		  		totalHTML += "<td>yes</td>";
		  	} else {
		  		totalHTML += "<td></td>";
		  	}
		  	if(array[i]["campus"]["theater"] != undefined) {
		  		totalHTML += "<td>yes</td>";
		  	} else {
		  		totalHTML += "<td></td>";
		  	}

		  	if(array[i]["campus"]["screens"] != undefined) {
		  		totalHTML += "<td>" + array[i]["campus"]["screens-extra-info"] + "</td>";
		  	} else {
		  		totalHTML += "<td></td>";
		  	}
		  	if(array[i]["campus"]["tables"] != undefined) {
		  		totalHTML += "<td>" + array[i]["campus"]["tables-extra-info"] + "</td>";
		  	} else {
		  		totalHTML += "<td></td>";
		  	}
		  	if(array[i]["campus"]["chairs"] != undefined) {
		  		totalHTML += "<td>" + array[i]["campus"]["chairs-extra-info"]+ "</td>";
		  	} else {
		  		totalHTML += "<td></td>";
		  	}
		  	if(array[i]["campus"]["cashboxes"] != undefined) {
		  		totalHTML += "<td>" + array[i]["campus"]["cashboxes-extra-info"] + "</td>";
		  	} else {
		  		totalHTML += "<td></td>";
		  	}
		  	if(array[i]["campus"]["setup_image"] != undefined) {
		  		totalHTML += "<td><a href=\"http://" + array[i]["campus"]["setup_image"] + "\">Click Here</a></td>";
		  	} else {
		  		totalHTML += "<td></td>";
		  	}
		} else {
			totalHTML += "<td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td>";
		}

		if(array[i]["general"]["is_fundraiser"] == "yes") {
	  		if(array[i]["fundraiser"]["fundraiser_name"] != undefined) {
		  		totalHTML += "<td>" + array[i]["fundraiser"]["fundraiser_name"] + "</td>";
		  	} else {
		  		totalHTML += "<td></td>";
		  	}
		  	if(array[i]["fundraiser"]["donation_drive-items-to-be-collected"] != undefined) {
		  		totalHTML += "<td>" + array[i]["fundraiser"]["donation_drive-items-to-be-collected"] + "</td>";
		  	} else {
		  		totalHTML += "<td></td>";
		  	}
		  	if(array[i]["fundraiser"]["donation_drive-receiving-organization-delivery-plan"] != undefined) {
		  		totalHTML += "<td>" + array[i]["fundraiser"]["donation_drive-receiving-organization-delivery-plan"] + "</td>";
		  	} else {
		  		totalHTML += "<td></td>";
		  	}
		  	if(array[i]["fundraiser"]["donation_drive-receiving-organization-information"] != undefined) {
		  		totalHTML += "<td>" + array[i]["fundraiser"]["donation_drive-receiving-organization-information"] + "</td>";
		  	} else {
		  		totalHTML += "<td></td>";
		  	}
		  	if(array[i]["fundraiser"]["food_sales-expected-costs"] != undefined) {
		  		totalHTML += "<td>" + array[i]["fundraiser"]["food_sales-expected-costs"] + "</td>";
		  	} else {
		  		totalHTML += "<td></td>";
		  	}
		  	if(array[i]["fundraiser"]["food_sales-expected-income"] != undefined) {
		  		totalHTML += "<td>" + array[i]["fundraiser"]["food_sales-expected-income"] + "</td>";
		  	} else {
		  		totalHTML += "<td></td>";
		  	}
		  	if(array[i]["fundraiser"]["food_sales-expected-items-sold"] != undefined) {
		  		totalHTML += "<td>" + array[i]["fundraiser"]["food_sales-expected-items-sold"] + "</td>";
		  	} else {
		  		totalHTML += "<td></td>";
		  	}
		  	if(array[i]["fundraiser"]["food_sales-expected-selling-price"] != undefined) {
		  		totalHTML += "<td>" + array[i]["fundraiser"]["food_sales-expected-selling-price"] + "</td>";
		  	} else {
		  		totalHTML += "<td></td>";
		  	}
		  	if(array[i]["fundraiser"]["food_sales-product-description"] != undefined) {
		  		totalHTML += "<td>" + array[i]["fundraiser"]["food_sales-product-description"] + "</td>";
		  	} else {
		  		totalHTML += "<td></td>";
		  	}
		  	if(array[i]["fundraiser"]["product-expected-costs"] != undefined) {
		  		totalHTML += "<td>" + array[i]["fundraiser"]["product-expected-costs"] + "</td>";
		  	} else {
		  		totalHTML += "<td></td>";
		  	}
		  	if(array[i]["fundraiser"]["product-expected-income"] != undefined) {
		  		totalHTML += "<td>" + array[i]["fundraiser"]["product-expected-income"] + "</td>";
		  	} else {
		  		totalHTML += "<td></td>";
		  	}
		  	if(array[i]["fundraiser"]["product-expected-items-sold"] != undefined) {
		  		totalHTML += "<td>" + array[i]["fundraiser"]["product-expected-items-sold"] + "</td>";
		  	} else {
		  		totalHTML += "<td></td>";
		  	}
		  	if(array[i]["fundraiser"]["product-expected-selling-price"] != undefined) {
		  		totalHTML += "<td>" + array[i]["fundraiser"]["product-expected-selling-price"] + "</td>";
		  	} else {
		  		totalHTML += "<td></td>";
		  	}
		  	if(array[i]["fundraiser"]["product-product-description"] != undefined) {
		  		totalHTML += "<td>" + array[i]["fundraiser"]["product-product-description"] + "</td>";
		  	} else {
		  		totalHTML += "<td></td>";
		  	}
		  	if(array[i]["fundraiser"]["restaurant-address"] != undefined) {
		  		totalHTML += "<td>" + array[i]["fundraiser"]["restaurant-address"] + "</td>";
		  	} else {
		  		totalHTML += "<td></td>";
		  	}
		  	if(array[i]["fundraiser"]["restaurant-name"] != undefined) {
		  		totalHTML += "<td>" + array[i]["fundraiser"]["restaurant-name"] + "</td>";
		  	} else {
		  		totalHTML += "<td></td>";
		  	}
		  	if(array[i]["fundraiser"]["third_party_fundraiser-e-signature"] != undefined) {
		  		totalHTML += "<td>" + array[i]["fundraiser"]["third_party_fundraiser-e-signature"] + "</td>";
		  	} else {
		  		totalHTML += "<td></td>";
		  	}
		  	if(array[i]["fundraiser"]["third_party_fundraiser-link"] != undefined) {
		  		totalHTML += "<td><a href=\"http://" + array[i]["fundraiser"]["third_party_fundraiser-link"] + "\">Click Here</a></td>";
		  	} else {
		  		totalHTML += "<td></td>";
		  	}
		} else {
			totalHTML += "<td></td>";
		}
	  	
	  	$("#table").append(totalHTML);
	  }
	});
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





