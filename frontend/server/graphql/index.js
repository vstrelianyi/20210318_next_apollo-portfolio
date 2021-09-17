const mongoose = require( 'mongoose' );
const { ApolloServer, gql, } = require( 'apollo-server-express' );

//resolvers
const {
  projectQueries,
  projectMutations,
  userMutations,
} = require( './resolvers' );
const { projectTypes, userTypes, } = require( './types' );

// GraphqlModels
const Project = require( './models/Project' );
const User = require( './models/User' );

exports.createApolloServer = () => {
  // construct a schema, using GRAPHQL schema language
  const typeDefs = gql`
		${ projectTypes }
		${ userTypes }
		type Query {
			hello: String
			project( id: ID ): Project
			projects: [Project]
		}

		type Mutation {
			updateProject( id: ID, input: ProjectInput ): Project
			createProject( input: ProjectInput ): Project
			deleteProject( id: ID ): Project

			signUp( input: SignUpInput): String
			signIn: String
			signOut: String
		}
	`;

  // the root provides a resolver for each API endpoint
  const resolvers = {
    Query: {
      ...projectQueries,
    },
    Mutation: {
      ...projectMutations,
      ...userMutations,
    },
  };

  const apolloServer = new ApolloServer( {
    typeDefs,
    resolvers,
    context: () => ( {
      models: {
        Project: new Project( mongoose.model( 'Project' ) ),
        User: new User( mongoose.model( 'User ' ) ),
      },
    } ), // will be provided to all resolvers
  } );

  return apolloServer;
};