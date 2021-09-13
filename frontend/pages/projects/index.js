import { useLazyQuery, useMutation } from '@apollo/client';
import { GET_PROJECTS } from '@/queries/index';
import { useEffect, useState } from 'react';

import { CREATE_PROJECT_ITEM, UPDATE_PROJECT_ITEM, DELETE_PROJECT_ITEM } from '@/mutations/index';

import styleProjects from './Projects.module.scss';
import ProjectCard from '@/components/Projects/ProjectCard/ProjectCard';

import withApollo from '@/hoc/withApollo';

const PageProjects = () => {

  const [ projects, setProjects, ] = useState( [] );
  const [ getProjects, { loading, data, }, ] = useLazyQuery( GET_PROJECTS );
  const [ updateProject, ] = useMutation( UPDATE_PROJECT_ITEM );
  const [ deleteProject, ] = useMutation(
    DELETE_PROJECT_ITEM,
    {
      update ( cache, { data: { deleteProject, }, } ) {
        const { projects, } = cache.readQuery( { query: GET_PROJECTS, } );
        const newProjects = projects.filter( p => p._id !== deleteProject );
        cache.writeQuery( {
          query: GET_PROJECTS,
          data: { projects: newProjects, },
        } );
      },
    }
  );

  const [ createProject, ] = useMutation(
    CREATE_PROJECT_ITEM,
    {
      update ( cache, { data, } ) {
        const { projects, } = cache.readQuery( { query: GET_PROJECTS, } );
        cache.writeQuery( {
          query: GET_PROJECTS,
          data: { projects: [ ...projects, data.createProject, ], },
        } );
      },
    }
  );

  // const onProjectCreated = ( dataCreated  ) => {
  //   setProjects( [ ...projects, dataCreated.createProject, ] );
  // };

  // const [ createProject, ] = useMutation(
  //   CREATE_PROJECT_ITEM,
  //   {
  //     onCompleted: onProjectCreated,
  //   }
  // );

  useEffect( () => {
    getProjects();
  }, [] );

  useEffect( () => {
    console.log( projects );
  }, [ projects, ] );

  if ( data && data.projects.length > 0 && ( projects.length === 0 || data.projects.length !== projects.length ) ){
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
    const updatedProject = await updateProject( { variables: { id: id, }, } );

    const index = projects.findIndex( project => project._id === id );
    const newProjects = [ ...projects, ];
    newProjects[index] = updatedProject.data.updateProject;
    setProjects( newProjects );
  };

  const handleDeleteProjectBtnClick = async ( id ) => {
    const deletedProjectId = await deleteProject( { variables: { id: id, }, } );
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

export default withApollo( PageProjects );

export const getStaticProps = async () => {

  return {
    props: {
      data: {
      },
    },
    // revalidate: 1,
  };
};
