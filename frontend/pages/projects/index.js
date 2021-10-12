import { useEffect, useState } from 'react';

import {
  useGetProjects,
  useUpdateProject,
  useDeleteProject,
  useCreateProject
} from '@/apollo/actions/index';

import styleProjects from './Projects.module.scss';
import ProjectCard from '@/components/Projects/ProjectCard/ProjectCard';

import {
// gql,
// useQuery,
// useLazyQuery
} from '@apollo/client';

import client from '@/apollo/apollo-client';

import Link from 'next/link';

import { GET_PROJECTS } from '@/apollo/queries/index';

const PageProjects = ( { pageData, } ) => {

  const [ projects, setProjects, ] = useState( [ ...pageData.projects, ] );

  const { data, } = useGetProjects();

  const [ updateProject, ] = useUpdateProject();
  const [ deleteProject, ] = useDeleteProject();
  const [ createProject, ] = useCreateProject();

  useEffect( () => {
    // getProjects();
  }, [] );

  useEffect( () => {
    // console.log( 'pageData.projects:', projects );
  }, [ projects, ] );

  if ( data && data.projects.length > 0 && ( projects.length === 0 || data.projects.length !== projects.length ) ){
    // console.log( 'data', data );
    setProjects( [ ... data.projects, ] );
  }

  const handleCreateProjectBtnClick = async () => {
    const response = await createProject();
    const newProject = response.data.createProject;
    // console.log( 'handleCreateProjectBtnClick: ', newProject );
    setProjects( [ ...projects, newProject, ] );
  };

  const handleUpdateProjectBtnClick = async ( id ) => {

    const response = await updateProject( { variables: { id: id, }, } );
    const updatedProject = response.data.updateProject;

    // console.log( 'handleUpdateProjectBtnClick', updatedProject );
    const index = projects.findIndex( project => project._id === id );
    const newProjects = [ ...projects, ];
    newProjects[index] = updatedProject;
    setProjects( newProjects );
  };

  const handleDeleteProjectBtnClick = async ( id ) => {
    const response = await deleteProject( { variables: { id: id, }, } );
    // console.log( 'handleDeleteProjectBtnClick: ', response );
    const deletedProjectId = response.data.deleteProject._id;

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
        <Link href="/projects/new"><a className="btn btn-primary mb-3">Create project</a></Link>
        { /* <button className="btn btn-primary mb-3" onClick={ handleCreateProjectBtnClick }>Create project</button> */ }
      </section>

      <section className={ `${ styleProjects.Projects } pb-5` }>
        <div className="row">

          { projects?.length > 0 && projects.map( project =>
            <div className="col-md-4" key={ project._id } data-key={ project._id }>
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

export const getStaticProps = async ( context ) => {
  console.log( context );

  const { data, } = await client.query( { query: GET_PROJECTS, } );

  return {
    props: {
      pageData: {
        projects: data.projects,
      },
    },
    revalidate: 1,
  };
};
