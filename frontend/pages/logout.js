import { useSignOut } from '@/apollo/actions';
import { useEffect } from 'react';
import { useRouter } from 'next/router';

const PageLogout = ( { client, } ) => {
  const [ logout, ] = useSignOut();
  const router = useRouter();

  useEffect( () => {
    logout().then( () => {
      client.resetStore().then( () => {
        router.push( '/login' );
      } );
    } );
  }, [] );

  return (
    <>
      <section className="section-title">
        <div className="px-2">
          <div className="pt-5 pb-4">
            <h1>Logout Page</h1>
          </div>
        </div>
      </section>
      <div className="mt-5">
        <div className="row">
          <div className="col-md-5 mx-auto">
            <h1 className="page-title">Logout</h1>
            <p>Loging out...</p>
          </div>
        </div>
      </div>
    </>
  );

};

export default PageLogout;
