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
	  if((array.child($("#trackingId").val()).child("library").val() != undefined) && (array.child($("#trackingId").val()).child("library").val() != null)) {
	  	totalHTML += "<td>" + array.child($("#trackingId").val()).child("library").val() + "</td>";
	  } else {
	  	totalHTML += "<td>pending...</td>";
	  }
	  if((array.child($("#trackingId").val()).child("other").val() != undefined) && (array.child($("#trackingId").val()).child("other").val() != null)) {
	  	totalHTML += "<td>" + array.child($("#trackingId").val()).child("other").val() + "</td>";
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