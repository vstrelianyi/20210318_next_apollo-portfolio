/* eslint-disable react/display-name, */

import { useGetUser } from '@/apollo/actions';
import Redirect from '@/components/Redirect/Redirect';

const withAuth = ( WrappedComponent, roles ) => ( props ) => {
  const { data: { user, } = {}, loading, error, } = useGetUser( { fetchPolicy: 'network-only', } ); // always get from server( not cache )

  if (
    !loading &&
		( !user || error ) &&
		typeof window !== 'undefined' // check if browser
  ){
    return <Redirect to="/login"/>;
  }

  if ( user ){
    if ( roles.length && !roles.includes( user.role ) ){
      return <Redirect to="/login"/>;
    }

    return <WrappedComponent { ...props }/>;
  }

  return <p>Authenticating...</p>;
};

export default withAuth;