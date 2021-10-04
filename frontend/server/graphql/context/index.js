const passport = require( 'passport' );

const authenticateUser = ( { email, password, } ) => {
  return new Promise( ( resolve, reject ) => {
    console.log( `Calling authenticateUser: user: ${ email }` );

    const done = ( error, user ) => {
      if ( error ){
        return reject( new Error( error ) );
      }
      // if we will get a user - we can save session to DB
      if ( user ){
        return resolve( user );
      }
      else {
        return reject ( new Error( 'Invalid email or password' ) );
      }
    };

    const authFunc = passport.authenticate( 'graphql', { email: email, password: password, }, done );
    authFunc();
  } );

};

exports.buildAuthContext = () => {
  const auth = {
    authenticate: ( options ) => {
      return authenticateUser( options );
    },
  };

  return auth;
};