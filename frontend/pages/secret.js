import { useEffect } from 'react';
import withAuth from '@/hoc/withAuth';
const PageSecret = ( props ) => {
  useEffect( () => {
    console.log( 'PageSecret -> props:', props );
  }, [] );

  return (
    <>
      <section className="section-title">
        <div className="px-2">
          <div className="pt-5 pb-4">
            <h1>Secret page</h1>
          </div>
        </div>
      </section>
      <div className="mt-5">
        <div className="row">
          <div className="col-md-5 mx-auto">
            <h1 className="page-title">Secret page, only for authenticated users!!!</h1>
          </div>
        </div>
      </div>
    </>
  );

};

export default withAuth( PageSecret, [ 'admin', ] );
