const express = require( 'express' );
const next = require( 'next' );

const { ApolloServer, gql, } = require( 'apollo-server-express' );

const port = parseInt( process.env.PORT, 10 ) || 3000;
const dev = process.env.NODE_ENV !== 'production';
const app = next( {
  dev,
} );
const handle = app.getRequestHandler();

//resolvers
const { projectQueries, projectMutations, } = require( './graphql/resolvers' );
const { projectTypes, } = require( './graphql/types' );

app.prepare().then( async () => {
  const server = express();

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
			deleteProject( id: ID ): ID
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

  const apolloServer = new ApolloServer( { typeDefs, resolvers, } );
  await apolloServer.start();
  apolloServer.applyMiddleware( { app: server, } );

  server.all( '*', ( req, res ) => {
    return handle( req, res );
  } );

  server.listen( port, ( err ) => {
    if ( err ) throw err;
    console.log( `> Ready on http://localhost:${ port }` );
  } );
} );