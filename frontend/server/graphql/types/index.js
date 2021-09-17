const projectFields = `
	title: String!
	company: String!
	companyWebsite: String
	location: String
	jobTitle: String
	description: String
	startDate: String
	endDate: String
`;

// ! - non-nullable
exports.projectTypes = `
	type Project{
		_id: ID!
		${ projectFields }
	}

	input ProjectInput {
		${ projectFields }
	}
`;

exports.userTypes = `
	input SignUpInput {
		avatar: String
		username: String!
		name: String
		email: String!
		password: String!
		passwordConfirmation: String!
	}
`;