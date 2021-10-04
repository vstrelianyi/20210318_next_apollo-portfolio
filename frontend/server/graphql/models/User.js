class User {
  constructor ( model ) {
    this.Model = model;
  }

  signUp ( signUpData ) {
    if ( signUpData.password !== signUpData.passwordConfirmation ){
      throw new Error( 'Password must be the same as confirmation password' );
    }

    return this.Model.create( signUpData );
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

  signOut () {
    return 'Signing out...';
  }
}

module.exports = User;