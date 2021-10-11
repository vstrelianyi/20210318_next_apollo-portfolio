import FormRegister from '@/components/Forms/FormRegister';

import { useMutation  } from '@apollo/client';
import { SIGN_UP } from '@/apollo/mutations';
import Redirect from '@/components/Redirect/Redirect';

const PageRegister = () => {
  // const registerUser = ( registerData ) => {
  //   console.log( JSON.stringify( registerData ) );
  // };

  const [ signUpUser, { data, loading, error, }, ] = useMutation( SIGN_UP );

  const errorMessage = ( error ) => {
    console.log( error.message );

    return <h1>{ error.message }</h1>;
  };

  return (
    <>
      <section className="section-title">
        <div className="px-2">
          <div className="pt-5 pb-4">
            <h1>Register Page</h1>
          </div>
        </div>
      </section>
      <div className="">
        <div className="row">
          <div className="col-md-5 mx-auto">
            <h1 className="page-title">Register</h1>

            <FormRegister onSubmit={ registerData => {
              signUpUser( { variables: registerData, } );
            } } />
            { data && data.signUp && <Redirect to="/login"/> }
            { error && <div className="alert alert-danger">{ errorMessage( error ) }</div> }

          </div>
        </div>
      </div>
    </>
  );

};

export default PageRegister;
