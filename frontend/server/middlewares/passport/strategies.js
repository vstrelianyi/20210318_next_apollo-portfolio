const { Strategy, } = require( 'passport-strategy' );

// get options ( email, password ) needed to authenticate user
// strategy has to have "authenticate" function
// strategy gets a callback function that will contain functionality to verify a user
// stategy has access to "error" "fail" "success" functions
class GraphqlStrategy extends Strategy {
  constructor ( verify ) {
    super();

    if ( !verify ){
      throw new Error( 'Graphql strategy requires a verify callback' );
    }

    this.verify = verify;
    this.name = 'graphql';
  }

  authenticate ( _, options ) {
    const done = ( error, user, info ) => { // receives error/user/info
      if ( error ){
        return this.error( error );
      }
      if ( !user ){
        return this.fail( 401 );
      }

      return this.success( user, info );
    };
    this.verify( options, done );

  }
}

module.exports = GraphqlStrategy;