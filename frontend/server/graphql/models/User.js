class User {
  constructor ( model ) {
    this.Model = model;
  }

  getAuthUser ( ctx ) {
    if ( ctx.isAuthenticated() ){
      return ctx.getUser();
    }

    return null;
  }

  async signUp ( signUpData ) {
    if ( signUpData.password !== signUpData.passwordConfirmation ){
      throw new Error( 'Password must be the same as confirmation password' );
    }
    try {
      return await this.Model.create( signUpData );
    }
    catch ( error ){
      console.log( 'server -> graphql -> models -> User.js -> error:', error );
      throw new Error( 'User with this email already exists' );
    }
  }

  async signIn ( signInData, ctx ) {
    // console.log('models: User.js: signIn: signInData:', signInData)
    try {
      const user = await ctx.authenticate( signInData );
      // console.log( 'models: User.js: signIn', user );

      return user;
    }
    catch ( error ){
      console.log( 'models/User.js: signIn: error', error );

      return error;
    }
  }

  signOut ( ctx ) {
    try {
      console.log( 'Before signOut: is authenticated: ', ctx.isAuthenticated() );
      console.log( 'user:', ctx.getUser() );
      ctx.signOut();
      console.log( 'After signOut: is authenticated', ctx.isAuthenticated()  );
      console.log( 'user:', ctx.getUser() );

      return true;
    }
    catch ( error ){
      return false;
    }
  }
}

module.exports = User;