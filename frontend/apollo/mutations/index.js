import { gql } from '@apollo/client';

const CREATE_PROJECT_ITEM = gql`
	mutation CreateProjectItem {
		createProject(
			input: {
				title: "new title"
				company: "new company"
				companyWebsite: "new companyWebsite"
				location: "new location"
				jobTitle: "new jobTitle"
				description: "new description"
				startDate: "01/01/2020"
				endDate: "01/01/2021"
			}
		)
		{
			_id
			title
			company
			companyWebsite
			location
			jobTitle
			description
			startDate
			endDate
		}
	}
`;

export { CREATE_PROJECT_ITEM };