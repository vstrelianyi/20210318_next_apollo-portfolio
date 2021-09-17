const mongoose = require( 'mongoose' );
const config = require( '../config/dev' );

require( './models/project' );
require( './models/user' );

exports.connect = () => {
  mongoose.connect(
    config.DB_URI,
    {},
    () => {
      console.log( '> connected to DB' );
    }
  );
};
