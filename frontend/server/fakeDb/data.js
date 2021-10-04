const mongoose = require( 'mongoose' );
const user1Id = mongoose.Types.ObjectId();
const user2Id = mongoose.Types.ObjectId();

const data = {
  users: [
    {
      _id: user1Id,
      avatar: 'https://cdn-icons-png.flaticon.com/512/194/194938.png',
      email: 'admin@gmail.com',
      name: 'Admin2000',
      username: 'admin2000',
      info: 'Hello, I am an admin',
      password: '123456',
      role: 'admin',
      // confirmPassword: '123456',
    },
    {
      _id: user2Id,
      avatar: 'https://cdn-icons-png.flaticon.com/512/194/194938.png',
      email: 'test@gmail.com',
      name: 'Tester2000',
      username: 'tester2000',
      info: 'Hello, I am a tester',
      password: '123456',
      role: 'tester',
      // confirmPassword: '123456',
    },
  ],
  projects: [
    {
      title: 'Job in Netcentric',
      company: 'Netcentric',
      companyWebsite: 'www.google.com',
      location: 'Spain, Barcelona',
      jobTitle: 'Engineer',
      description: 'Doing something, programing....',
      startDate: '01/01/2014',
      endDate: '02/01/2016',
      user: user1Id,
    },
    {
      title: 'Job in Siemens',
      company: 'Siemens',
      companyWebsite: 'www.google.com',
      location: 'Slovakia, Kosice',
      jobTitle: 'Software Engineer',
      description: 'Responsoble for parsing framework for JSON medical data.',
      startDate: '01/01/2011',
      endDate: '01/01/2013',
      user: user2Id,
    },
    {
      title: 'Work in USA',
      company: 'WhoKnows',
      companyWebsite: 'www.google.com',
      location: 'USA, Montana',
      jobTitle: 'Housekeeping',
      description: 'So much responsibility....Overloaaaaaad',
      startDate: '01/01/2010',
      endDate: '01/01/2011',
      user: user1Id,
    },
  ],
};

module.exports = data;