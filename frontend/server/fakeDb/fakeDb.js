const { projects, users, } = require( './data' );

const Project = require( '../database/models/project' );
const User = require( '../database/models/user' );

class FakeDb {
  async populate () {
    await this.clean();
    await this.addData();
  }

  async addData () {
    await Project.create( projects );
    await User.create( users );
  }

  async clean () {
    await Project.deleteMany();
    await User.deleteMany();
  }
}

module.exports = new FakeDb();