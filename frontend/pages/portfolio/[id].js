const SinglePortfolio = ( { portfolio, } ) => {
  return (
    <h1>SinglePortfolio { portfolio.id }</h1>
  );
};

export default SinglePortfolio;

export const getStaticPaths = async () => {
  const pathsData = [ { params: { id: 'sdfasdf', }, }, ];
  // console.log( 'pathsData', pathsData[0].params.slug );

  return {
    paths: pathsData,
    fallback: false,
  };
};

export const getStaticProps = async ( { params, } ) => {
  // const { params } = context;
  // console.log( 'SinglePortfolio -> getStaticProps:', params );
  const portfolio = { id: params.id, };

  return {
    props: {
      portfolio,
    },
    revalidate: 1,
  };
};
