const mongoose = require( 'mongoose' );
const config = require( '../config/dev' );
const fakeDb = require( './fakeDb' );

mongoose.connect(
  config.DB_URI,
  {},
  async () => {
    console.log( 'Started Populating db' );
    await fakeDb.populate();
    await mongoose.connection.close();
    console.log( 'db has been populated' );
  }
);