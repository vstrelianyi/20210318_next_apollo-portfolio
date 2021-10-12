import { useForm } from 'react-hook-form';
const FormNewProject = ( { onSubmit, loading, } ) => {
  const { handleSubmit, register, } = useForm();

  return (
    <form onSubmit={ handleSubmit( onSubmit ) }>
      <div className="form-group">
        <label htmlFor="title">Title</label>
        <input
          { ...register( 'title' ) }
          type="text"
          name="title"
          className="form-control"
          id="title"
        />
      </div>
      <div className="form-group">
        <label htmlFor="company">Company</label>
        <input
          { ...register( 'company' ) }
          type="text"
          name="company"
          className="form-control"
          id="company"
        />
      </div>
      <div className="form-group">
        <label htmlFor="location">Location</label>
        <input
          { ...register( 'location' ) }
          type="text"
          name="location"
          className="form-control"
          id="location"
        />
      </div>
      <div className="form-group">
        <label htmlFor="job-title">Job title</label>
        <input
          { ...register( 'job-title' ) }
          type="text"
          name="job-title"
          className="form-control"
          id="job-title"
        />
      </div>
      <div className="form-group">
        <label htmlFor="description">Description</label>
        <input
          { ...register( 'description' ) }
          type="text"
          name="description"
          className="form-control"
          id="description"
        />
      </div>
      <div className="form-group">
        <label htmlFor="date-start">Start date</label>
        <input
          { ...register( 'date-start' ) }
          type="date"
          name="date-start"
          className="form-control"
          id="date-start"
        />
      </div>
      <div className="form-group">
        <label htmlFor="date-end">End date</label>
        <input
          { ...register( 'date-end' ) }
          type="date"
          name="date-end"
          className="form-control"
          id="date-end"
        />
      </div>
      {	loading && (
        'Creating new form...'
      )
      }
      { !loading && (
        <button
          type="submit"
          className="btn btn-main bg-blue py-2 ttu mt-2">Create</button>
      ) }

    </form>
  );
};

export default FormNewProject;