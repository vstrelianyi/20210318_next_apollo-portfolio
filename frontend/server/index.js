const express = require( 'express' );
const next = require( 'next' );

const port = parseInt( process.env.PORT, 10 ) || 3000;
const dev = process.env.NODE_ENV !== 'production';
const app = next( {
  dev,
} );
const handle = app.getRequestHandler();

// Connect to DB
require( './database' ).connect();

app.prepare().then( async () => {
  const server = express();

  const apolloServer = require( './graphql' ).createApolloServer();

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