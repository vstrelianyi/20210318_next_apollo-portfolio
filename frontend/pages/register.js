import FormRegister from '@/components/Forms/FormRegister';

const PageRegister = () => {
  const registerUser = ( registerData ) => {
    console.log( JSON.stringify( registerData ) );
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
      <div className="bwm-form">
        <div className="row">
          <div className="col-md-5 mx-auto">
            <h1 className="page-title">Register</h1>

            <FormRegister onSubmit={ registerUser } />

          </div>
        </div>
      </div>
    </>
  );

};

export default PageRegister;
