import { gql } from '@apollo/client';

const GET_PROJECT_IDS = gql`
	query ProjectIds{
		projects{
			_id
		}
	}
`;

const GET_PROJECTS = gql`
	query Projects{
		projects {
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

const GET_PROJECT = gql`
	query Project( $id: ID ){
		project( id: $id ) {
			_id
			title
			companyWebsite
			location
			jobTitle
			description
			startDate
			endDate
		}
	}
`;

export { GET_PROJECTS, GET_PROJECT_IDS, GET_PROJECT  };