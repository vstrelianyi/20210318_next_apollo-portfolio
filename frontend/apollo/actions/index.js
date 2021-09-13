import { useQuery, useMutation } from '@apollo/client';

import { GET_PROJECTS } from '@/queries/index';
import { CREATE_PROJECT_ITEM, UPDATE_PROJECT_ITEM, DELETE_PROJECT_ITEM } from '@/mutations/index';

const useGetProjects = () => useQuery( GET_PROJECTS );

const useUpdateProject = () => useMutation( UPDATE_PROJECT_ITEM );

const useDeleteProject = () => useMutation(
  DELETE_PROJECT_ITEM,
  {
    update ( cache, { data: { deleteProject, }, } ) {
      const { projects, } = cache.readQuery( { query: GET_PROJECTS, } );
      const newProjects = projects.filter( p => p._id !== deleteProject );
      cache.writeQuery( {
        query: GET_PROJECTS,
        data: { projects: newProjects, },
      } );
    },
  }
);
const useCreateProject = () => useMutation(
  CREATE_PROJECT_ITEM,
  {
    update ( cache, { data, } ) {
      const { projects, } = cache.readQuery( { query: GET_PROJECTS, } );
      cache.writeQuery( {
        query: GET_PROJECTS,
        data: { projects: [ ...projects, data.createProject, ], },
      } );
    },
  }
);

export { useGetProjects, useUpdateProject, useDeleteProject, useCreateProject };