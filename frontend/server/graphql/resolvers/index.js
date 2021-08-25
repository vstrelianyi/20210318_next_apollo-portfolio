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
  hello: () => {
    return 'Hello world';
  },
  project: ( root, { id, } ) => {
    const project = data.projects.find( project => project._id === id );

    return project !== undefined ? project : [];
  },
  projects: () => {
    return data.projects;
  },
};

exports.projectMutations = {
  createProject: ( root, { input, } ) => {
    const _id = require( 'crypto' ).randomBytes( 10 ).toString( 'hex' );
    const newProject = { _id, ...input, };
    data.projects.push( newProject );

    return newProject;
  },
  updateProject: ( root, { id, input, } ) => {
    const index = data.projects.findIndex( project => project._id === id );
    const oldProject = data.projects[index];
    const updatedProject = { ...oldProject, ...input, };
    data.projects[index] = updatedProject;

    return updatedProject;
  },
};