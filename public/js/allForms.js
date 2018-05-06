var array;

window.onload = function() {
	return firebase.database().ref('/test/').once('value').then(function(snapshot) {
	  array = snapshotToArray(snapshot);
	  for (var i = 0; i < array.length; i++) {
	  	var totalHTML = "<tr>";
	  	totalHTML += "<td>" + (i+1) + "</td>";
	  	totalHTML += "<td>" + array[i]["formObject"]["general"]["student_name"] + "</td>";
	  	totalHTML += "<td>" + array[i]["formObject"]["general"]["club_name"] + "</td>";
	  	totalHTML += "<td>" + array[i]["formObject"]["general"]["student_email"] + "</td>";
	  	totalHTML += "<td>" + array[i]["formObject"]["general"]["advisor_email"] + "</td>";
	  	if(array[i]["formObject"]["dates"] != undefined) {
	  		totalHTML += "<td>";
	  		for (var j = 0; j < array[i]["formObject"]["dates"].length; j++) {
		  		var fromDate = new Date(array[i]["formObject"]["dates"][j]["from"]);
		  		var toDate = new Date(array[i]["formObject"]["dates"][j]["to"]);
		  		totalHTML += fromDate.toLocaleDateString('en-US', {weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', timeZone: 'America/Los_Angeles', hour12: true, hour: 'numeric', minute: 'numeric'}) + " to " + toDate.toLocaleTimeString('en-US', {timeZone: 'America/Los_Angeles', hour12: true, hour: 'numeric', minute: 'numeric'}) + "<br>";

		  		// totalHTML += (fromDate.getMonth() + 1) + "/" + fromDate.getDate() + "/" + fromDate.getFullYear() + " " + fromDate.getHours() + ":" + fromDate.getMinutes() + "  -  " + (toDate.getMonth() + 1) + "/" + toDate.getDate() + "/" + toDate.getFullYear() + " " + toDate.getHours() + ":" + toDate.getMinutes() + "<br>";
		  	}
		  	totalHTML += "</td>";
	  	} else {
	  		totalHTML += "<td></td>";
	  	}
	  	totalHTML += "<td>" + array[i]["formObject"]["general"]["event_on_campus"] + "</td>";
	  	totalHTML += "<td>" + array[i]["formObject"]["general"]["is_fundraiser"] + "</td>";


	  	if(array[i]["formObject"]["general"]["event_on_campus"] == "yes") {
	  		if(array[i]["formObject"]["campus"]["gym"] != undefined) {
		  		totalHTML += "<td>yes</td>";
		  	} else {
		  		totalHTML += "<td></td>";
		  	}
		  	if(array[i]["formObject"]["campus"]["cafeteria"] != undefined) {
		  		totalHTML += "<td>yes</td>";
		  	} else {
		  		totalHTML += "<td></td>";
		  	}
		  	if(array[i]["formObject"]["campus"]["library"] != undefined) {
		  		totalHTML += "<td>yes</td>";
		  	} else {
		  		totalHTML += "<td></td>";
		  	}
		  	if(array[i]["formObject"]["campus"]["classroom"] != undefined) {
		  		totalHTML += "<td>yes</td>";
		  	} else {
		  		totalHTML += "<td></td>";
		  	}
		  	if(array[i]["formObject"]["campus"]["theater"] != undefined) {
		  		totalHTML += "<td>yes</td>";
		  	} else {
		  		totalHTML += "<td></td>";
		  	}

		  	if(array[i]["formObject"]["campus"]["screens"] != undefined) {
		  		totalHTML += "<td>" + array[i]["formObject"]["campus"]["screens-extra-info"] + "</td>";
		  	} else {
		  		totalHTML += "<td></td>";
		  	}
		  	if(array[i]["formObject"]["campus"]["tables"] != undefined) {
		  		totalHTML += "<td>" + array[i]["formObject"]["campus"]["tables-extra-info"] + "</td>";
		  	} else {
		  		totalHTML += "<td></td>";
		  	}
		  	if(array[i]["formObject"]["campus"]["chairs"] != undefined) {
		  		totalHTML += "<td>" + array[i]["formObject"]["campus"]["chairs-extra-info"]+ "</td>";
		  	} else {
		  		totalHTML += "<td></td>";
		  	}
		  	if(array[i]["formObject"]["campus"]["cashboxes"] != undefined) {
		  		totalHTML += "<td>" + array[i]["formObject"]["campus"]["cashboxes-extra-info"] + "</td>";
		  	} else {
		  		totalHTML += "<td></td>";
		  	}
		  	if(array[i]["formObject"]["campus"]["setup_image"] != undefined) {
		  		totalHTML += "<td><a href=\"" + array[i]["formObject"]["campus"]["setup_image"] + "\">Click Here</a></td>";
		  	} else {
		  		totalHTML += "<td></td>";
		  	}
		} else {
			totalHTML += "<td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td>";
		}

		if(array[i]["formObject"]["general"]["is_fundraiser"] == "yes") {
	  		if(array[i]["formObject"]["fundraiser"]["fundraiser_name"] != undefined) {
		  		totalHTML += "<td>" + array[i]["formObject"]["fundraiser"]["fundraiser_name"] + "</td>";
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





