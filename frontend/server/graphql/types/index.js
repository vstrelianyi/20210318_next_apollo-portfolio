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
	type User {
		_id: ID
		avatar: String
		username: String
		name: String
		email: String
		role: String
	}

	input SignUpInput {
		avatar: String
		username: String!
		name: String
		email: String!
		password: String!
		passwordConfirmation: String!
	}

	input SignInInput {
		email: String!
		password: String!
	}
`;