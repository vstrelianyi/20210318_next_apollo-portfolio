import { useQuery, useMutation, useLazyQuery } from '@apollo/client';

import { GET_PROJECTS, GET_USER } from '@/apollo/queries/index';
import { CREATE_PROJECT_ITEM, UPDATE_PROJECT_ITEM, DELETE_PROJECT_ITEM, SIGN_IN, SIGN_OUT } from '@/apollo/mutations/index';

const useGetProjects = () => useQuery( GET_PROJECTS );

const useUpdateProject = () => useMutation( UPDATE_PROJECT_ITEM );

const useDeleteProject = () => useMutation(
  DELETE_PROJECT_ITEM,
  {
    update ( cache, { data: { deleteProject, }, } ) {
      console.log( 'useDeleteProject', deleteProject );
      const { projects, } = cache.readQuery( { query: GET_PROJECTS, } );
      const newProjects = projects.filter( p => p._id !== deleteProject._id );
      console.log( 'newProjects', newProjects );
      cache.writeQuery( {
        query: GET_PROJECTS,
        data: { projects: newProjects, },
      } );
      console.log( 'cache after: ', cache.readQuery( { query: GET_PROJECTS, } ).projects );
    },
  }
);
const useCreateProject = () => useMutation(
  CREATE_PROJECT_ITEM,
  {
    update ( cache, { data, } ) {
      const { projects, } = cache.readQuery( { query: GET_PROJECTS, } );
      // console.log( 'cache before: ', projects );
      // console.log( 'createProject.data: ', data );
      cache.writeQuery( {
        query: GET_PROJECTS,
        data: { projects: [ ...projects, data.createProject, ], },
      } );
      console.log( 'cache after: ', cache.readQuery( { query: GET_PROJECTS, } ).projects );
    },
  }
);

// Auth actions ---------------
const useSignIn = () => useMutation( SIGN_IN, {
  update ( cache, { data: { signIn: signedInUser, }, } ) { // signedInUser - alias
    cache.writeQuery( {
      query: GET_USER,
      data: {
        user: signedInUser,
      },
    } );
  },
} );
const useLazyGetUser = () => useLazyQuery( GET_USER );

const useSignOut = () => useMutation( SIGN_OUT );
const useGetUser = () => useQuery( GET_USER );

export { useGetProjects, useUpdateProject, useDeleteProject, useCreateProject, useSignIn, useLazyGetUser, useSignOut, useGetUser };