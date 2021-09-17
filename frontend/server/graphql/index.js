const mongoose = require( 'mongoose' );
const { ApolloServer, gql, } = require( 'apollo-server-express' );

//resolvers
const { projectQueries, projectMutations, } = require( './resolvers' );
const { projectTypes, } = require( './types' );

// GraphqlModels
const Project = require( './models/Project' );

exports.createApolloServer = () => {
  // construct a schema, using GRAPHQL schema language
  const typeDefs = gql`
		${ projectTypes }
		type Query {
			hello: String
			project( id: ID ): Project
			projects: [Project]
		}

		type Mutation {
			updateProject( id: ID, input: ProjectInput ): Project
			createProject( input: ProjectInput ): Project
			deleteProject( id: ID ): Project
		}
	`;

  // the root provides a resolver for each API endpoint
  const resolvers = {
    Query: {
      ...projectQueries,
    },
    Mutation: {
      ...projectMutations,
    },
  };

  const apolloServer = new ApolloServer( {
    typeDefs,
    resolvers,
    context: () => ( {
      models: {
        Project: new Project( mongoose.model( 'Project' ) ),
      },
    } ), // will be provided to all resolvers
  } );

  return apolloServer;
};