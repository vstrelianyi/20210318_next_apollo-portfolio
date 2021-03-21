import axios from 'axios';

const Portfolio = ( { portfolios, } ) => {

  return (
    <>
      <section className="section-title">
        <div className="px-2">
          <div className="pt-5 pb-4">
            <h1>Portfolios</h1>
          </div>
        </div>
      </section>
      <section className="pb-5">
        <div className="row">

          { portfolios.length > 0 && portfolios.map( portfolio => <PortfolioCard  key={ portfolio._id } portfolio={ portfolio }/> ) }

        </div>
      </section>
      <a href="" className="btn btn-main bg-blue ttu">See More Portfolios</a>
      <section className="section-title">
        <div className="px-2">
          <div className="pt-5 pb-4">
            <h1>Ask Me</h1>
          </div>
        </div>
      </section>
    </>
  );
};

export default Portfolio;

const PortfolioCard = ( { portfolio, } ) => {
  return (
    <div className="col-md-4">
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
    </div>
  );
};

export const getStaticProps = async () => {
  // console.log( 'getStaticProps Portfolio' );
  const portfolios = await fetchPortfolios();

  return {
    props: {
      portfolios,
    },
    revalidate: 1,
  };
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