
const data = {
  projects: [
    {
      _id: 'sad87da79',
      title: 'Job in Netcentric',
      company: 'Netcentric',
      companyWebsite: 'www.google.com',
      location: 'Spain, Barcelona',
      jobTitle: 'Engineer',
      description: 'Doing something, programing....',
      startDate: '01/01/2014',
      endDate: '02/01/2016',
    },
    {
      _id: 'da789ad1',
      title: 'Job in Siemens',
      company: 'Siemens',
      companyWebsite: 'www.google.com',
      location: 'Slovakia, Kosice',
      jobTitle: 'Software Engineer',
      description: 'Responsoble for parsing framework for JSON medical data.',
      startDate: '01/01/2011',
      endDate: '01/01/2013',
    },
    {
      _id: 'sadcxv9',
      title: 'Work in USA',
      company: 'WhoKnows',
      companyWebsite: 'www.google.com',
      location: 'USA, Montana',
      jobTitle: 'Housekeeping',
      description: 'So much responsibility....Overloaaaaaad',
      startDate: '01/01/2010',
      endDate: '01/01/2011',
    },
  ],
};

exports.projectQueries = {
  hello: () => 'Hello World',
  project: ( root, { id, } ) => {
    const portfolio = data.projects.find( project => project._id === id );

    return portfolio;
  },
  projects: () => data.projects,
};

exports.projectMutations = {
  createProject: ( root, { input, } ) => {
    const _id = require( 'crypto' ).randomBytes( 10 ).toString( 'hex' );
    const newProject = { ...input, };
    newProject._id = _id;
    data.projects.push( newProject );

    return newProject;
  },
};