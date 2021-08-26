import axios from 'axios';
import style from './Project.module.scss';

const PageProject = ( {
  project,
} ) => {

  // const diff = new Date( portfolio.endDate ).getTime() - new Date( portfolio.startDate ).getTime();
  const diff = 0;

  return (
    <div className={ `portfolio-detail ${ style.Project }` }>
      <div className="container">

        <div className="jumbotron">
          <h1 className="display-3">{ project.title }</h1>
          <p className="lead">{ project.jobTitle }</p>
          <p>
            <a className="btn btn-lg btn-success" href="#" role="button">{ project.company }</a>
          </p>
        </div>

        <div className="row marketing">
          <div className="col-lg-6">
            <h4 className="title">Location</h4>
            <p className="text">{ project.location }</p>

            <h4 className="title">Start Date</h4>
            <p className="text">{ project.startDate }</p>
          </div>

          <div className="col-lg-6">
            { /* TODO: days later... */ }
            <h4 className="title">Days</h4>
            <p className="text">{ Math.ceil( diff / ( 1000 * 3600 * 24 ) ) }</p>

            <h4 className="title">End Date</h4>
            <p className="text">{ project.endDate }</p>
          </div>
          <div className="col-md-12">
            <hr />
            <h4 className="title">Description</h4>
            <p>{ project.description }</p>
          </div>
        </div>
      </div>
    </div>

  );
};

export default PageProject;

const serverURL = 'http://localhost:3000/graphql';

export const getStaticPaths = async () => {
  const pathsData = [];
  const projects = await fetchProjectIds();

  projects.forEach( item => {
    pathsData.push( { params: { id: item._id, }, } );
  } );

  // console.log( 'pathsData', pathsData[0].params.slug );

  return {
    paths: pathsData,
    fallback: false,
  };
};

export const getStaticProps = async ( { params, } ) => {
  // const { params } = context;
  // console.log( params );
  const project = await fetchProjectById( params.id );

  return {
    props: {
      project,
    },
    // revalidate: 1,
  };
};

const fetchProjectIds = () => {
  const query = `
		query ProjectIds{
			projects{
				_id
			}
		}
	`;

  return axios.post(
    serverURL,
    {
      query,
    }
  )
    .then( response => {
      return response.data.data.projects;
    } );
};

const fetchProjectById = ( id ) => {
  const query = `
		query Project( $id: ID){
			project( id: $id ) {
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
  const variables = {
    id: id,
  };

  return axios.post(
    serverURL,
    {
      query,
      variables,
    }
  )
    .then( response => {
      return response.data.data.project;
    } );
};