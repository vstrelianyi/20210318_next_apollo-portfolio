const Project = require( '../../database/models/project' );

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
  // project: ( root, { id, } ) => {
  // const project = data.projects.find( project => project._id === id );

  // return project;
  // },

  project: async ( root, { id, } ) => {
    return await Project.findById( id );
  },
  // projects: () => data.projects,
  projects: async () => {
    return await Project.find( {} );
  },
};

exports.projectMutations = {
  // createProject: ( root, { input, } ) => {
  //   const _id = require( 'crypto' ).randomBytes( 10 ).toString( 'hex' );
  //   const newProject = { ...input, };
  //   newProject._id = _id;
  //   data.projects.push( newProject );

  //   return newProject;
  // },
  createProject: async ( root, { input, } ) => {
    const createdProject = await Project.create( input );

    return createdProject;
  },
  // updateProject: ( root, { id, input, } ) => {
  //   const index = data.projects.findIndex( project => project._id === id );
  //   const oldProject = data.projects[index];
  //   const newProject = { ...oldProject, ...input, };
  //   data.projects[index] = newProject;

  //   return newProject;
  // },
  updateProject: async ( root, { id, input, } ) => {
    const updatedProject = await Project.findOneAndUpdate( { _id: id, }, input, { new: true, } );

    return updatedProject;
  },
  // deleteProject: async ( root, { id, } ) => {
  //   const index = data.projects.findIndex( project => project._id === id );
  //   const deletedProject = data.projects[index];
  //   data.projects.splice( index, 1 );

  //   return deletedProject;
  // },

  deleteProject: async ( root, { id, } ) => {
    const deletedProject = await Project.findOneAndRemove( { _id: id, } );

    return deletedProject;
  },
};