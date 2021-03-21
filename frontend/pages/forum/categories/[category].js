const Topics = ( { category, } ) => {
  return (
    <>
      <h1>SinglePortfolio { category.id }</h1>
      <section className="section-title">
        <div className="px-2">
          <div className="pt-5 pb-4">
            <h1>Specific Category</h1>
          </div>
        </div>
      </section>
      <section className="fj-topic-list">
        <table className="table table-hover ">
          <thead>
            <tr>
              <th scope="col">Topic</th>
              <th scope="col">Category</th>
              <th scope="col">Author</th>
              <th scope="col">Replies</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th>Some Topic Info</th>
              <td className="category">General Discussion</td>
              <td>Filip Jerga</td>
              <td>2</td>
            </tr>
            <tr>
              <th>Some Topic Info</th>
              <td className="category">General Discussion</td>
              <td>Filip Jerga</td>
              <td>2</td>
            </tr>
            <tr>
              <th>Some Topic Info</th>
              <td className="category">General Discussion</td>
              <td>Filip Jerga</td>
              <td>2</td>
            </tr>
          </tbody>
        </table>
      </section>
    </>
  );

};

export default Topics;

export const getStaticPaths = async () => {
  const pathsData = [ { params: { category: 'general', }, }, ];
  // console.log( 'pathsData', pathsData[0].params.slug );

  return {
    paths: pathsData,
    fallback: false,
  };
};

export const getStaticProps = async ( { params, } ) => {
  // const { params } = context;
  // console.log( 'SinglePortfolio -> getStaticProps:', params );
  const category = { category: params.category, };

  return {
    props: {
      category,
    },
    revalidate: 1,
  };
};