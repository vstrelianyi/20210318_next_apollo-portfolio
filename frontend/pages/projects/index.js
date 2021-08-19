import axios from 'axios';
import Link from 'next/link';

import { useState } from 'react';

import styleProjects from './Projects.module.scss';
import styleProjectCard from './ProjectCard.module.scss';

const PageProjects = ( { data, } ) => {

  const [ projects, setProjects, ] = useState( data.projects );

  const handleCreatePortfolioBtnClick = async () => {
    const newPortfolio = await createPortfolio();
    setProjects( [ ...projects, newPortfolio, ] );
  };

  const handleUpdateProjectBtnClick = async ( id ) => {
    const updatedProjects = await updateProject( id );
    const index = projects.findIndex( portfolio => portfolio._id === id );
    const newProjects = [ ...projects, ];
    newProjects[index] = updatedProjects;
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
        <button className="btn btn-primary" onClick={ handleCreatePortfolioBtnClick }>Create project</button>
      </section>

      <section className={ `${ styleProjects.Projects } pb-5` }>
        <div className="row">
          { projects.length > 0 && projects.map( project => <ProjectCard key={ project._id } project={ project } handleUpdateProjectBtnClick={ handleUpdateProjectBtnClick }/> ) }
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

const ProjectCard = ( { project, handleUpdatePortfolioBtnClick, } ) => {
  return (
    <div className="col-md-4">
      <Link href={ `/projects/${ project._id }` }>
        <a className={ `ProjectCard ${ styleProjectCard.ProjectCard }` }>
          <div className="card subtle-shadow no-border">
            <div className="card-body">
              <h5 className="card-title">{ project.title }</h5>
              <h6 className="card-subtitle mb-2 text-muted">{ project.jobTitle }</h6>
              <p className="card-text fs-2">{ project.description }</p>
            </div>
            <div className="card-footer no-border">
              <small className="text-muted">{ `${ project.startDate } - ${ project.endDate }` }</small>
            </div>
          </div>
        </a>
      </Link>
      <button className="btn btn-warning" onClick={ () => handleUpdatePortfolioBtnClick( project._id ) }>Update Project</button>
    </div>
  );
};

export const getStaticProps = async () => {
  // console.log( 'getStaticProps Portfolio' );
  // const portfolios = await fetchPortfolios();
  const projects = [
    { id: 0, title: 'Project 1', },
    { id: 1, title: 'Project 2', },
  ];

  return {
    props: {
      data: {
        projects,
      },
    },
    revalidate: 1,
  };
};

const updateProject = ( id ) => {
  const query = `
		mutation updatePortfolioItem {
			updatePortfolio(
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

  return axios.post( 'http://localhost:3000/graphql', { query, } )
    .then( ( { data: graph, } ) => graph.data )
    .then( data => data.updatePortfolio );
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

  return axios.post( 'http://localhost:3000/graphql', { query, } )
    .then( ( { data: graph, } ) => graph.data )
    .then( data => data.createPortfolio );
};

const fetchProjects = () => {
  const query = `
		query Projects{
			projects {
				_id
				title
				companyWebsite
				location
				jobTitle
				description
				startDate
				endDate
			}
		}
	`;

  return axios.post( 'http://localhost:3000/graphql', { query, } )
    .then(	( { data: graph, } ) => {
      return graph.data.portfolios;
    } );
};