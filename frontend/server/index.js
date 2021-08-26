const express = require( 'express' );
const next = require( 'next' );

const { graphqlHTTP, } = require( 'express-graphql' );
const { buildSchema, } = require( 'graphql' );

const port = parseInt( process.env.PORT, 10 ) || 3000;
const dev = process.env.NODE_ENV !== 'production';
const app = next( {
  dev,
} );
const handle = app.getRequestHandler();

//resolvers
const { projectResolvers, } = require( './graphql/resolvers' );
const { projectTypes, } = require( './graphql/types' );

app.prepare().then( () => {
  const server = express();

  // construct a schema, using GRAPHQL schema language
  // ! - non-nullable
  const schema = buildSchema( `
		${ projectTypes }
		type Query {
			hello: String
			project( id: ID ): Project
			projects: [Project]
		}

		type Mutation {
			createProject( input: ProjectInput ): Project
		}
	` );

  // the root provides a resolver for each API endpoint
  const root = { ...projectResolvers, };

  server.use( '/graphql', graphqlHTTP( {
    schema: schema,
    rootValue: root,
    graphiql: true,
  } ) );

  server.all( '*', ( req, res ) => {
    return handle( req, res );
  } );

  server.listen( port, ( err ) => {
    if ( err ) throw err;
    console.log( `> Ready on http://localhost:${ port }` );
  } );
} );