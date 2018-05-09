var trackingId = document.getElementById('trackingId');

window.onload = function() {
	$("#trackingStatus").hide();
}

var trackForm = function() {
	$("#inputId").hide();
	$("#trackingStatus").show();

	return firebase.database().ref('/test/').once('value').then(function(snapshot) {
		array = snapshot;

		var totalHTML = "<tr>";

		if((array.child($("#trackingId").val()).child("approvedClubAdvisor").val() != undefined) && (array.child($("#trackingId").val()).child("approvedClubAdvisor").val() != null)) {
		  	totalHTML += "<td>" + array.child($("#trackingId").val()).child("approvedClubAdvisor").val() + "</td>";
		  } else {
		  	totalHTML += "<td>pending...</td>";
		  }


		if(array.child($("#trackingId").val()).child("campus").child("cafeteria").val() === true) {
			$("#tableHeaders").append("<th> Cafeteria </th>");
			if((array.child($("#trackingId").val()).child("approvedCafeteria").val() != undefined) && (array.child($("#trackingId").val()).child("approvedCafeteria").val() != null)) {
			  	totalHTML += "<td>" + array.child($("#trackingId").val()).child("approvedCafeteria").val() + "</td>";
			} else {
			 	totalHTML += "<td>pending...</td>";
			}
		}
		if(array.child($("#trackingId").val()).child("campus").child("gym").val() === true) {
			$("#tableHeaders").append("<th> Gym </th>");
			if((array.child($("#trackingId").val()).child("approvedGym").val() != undefined) && (array.child($("#trackingId").val()).child("approvedGym").val() != null)) {
			  	totalHTML += "<td>" + array.child($("#trackingId").val()).child("approvedGym").val() + "</td>";
			} else {
			 	totalHTML += "<td>pending...</td>";
			}
		}
		if(array.child($("#trackingId").val()).child("campus").child("library").val() === true) {
			$("#tableHeaders").append("<th> Library </th>");
			if((array.child($("#trackingId").val()).child("approvedLibrary").val() != undefined) && (array.child($("#trackingId").val()).child("approvedLibrary").val() != null)) {
			  	totalHTML += "<td>" + array.child($("#trackingId").val()).child("approvedLibrary").val() + "</td>";
			} else {
			 	totalHTML += "<td>pending...</td>";
			}
		}
		if(array.child($("#trackingId").val()).child("campus").child("ccc").val() === true) {
			$("#tableHeaders").append("<th> College and Career Center </th>");
			if((array.child($("#trackingId").val()).child("approvedCCC").val() != undefined) && (array.child($("#trackingId").val()).child("approvedCCC").val() != null)) {
			  	totalHTML += "<td>" + array.child($("#trackingId").val()).child("approvedCCC").val() + "</td>";
			} else {
			 	totalHTML += "<td>pending...</td>";
			}
		}


		$("#tableHeaders").append("<th> ASB </th>");
		if((array.child($("#trackingId").val()).child("approvedASB").val() != undefined) && (array.child($("#trackingId").val()).child("approvedASB").val() != null)) {
		  	totalHTML += "<td>" + array.child($("#trackingId").val()).child("approvedASB").val() + "</td>";
		} else {
		 	totalHTML += "<td>pending...</td>";
		}

	  totalHTML += "</tr>";
	  $("#table").append(totalHTML);
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