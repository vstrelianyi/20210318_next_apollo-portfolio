import axios from 'axios';
import Link from 'next/link';

import { useState } from 'react';

import stylePortfolio from './Portfolios.module.scss';
import stylePortfolioCard from './PortfolioCard.module.scss';

const PagePortfolios = ( { data, } ) => {

  const [ portfolios, setPortfolios, ] = useState( data.portfolios );

  const handleCreatePortfolioBtnClick = async () => {
    const newPortfolio = await createPortfolio();
    setPortfolios( [ ...portfolios, newPortfolio, ] );
  };

  const handleUpdatePortfolioBtnClick = async ( id ) => {
    const updatedPortfolio = await updatePortfolio( id );
    const index = portfolios.findIndex( portfolio => portfolio._id === id );
    const newPortfolios = [ ...portfolios, ];
    newPortfolios[index] = updatedPortfolio;
    setPortfolios( newPortfolios );
  };

  return (
    <>
      <section className="section-title">
        <div className="px-2">
          <div className="pt-5 pb-4">
            <h1>Portfolios</h1>
          </div>
        </div>
        <button className="btn btn-primary" onClick={ handleCreatePortfolioBtnClick }>Create portfolio</button>
      </section>

      <section className={ `${ stylePortfolio.Portfolios } pb-5` }>
        <div className="row">
          { portfolios.length > 0 && portfolios.map( portfolio => <PortfolioCard key={ portfolio._id } portfolio={ portfolio } handleUpdatePortfolioBtnClick={ handleUpdatePortfolioBtnClick }/> ) }
        </div>
      </section>

      <a href="" className="btn btn-main bg-blue ttu">See More Portfolios</a>
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

export default PagePortfolios;

const PortfolioCard = ( { portfolio, handleUpdatePortfolioBtnClick, } ) => {
  return (
    <div className="col-md-4">
      <Link href={ `/portfolio/${ portfolio._id }` }>
        <a className={ `PortfolioCard ${ stylePortfolioCard.PortfolioCard }` }>
          <div className="card subtle-shadow no-border">
            <div className="card-body">
              <h5 className="card-title">{ portfolio.title }</h5>
              <h6 className="card-subtitle mb-2 text-muted">{ portfolio.jobTitle }</h6>
              <p className="card-text fs-2">{ portfolio.description }</p>
            </div>
            <div className="card-footer no-border">
              <small className="text-muted">{ `${ portfolio.startDate } - ${ portfolio.endDate }` }</small>
            </div>
          </div>
        </a>
      </Link>
      <button className="btn btn-warning" onClick={ () => handleUpdatePortfolioBtnClick( portfolio._id ) }>Update Portfolio</button>
    </div>
  );
};

export const getStaticProps = async () => {
  // console.log( 'getStaticProps Portfolio' );
  // const portfolios = await fetchPortfolios();
  const portfolios = [
    { id: 0, title: 'Portfolio 1', },
    { id: 1, title: 'Portfolio 2', },
  ];

  return {
    props: {
      data: {
        portfolios,
      },
    },
    revalidate: 1,
  };
};

const updatePortfolio = ( id ) => {
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

const createPortfolio = () => {
  const query = `
		mutation CreatePortfolioItem {
			createPortfolio(
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

const fetchPortfolios = () => {
  const query = `
		query Portfolios{
			portfolios {
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