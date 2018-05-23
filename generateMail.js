// this is not ready for use
// needs to be changed
const domain = "http://localhost:8080";

module.exports = (params) => {

	if (params.id && params.type && params.name && params.club_name && params.email) {
		var mail = {
			recipent: "",
			messageHTML: "",
			subject: "MVHS Event Approvals: "
		}

		// add some heading here
		mail.messageHTML += "";

		// subject
		if (params.type === 'student_confirmation') {
			mail.subject += "We got your approval";
			mail.messageHTML += `Thank you for submitting your approval. Your approval id is below. Keep this in a safe place.<br><br>Tracking id: ${params.id}<br><br>Go to this link to track the progress of your approval. <a href="${domain}/track/${params.id}">Click here</a>`;
		} else if (params.type === 'advisor_confirmation') {
			mail.subject += 'A club that you advise is requesting an event';
			mail.messageHTML += `${params.name} requested approval for an event.<br><br><h2>Details</h2>Club name: ${params.club_name}<br>`;

		} else if (params.type === 'cafeteria_approval') {
			mail.subject += 'A student is requesting your approval for use of the cafeteria';
			mail.messageHTML += `${params.name} from ${params.club_name} has requested use of the cafeteria.<br><br><br>Please accept or reject the approval below:<br><a href="${domain}/approve/cafeteria/${params.id}">Approve</a><br><a>Reject</a>`;

		} else if (params.type === 'gym_approval') {

		} else if (params.type === 'library_approval') {

		} else if (params.type === 'ccc') {

		}


		// add some footer here
		mail.messageHTML += "";


		return mail;


	}

	return false;

}