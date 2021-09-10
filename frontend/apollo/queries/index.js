import { gql } from '@apollo/client';

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

export default GET_PROJECT;