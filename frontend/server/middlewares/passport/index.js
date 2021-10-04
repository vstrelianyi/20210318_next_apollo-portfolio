const GraphqlStrategy = require( './strategies' );
const User = require( '../../database/models/user' );

exports.init = ( passport ) => {
  passport.use( 'graphql', new GraphqlStrategy( ( options, done ) => {
    const { email, password, } = options;
    console.log( 'passport.js: GraphqlStrategy: ', email, password );
    User.findOne( { email,  }, ( error, user ) => {
      if ( error ){
        return done( error );
      }
      if ( !user ){
        return done( null, false );
      }

      // TODO: check user password if its matching password from options
      // return done( null, user ); // first param of done is reserved for "error", second for "user"
      user.validatePassword( password, ( error, isMatching ) => {
        if ( error ){
          return done( error );
        }
        if ( !isMatching ){
          return done( null, false );
        }

        return done( null, user );
      } );
    } );
  } ) );

  passport.use( 'graphql-facebook', new GraphqlStrategy( ( options, done ) => {
    console.log( 'Calling verify func of strategy' );

    // 1.Find user in DB and if user exists verify user password
    // 2.If user is verified then call done func

    if ( true ){
      // first param of done is reserved for "error", second for "user"
      done();
    }
  } ) );

  passport.use( 'graphql-google', new GraphqlStrategy( ( options, done ) => {
    console.log( 'Calling verify func of strategy' );

    // 1.Find user in DB and if user exists verify user password
    // 2.If user is verified then call done func

    if ( true ){
      // first param of done is reserved for "error", second for "user"
      done();
    }
  } ) );
};