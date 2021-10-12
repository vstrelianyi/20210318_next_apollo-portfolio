import { ApolloProvider } from '@apollo/client';
import client from '@/apollo/apollo-client';
import { useEffect } from 'react';

/**
 * A HOC that wraps a page and adds certain static props to it
 *
 * @function withApollo
 * @param Component - a React component (page)
 * @returns {ReactElement}
 */
const withApollo = ( Component ) => {
  console.log( Component );
  const wrappedComponent = ( props ) => {
    useEffect( () => {
      console.log( 'withApollo -> wrappedComponent -> props:', props );
    }, [] );

    return (
      <ApolloProvider client={ client }>
        <Component { ...props }/>
      </ApolloProvider>
    );
  };

  return wrappedComponent;
};

export default withApollo;