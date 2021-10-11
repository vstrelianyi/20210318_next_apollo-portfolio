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
				startDate: "2012-12-12T23:59Z"
				endDate: "2014-11-12T23:59Z"
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
				startDate: "2012-12-12T23:59Z"
				endDate: "2014-11-12T23:59Z"
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
		deleteProject( id: $id ){
			_id
		}
	}
`;

// AUTH MUTATIONS
const SIGN_UP = gql `
	mutation SignUp(
		$avatar: String
		$email: String!
		$username: String!
		$password: String!
		$passwordConfirmation: String!
	){
		signUp( input:{
			avatar: $avatar
			email: $email
			username: $username
			password: $password
			passwordConfirmation: $passwordConfirmation
		} )
	}
`;

const SIGN_IN = gql `
	mutation SignIn(
		$email: String!
		$password: String!
	) {
		signIn( input: {
			email: $email
			password: $password
		} ) {
			_id
			username
			role
			avatar
		}
	}
`;

const SIGN_OUT = gql `mutation SignOut{ signOut }`;

export { CREATE_PROJECT_ITEM, UPDATE_PROJECT_ITEM, DELETE_PROJECT_ITEM, SIGN_UP, SIGN_IN, SIGN_OUT };