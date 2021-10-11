import FormLogin from '@/components/Forms/FormLogin';
import { useSignIn } from '@/apollo/actions';
import Redirect from '@/components/Redirect/Redirect';

const PageLogin = () => {

  const [ signIn, { data, loading, error, }, ] = useSignIn();

  const errorMessage = ( error ) => {
    console.log( error.message );

    return <h1>{ error.message }</h1>;
  };

  return (
    <>
      <section className="section-title">
        <div className="px-2">
          <div className="pt-5 pb-4">
            <h1>Login Page</h1>
          </div>
        </div>
      </section>
      <div className="mt-5">
        <div className="row">
          <div className="col-md-5 mx-auto">
            <h1 className="page-title">Login</h1>
            <FormLogin onSubmit={ ( signInData ) => {
              signIn( { variables: signInData, } );
            } }/>
            { data && data.signIn && <Redirect to="/"/> }
            { error && <div className="alert alert-danger">{ errorMessage( error ) }</div> }
          </div>
        </div>
      </div>
    </>
  );

};

export default PageLogin;
