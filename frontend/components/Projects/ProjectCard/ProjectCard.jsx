import Link from 'next/link';
import styleProjectCard from './ProjectCard.module.scss';

const ProjectCard = ( { project, } ) => {
  return (
    <Link href={ `/projects/${ project._id }` }>
      <a className={ `ProjectCard ${ styleProjectCard.ProjectCard }` }>
        <div className="card subtle-shadow no-border">
          <div className="card-body">
            <h5 className="card-title">{ project.title }</h5>
            <h6 className="card-subtitle mb-2 text-muted">{ project.jobTitle }</h6>
            <p className="card-text fs-2">{ project.description }</p>
          </div>
          <div className="card-footer no-border">
            <small className="text-muted">{ `${ project.startDate } - ${ project.endDate }` }</small>
          </div>
        </div>
      </a>
    </Link>
  );
};

export default ProjectCard;