const mongoose = require( 'mongoose' );
const Schema = mongoose.Schema;

const bcrypt = require( 'bcryptjs' );
const { deleteOne, } = require( './project' );

const userSchema = new Schema( {
  avatar: { type: String, },
  email: {
    type: String,
    index: true,
    required: 'Email is required',
    lowercase: true,
    unique: true,
    match: [ /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address', ],
    maxlength: 100,
  },
  name: {
    type: String,
    minlength: [ 6, 'Minimum name length is 6 characters', ],
  },
  username: {
    type: String,
    required: true,
    minlength: [ 6, 'Minimum username length is 6 characters', ],
  },
  password: {
    type: String,
    minlength: [ 6, 'Minimum password length is 6 characters', ],
    maxlength: [ 32, 'Maximum password length is 32 characters', ],
    required: true,
  },
  role: {
    enum: [ 'guest', 'admin', 'instructor', 'tester', ],
    type: String,
    required: true,
    default: 'guest',
  },
  info: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },

} );

userSchema.pre( 'save', function ( next ) {
  const user = this;

  bcrypt.genSalt( 10, function ( err, salt ) {
    if ( err ){
      return next( err );
    }
    bcrypt.hash( user.password, salt, function ( err, hash ) {
      if ( err ){
        return next( err );
      }
      user.password = hash;
      next();
    } );
  } );
} );

userSchema.methods.validatePassword = function ( passwordForValidation, done ) {
  bcrypt.compare( passwordForValidation, this.password, function ( error, isSuccess ) {
    if ( error ){
      return deleteOne( error );
    }

    return  done( null, isSuccess );
  } );
};

module.exports = mongoose.model( 'User', userSchema );