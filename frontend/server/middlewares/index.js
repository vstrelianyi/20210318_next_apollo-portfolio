const config = require( '../config/dev' );
const session = require( 'express-session' );
const passport = require( 'passport' );

exports.init = ( server, db ) => {
  require( './passport' ).init( passport );

  const sessionOptions = {
    name: 'portfolio-session',
    secret: config.SESSION_SECRET,
    cookie: {
      maxAge: 2 * 60 * 60 * 1000,
    },
    resave: false,
    saveUninitialized: false,
    store: db.initSessionStore(),
  };

  server.use( session( sessionOptions ) );
  server.use( passport.initialize() ); // adds login function to req
  server.use( passport.session() );

  // server.use( ( req, res, next ) => {
  //   req.hello = () => console.log( 'Hello World' );
  //   next();
  // } );

};