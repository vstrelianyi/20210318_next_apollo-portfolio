import axios from 'axios';
import style from './Project.module.scss';

import client from '@/apollo/apollo-client';

import { useLazyQuery } from '@apollo/client';
import { GET_PROJECT } from '@/apollo/queries/index';
import { useEffect, useState } from 'react';

import { GET_PROJECT_IDS } from '@/apollo/queries/index';

const PageProject = ( {
  pageData,
} ) => {

  // const diff = new Date( portfolio.endDate ).getTime() - new Date( portfolio.startDate ).getTime();
  const diff = 0;

  const [ project, setProject, ] = useState( pageData.project );

  // const [ getProject, { loading, data, }, ] = useLazyQuery( GET_PROJECT );

  // useEffect( () => {
  //   getProject( { variables: { id: id, }, } );
  // }, [] );

  // if ( data && !project ){
  //   setProject( data.project );
  // }

  // if ( loading || !project ){
  //   return <h1>Loading...</h1>;
  // }

  return (
    <div className={ `portfolio-detail ${ style.Project }` }>
      <div className="container">

        <div className="jumbotron">
          <h1 className="display-3">{ project.title }</h1>
          <p className="lead">{ project.jobTitle }</p>
          <p>
            <a className="btn btn-lg btn-success" href="#" role="button">{ project.company }</a>
          </p>
        </div>

        <div className="row marketing">
          <div className="col-lg-6">
            <h4 className="title">Location</h4>
            <p className="text">{ project.location }</p>

            <h4 className="title">Start Date</h4>
            <p className="text">{ project.startDate }</p>
          </div>

          <div className="col-lg-6">
            { /* TODO: days later... */ }
            <h4 className="title">Days</h4>
            <p className="text">{ Math.ceil( diff / ( 1000 * 3600 * 24 ) ) }</p>

            <h4 className="title">End Date</h4>
            <p className="text">{ project.endDate }</p>
          </div>
          <div className="col-md-12">
            <hr />
            <h4 className="title">Description</h4>
            <p>{ project.description }</p>
          </div>
        </div>
      </div>
    </div>

  );
};

export default PageProject;

export const getStaticPaths = async () => {
  const pathsData = [];
  const { data, } = await client.query( { query: GET_PROJECT_IDS, } );
  // console.log( 'PageProject: data:', data );

  data.projects.forEach( item => {
    pathsData.push( { params: { id: item._id, }, } );
  } );

  // console.log( 'pathsData', pathsData[0].params.slug );

  return {
    paths: pathsData,
    fallback: false,
  };
};

export const getStaticProps = async ( { params, } ) => {
  // const { params } = context;
  // console.log( params );

  const { data, } = await client.query( { query: GET_PROJECT, variables: { id: params.id, }, } );

  return {
    props: {
      pageData: {
        project: data.project,
      },
    },
    // revalidate: 1,
  };
};
