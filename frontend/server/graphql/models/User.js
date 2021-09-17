class User {
  constructor ( model ) {
    this.Model = model;
  }

  async signUp ( signUpData ) {
    return 'Signing up...';
  }

  signIn () {
    return 'Signing in...';
  }

  signOut () {
    return 'Signing out...';
  }
}

module.exports = User;