const { projects, } = require( './data' );

const Project = require( '../database/models/project' );

class FakeDb {
  async populate () {
    await this.clean();
    await this.addData();
  }

  async addData () {
    await Project.create( projects );
  }

  async clean () {
    await Project.deleteMany();
  }
}

module.exports = new FakeDb();