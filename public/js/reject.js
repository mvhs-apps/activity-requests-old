window.onload = function() {
	var link = String(window.location.href);
	if(link.indexOf("?") != -1) {
		var id = link.substr(link.indexOf("?") + 1, link.length);
		firebase.database().ref('test/' + id + "/approvedClubAdvisor").set("no");
	}	
}