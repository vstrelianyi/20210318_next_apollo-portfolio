import { useEffect } from 'react';

/**
 * A HOC that wraps a page and adds certain static props to it
 *
 * @function withStaticProps
 * @param Component - a React component (page)
 * @returns {ReactElement}
 */
const withStaticProps = ( Page ) => {
  const wrappedPage = ( props ) => {
    useEffect( () => {
      console.log( 'withStaticProps -> wrappedPage -> props:', props );
    }, [] );

    return (
      <Page { ...props }/>
    );
  };

  return wrappedPage;
};

export const getStaticProps = async ( context ) => {
  console.log( `HOC context: ${ context }` );

  return {
    pageProps: {
      navItems: [
        { databaseId: 0, name: 'Projects', url: '/projects', },
        { databaseId: 1, name: 'Forum', url: '/forum/categories', },
        { databaseId: 2, name: 'Cv', url: '/cv', },
        { databaseId: 3, name: 'Ask me', url: '/ask-me', },
      ],
      // ...initialProps.pageProps,
    },
  };
};

export default withStaticProps;