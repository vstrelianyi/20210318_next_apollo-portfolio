const passport = require( 'passport' );

const authenticateUser = ( req, { email, password, } ) => {
  return new Promise( ( resolve, reject ) => {
    console.log( `Calling authenticateUser: user: ${ email }` );

    const done = ( error, user ) => {
      if ( error ){
        return reject( new Error( error ) );
      }
      if ( user ){
        // req.hello();
        // if we will get a user - we can save session to DB
        req.login( user, ( error ) => {
          if ( error ){
            return reject( new Error( error ) );
          }

          return resolve( user );
        } );

      }
      else {
        return reject ( new Error( 'Invalid email or password' ) );
      }
    };

    const authFunc = passport.authenticate( 'graphql', { email: email, password: password, }, done );
    authFunc();
  } );

};

exports.buildAuthContext = ( req ) => {
  const auth = {
    authenticate: ( options ) => {
      return authenticateUser( req, options );
    },
    signOut: () => req.logout(),
    isAuthenticated: () => req.isAuthenticated(),
    getUser: () => req.user,
  };

  return auth;
};