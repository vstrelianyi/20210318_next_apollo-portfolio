import axios from 'axios';

import { useLazyQuery } from '@apollo/client';
import { GET_PROJECTS } from '@/queries/index';
import { useEffect, useState } from 'react';

import styleProjects from './Projects.module.scss';
import ProjectCard from '@/components/Projects/ProjectCard/ProjectCard';

const PageProjects = () => {

  const [ projects, setProjects, ] = useState( [] );
  const [ getProjects, { loading, data, }, ] = useLazyQuery( GET_PROJECTS );

  useEffect( () => {
    getProjects();
  }, [] );

  if ( data && data.projects.length > 0 && projects.length === 0 ){
    setProjects( data.projects );
  }

  if ( loading ){
    return <h1>Loading...</h1>;
  }

  const handleCreateProjectBtnClick = async () => {
    const newProject = await createProject();
    setProjects( [ ...projects, newProject, ] );
  };

  const handleUpdateProjectBtnClick = async ( id ) => {
    const updatedProject = await updateProject( id );
    const index = projects.findIndex( project => project._id === id );
    const newProjects = [ ...projects, ];
    newProjects[index] = updatedProject;
    setProjects( newProjects );
  };

  const handleDeleteProjectBtnClick = async ( id ) => {
    console.log( id );
    const deletedProjectId = await deleteProject( id );
    const index = projects.findIndex( project => project._id === deletedProjectId );
    const newProjects = [ ...projects, ];
    newProjects.splice( index, 1 );
    setProjects( newProjects );
  };

  return (
    <>
      <section className="section-title">
        <div className="px-2">
          <div className="pt-5 pb-4">
            <h1>Projects</h1>
          </div>
        </div>
        <button className="btn btn-primary mb-3" onClick={ handleCreateProjectBtnClick }>Create project</button>
      </section>

      <section className={ `${ styleProjects.Projects } pb-5` }>
        <div className="row">
          { projects.length > 0 && projects.map( project =>
            <div className="col-md-4" key={ project._id }>
              <ProjectCard project={ project }/>
              <button
                className="btn btn-warning mx-2"
                onClick={ () => handleUpdateProjectBtnClick( project._id ) }
              >Update Project</button>
              <button
                className="btn btn-danger"
                onClick={ () => handleDeleteProjectBtnClick( project._id ) }
              >Delete Project</button>
            </div> )
          }
        </div>
      </section>

      <a href="" className="btn btn-main bg-blue ttu">See More Projects</a>
      { /* <section className="section-title">
        <div className="px-2">
          <div className="pt-5 pb-4">
            <h1>Ask Me</h1>
          </div>
        </div>
      </section> */ }
    </>
  );
};

export default PageProjects;

export const getStaticProps = async () => {

  return {
    props: {
      data: {
      },
    },
    // revalidate: 1,
  };
};

const serverURL = 'http://localhost:3000/graphql';

const updateProject = ( id ) => {
  const query = `
		mutation updateProjectItem {
			updateProject(
				id: "${ id }",
				input: {
					title: "Updated title"
					company: "Updated company"
					companyWebsite: "Updated companyWebsite"
					location: "Updated location"
					jobTitle: "Updated jobTitle"
					description: "Updated description"
					startDate: "01/01/2020"
					endDate: "01/01/2021"
				}
			)
			{
				_id
				title
				company
				companyWebsite
				location
				jobTitle
				description
				startDate
				endDate
			}
		}
	`;

  return axios.post( serverURL, { query, } )
    .then( ( { data: graph, } ) => graph.data )
    .then( data => data.updateProject );
};

const createProject = () => {
  const query = `
		mutation CreateProjectItem {
			createProject(
				input: {
					title: "new title"
					company: "new company"
					companyWebsite: "new companyWebsite"
					location: "new location"
					jobTitle: "new jobTitle"
					description: "new description"
					startDate: "01/01/2020"
					endDate: "01/01/2021"
				}
			)
			{
				_id
				title
				company
				companyWebsite
				location
				jobTitle
				description
				startDate
				endDate
			}
		}
	`;

  return axios.post( serverURL, { query, } )
    .then( ( { data: graph, } ) => graph.data )
    .then( data => data.createProject );
};

const deleteProject = ( id ) => {
  const query = `
		mutation DeleteProjectItem {
			deleteProject( id: "${ id }" )
		}
	`;

  return axios.post( serverURL, { query, } )
    .then( ( { data: graph, } ) => graph.data )
    .then( data => data.deleteProject );
};