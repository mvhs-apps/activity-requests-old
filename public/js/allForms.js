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
		  		totalHTML += "<td>" + array[i]["formObject"]["campus"]["chairs-extra-info"] + "</td>";
		  	} else {
		  		totalHTML += "<td></td>";
		  	}
		  	if(array[i]["formObject"]["campus"]["cashboxes"] != undefined) {
		  		totalHTML += "<td>" + array[i]["formObject"]["campus"]["cashboxes-extra-info"] + "</td>";
		  	} else {
		  		totalHTML += "<td></td>";
		  	}
		} else {
			totalHTML += "<td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td>";
		}
	  	

	  	$("#table").append(totalHTML);
	  }
	  // alert(array[0]["formObject"]["general"]["student_name"])
	  // alert(array[0].get());
	  // ...
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