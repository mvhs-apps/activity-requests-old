window.onload = function() {
	var path = window.location.pathname.split('/');
	if(path[1] && path[2] && path[3]) {
		switch (path[3]) {
			case 'clubAdvisor':
				firebase.database().ref('test/' + path[2] + "/approvedClubAdvisor").set("approved");
				console.log("asdf");
				break;
			case "cafeteria":
				firebase.database().ref('test/' + path[2] + "/approvedCafeteria").set("approved");
				break;
			case "gym":
				firebase.database().ref('test/' + path[2] + "/approvedGym").set("approved");
				break;
			case "library":
				firebase.database().ref('test/' + path[2] + "/approvedLibrary").set("approved");
				break;
			case "ccc":
				firebase.database().ref('test/' + path[2] + "/approvedCCC").set("approved");
				break;
			case "ASB":
				firebase.database().ref('test/' + path[2] + "/approvedASB").set("approved");
				break;
		}
	}	
}