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

const UPDATE_PROJECT_ITEM = gql`
	mutation updateProjectItem( $id: ID ) {
		updateProject(
			id: $id,
			input: {
				title: "Updated title"
				company: "Updated company"
				companyWebsite: "Updated companyWebsite"
				location: "Updated location"
				jobTitle: "Updated jobTitle"
				description: "Updated description"
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

const DELETE_PROJECT_ITEM = gql`
	mutation DeleteProjectItem( $id: ID ) {
		deleteProject( id: $id )
	}
`;

export { CREATE_PROJECT_ITEM, UPDATE_PROJECT_ITEM, DELETE_PROJECT_ITEM };