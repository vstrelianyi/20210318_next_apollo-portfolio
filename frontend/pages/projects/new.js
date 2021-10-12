import { useEffect } from 'react';
import withAuth from '@/hoc/withAuth';
import FormNewProject from '@/components/Forms/FormNewProject';

const PageNewProject = ( props ) => {
  useEffect( () => {
    console.log( 'PageSecret -> props:', props );
  }, [] );

  return (
    <>
      <div className="mt-5">
        <div className="row">
          <div className="col-md-5 mx-auto">
            <h1 className="page-title">Create New Project</h1>
            <FormNewProject onSubmit={ data => alert( JSON.stringify( data ) ) }/>
          </div>
        </div>
      </div>
    </>
  );

};

export default withAuth( PageNewProject, [ 'admin', 'editor', ] );
