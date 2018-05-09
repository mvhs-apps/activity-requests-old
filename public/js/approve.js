window.onload = function() {
	var link = String(window.location.href);
	if(link.indexOf("?") != -1) {
		var endOfLink = link.substr(link.indexOf("?") + 1, link.length);
		var nameOfApproval = endOfLink.substr(endOfLink.indexOf("?") + 1, endOfLink.length);
		var id = endOfLink.substr(0, endOfLink.indexOf("?"));

		if(nameOfApproval === "clubAdvisor") {
			firebase.database().ref('test/' + id + "/approvedClubAdvisor").set("approved");
		}
		else if(nameOfApproval === "cafeteria") {
			firebase.database().ref('test/' + id + "/approvedCafeteria").set("approved");
		}
		else if(nameOfApproval === "gym") {
			firebase.database().ref('test/' + id + "/approvedGym").set("approved");
		}
		else if(nameOfApproval === "library") {
			firebase.database().ref('test/' + id + "/approvedLibrary").set("approved");
		}
		else if(nameOfApproval === "ccc") {
			firebase.database().ref('test/' + id + "/approvedCCC").set("approved");
		}
		else if(nameOfApproval === "ASB") {
			firebase.database().ref('test/' + id + "/approvedASB").set("approved");
		}
	}	
}