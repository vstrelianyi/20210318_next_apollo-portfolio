import axios from 'axios';
import { useRouter } from 'next/router';

import style from './SinglePortfolio.module.scss';

const PageSinglePortfolio = ( {
  portfolio,
} ) => {

  // const diff = new Date( portfolio.endDate ).getTime() - new Date( portfolio.startDate ).getTime();
  const diff = 0;

  return (
    <div className={ `portfolio-detail ${ style.SinglePortfolio }` }>
      <div className="container">

        <div className="jumbotron">
          <h1 className="display-3">{ portfolio.title }</h1>
          <p className="lead">{ portfolio.jobTitle }</p>
          <p>
            <a className="btn btn-lg btn-success" href="#" role="button">{ portfolio.company }</a>
          </p>
        </div>

        <div className="row marketing">
          <div className="col-lg-6">
            <h4 className="title">Location</h4>
            <p className="text">{ portfolio.location }</p>

            <h4 className="title">Start Date</h4>
            <p className="text">{ portfolio.startDate }</p>
          </div>

          <div className="col-lg-6">
            { /* TODO: days later... */ }
            <h4 className="title">Days</h4>
            <p className="text">{ Math.ceil( diff / ( 1000 * 3600 * 24 ) ) }</p>

            <h4 className="title">End Date</h4>
            <p className="text">{ portfolio.endDate }</p>
          </div>
          <div className="col-md-12">
            <hr />
            <h4 className="title">Description</h4>
            <p>{ portfolio.description }</p>
          </div>
        </div>
      </div>
    </div>

  );
};

export default PageSinglePortfolio;

export const getStaticPaths = async () => {
  const pathsData = [];
  // const portfolios = await fetchPortfolioIds();
  const portfolios = [ { _id: '1', }, { _id: '2', }, ];

  portfolios.forEach( item => {
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
  // console.log( 'SinglePortfolio -> getStaticProps:', params );
  // const portfolio = await fetchPortfolioById( params.id );

  const portfolio = {
    title: 'Title',
    jobTitle: 'jobTitle',
    company: 'company',
    location: 'location',
  };

  return {
    props: {
      portfolio,
    },
    // revalidate: 1,
  };
};

const fetchPortfolioIds = () => {
  const query = `
		query PortfoliosIds{
			portfolios{
				_id
			}
		}
	`;

  return axios.post(
    'http://localhost:3000/graphql',
    {
      query,
    }
  )
    .then(	( { data: graph, } ) => {
      return graph.data.portfolios;
    } );
};

const fetchPortfolioById = ( id ) => {
  const query = `
		query Portfolio( $id: ID){
			portfolio( id: $id ) {
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
  const variables = { id, };

  return axios.post(
    'http://localhost:3000/graphql',
    {
      query,
      variables,
    }
  )
    .then(	( { data: graph, } ) => {
      return graph.data.portfolio;
    } );
};