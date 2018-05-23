window.onload = function() {
	var path = window.location.pathname.split('/');
	if(path[1] && path[2]) {


		switch (path[1]) {
			case "clubAdvisor":
				firebase.database().ref('test/' + path[2] + "/approvedClubAdvisor").set("rejected");
				break;
			case "cafeteria":
				firebase.database().ref('test/' + path[2] + "/approvedCafeteria").set("rejected");
				break;
			case "gym":
				firebase.database().ref('test/' + path[2] + "/approvedGym").set("rejected");
				break;
			case "library":
				firebase.database().ref('test/' + path[2] + "/approvedLibrary").set("rejected");
				break;
			case "ccc":
				firebase.database().ref('test/' + path[2] + "/approvedCCC").set("rejected");
				break;
			case "ASB":
				firebase.database().ref('test/' + path[2] + "/approvedASB").set("rejected");
				break;
		}
	}	
}