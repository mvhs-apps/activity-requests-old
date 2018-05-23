var allUnapprovedApprovals = [];

window.onload = function() {
	return firebase.database().ref('/test/').once('value').then(function(snapshot) {
		var approvals = snapshotToArray(snapshot);
	  for(var i = 0; i < approvals.length; i++) {
	  	var approvedCafeteria = true;
	  	var approvedLibrary = true;
	  	var approvedGym = true;
	  	var approvedCCC = true;

	  	if((approvals[i]["approvedASB"] === null || approvals[i]["approvedASB"] === undefined) && approvals[i]["approvedClubAdvisor"] === "approved") {
	  		if(approvals[i]["campus"] !== undefined) {
	  			if(approvals[i]["campus"]["cafeteria"] === true) {
		  			if(approvals[i]["approvedCafeteria"] !== "approved") {
		  				approvedCafeteria = false;
		  			}
		  		}
		  		if(approvals[i]["campus"]["gym"] === true) {
		  			if(approvals[i]["approvedGym"] !== "approved") {
		  				approvedGym = false;
		  			}
		  		}
		  		if(approvals[i]["campus"]["library"] === true) {
		  			if(approvals[i]["approvedLibrary"] !== "approved") {
		  				approvedLibrary = false;
		  			}
		  		}
		  		if(approvals[i]["campus"]["ccc"] === true) {
		  			if(approvals[i]["approvedCCC"] !== "approved") {
		  				approvedCCC = false;
		  			}
		  		}
	  		}
	  		
	  		if(approvedCafeteria && approvedLibrary && approvedGym && approvedCCC) {
		  		allUnapprovedApprovals.push(approvals[i]);
	  		}
	  	}
	  }
	  loadNextApproval();
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

function approve() {
	firebase.database().ref('test/' + allUnapprovedApprovals[0]["key"] + '/approvedASB').set("approved");
	allUnapprovedApprovals.shift();
	loadNextApproval();
}

function decline() {
	firebase.database().ref('test/' + allUnapprovedApprovals[0]["key"] + '/approvedASB').set("rejected");
	allUnapprovedApprovals.shift();
	loadNextApproval();
}

function loadNextApproval() {
	if (allUnapprovedApprovals[0] !== undefined) {
	    if (allUnapprovedApprovals[0]["general"] !== undefined) {
	        $("#orgName").text("Who: " + allUnapprovedApprovals[0]["general"]["club_name"]);
	        $("#evName").text("What: " + allUnapprovedApprovals[0]["general"]["event_description"]);
	    }
	    var dates = "";
	    if (allUnapprovedApprovals[0]["dates"] !== undefined) {
	        for (var i = 0; i < allUnapprovedApprovals[0]["dates"].length; i++) {
	            var fromDate = new Date(allUnapprovedApprovals[0]["dates"][i]["from"]);
	            var toDate = new Date(allUnapprovedApprovals[0]["dates"][i]["to"]);

	            dates += fromDate.toLocaleDateString('en-US', {
	                weekday: 'long',
	                year: 'numeric',
	                month: 'long',
	                day: 'numeric',
	                timeZone: 'America/Los_Angeles',
	                hour12: true,
	                hour: 'numeric',
	                minute: 'numeric'
	            }) + " to " + toDate.toLocaleTimeString('en-US', {
	                timeZone: 'America/Los_Angeles',
	                hour12: true,
	                hour: 'numeric',
	                minute: 'numeric'
	            }) + "<br>";
	            console.log(dates);

	        }
	    }
	    $("#date").html("When: " + dates);
	    if (allUnapprovedApprovals[0]["campus"] !== undefined) {
	        $("#location").text("Where: " + allUnapprovedApprovals[0]["campus"]["location_on_campus"]);
	    }
	} else {
		$("#date").text("NONE");
		$("#location").text("NONE");
		$("#orgName").text("NONE");
		$("#evName").text("NONE");
		$("#date").text("NONE");

	}
}