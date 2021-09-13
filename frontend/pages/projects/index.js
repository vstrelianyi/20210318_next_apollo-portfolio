import { useEffect, useState } from 'react';

import { useGetProjects, useUpdateProject, useDeleteProject, useCreateProject } from '@/actions/index';

import styleProjects from './Projects.module.scss';
import ProjectCard from '@/components/Projects/ProjectCard/ProjectCard';

import withApollo from '@/hoc/withApollo';

import { gql, useQuery } from '@apollo/client';

const GET_PROJECTS = gql`
	query Projects{
		projects {
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

const PageProjects = () => {

  const [ projects, setProjects, ] = useState( [] );
  // const [ getProjects, { loading, data, }, ] = useLazyQuery( GET_PROJECTS );

  // const { data, } = useGetProjects( );
  const [ updateProject, ] = useUpdateProject();
  const [ deleteProject, ] = useDeleteProject();
  const [ createProject, ] = useCreateProject();

  useEffect( () => {
    // getProjects();
  }, [] );

  useEffect( () => {
    console.log( projects );
  }, [ projects, ] );

  // if ( data && data.projects.length > 0 && ( projects.length === 0 || data.projects.length !== projects.length ) ){
  //   setProjects( data.projects );
  // }

  // if ( loading ){
  //   return <h1>Loading...</h1>;
  // }

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
  const { loading, error, data, } = useQuery( GET_PROJECTS );

  return {
    props: {
      data: {
      },
    },
    // revalidate: 1,
  };
};
