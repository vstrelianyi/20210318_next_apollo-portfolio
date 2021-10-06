import { useState } from 'react';

const FormRegister = ( { onSubmit, } ) => {
  const [ form, setForm, ] = useState( {} );
  const handleChange = ( e ) => {
    const { name, value, } = e.target;
    setForm(
      {
        ...form,
        [name]: value,
      }
    );
  };

  const handleSubmit = ( e ) => {
    e.preventDefault();
    onSubmit( form );
  };

  return (
    <form onSubmit={ handleSubmit }>

      <div className="form-group">
        <label htmlFor="avatar">Avatar</label>
        <input
          type="text"
          className="form-control"
          id="avatar"
          name="avatar"
          onChange= { handleChange }
        />
      </div>

      <div className="form-group">
        <label htmlFor="username">Username</label>
        <input
          type="text"
          className="form-control"
          id="username"
          name="username"
          onChange= { handleChange }
        />
      </div>

      <div className="form-group">
        <label htmlFor="email">Email</label>
        <input
          type="email"
          className="form-control"
          id="email"
          name="email"
          onChange= { handleChange }
        />
      </div>

      <div className="form-group">
        <label htmlFor="password">Password</label>
        <input
          type="password"
          className="form-control"
          id="password"
          name="password"
          onChange= { handleChange }
        />
      </div>

      <div className="form-group">
        <label htmlFor="passwordConfirmation">Password Confirmation</label>
        <input
          type="password"
          className="form-control"
          id="passwordConfirmation"
          name="passwordConfirmation"
          onChange= { handleChange }
        />
      </div>

      <button
        type="submit"
        // type="button"
        className="btn btn-main bg-blue py-2 ttu mt-2"
      >Submit</button>
    </form>
  );
};

export default FormRegister;