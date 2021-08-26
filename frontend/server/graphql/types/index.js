exports.projectTypes = `
	type Project{
		_id: ID!
		title: String!
		company: String!
		companyWebsite: String
		location: String
		jobTitle: String
		description: String
		startDate: String
		endDate: String
	}

	input ProjectInput {
		title: String!
		company: String!
		companyWebsite: String
		location: String
		jobTitle: String
		description: String
		startDate: String
		endDate: String
	}
`;