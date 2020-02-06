import React, { useReducer, useEffect, useCallback, useMemo, useContext } from 'react';

import ProjectForm from './ProjectForm';
import ProjectList from './ProjectList';
import ErrorModal from '../UI/ErrorModal/ErrorModal';
import Section from '../UI/Section/Section';
import useHttp from '../../hooks/http';
import { AuthContext } from '../../context/auth-context';

const projectReducer = (currentProjects, action) => {
  switch (action.type) {
    case 'SET':
      const loadedProjects = [];
      for (const key in action.projects) {
        loadedProjects.push({
          id: key,
          title: action.projects[key].title,
          link: action.projects[key].link,
          stack: action.projects[key].stack,
          stackDesc: action.projects[key].stackDesc,
          challenges: action.projects[key].challenges,
          imgUrl: action.projects[key].URL
        });
      }
      return loadedProjects;
    case 'ADD':
      return [...currentProjects, action.project];
    case 'DELETE':
      return currentProjects.filter(proj => proj.id !== action.id);
    default:
      throw new Error('Should not get there!');
  }
};

const Projects = () => {
  const authContext = useContext(AuthContext);

  const [userProjects, dispatch] = useReducer(projectReducer, []);
  const {
    isLoading,
    error,
    data,
    sendRequest,
    reqExtra,
    reqIdentifier,
    clear
  } = useHttp();

  useEffect(() => {
    sendRequest(
      `${process.env.REACT_APP_DATABASE}/projects.json`,
      'GET',
      null,
      null,
      'GET_PROJECTS'
    )
    }, [sendRequest]);

  useEffect(() => {
    if (!isLoading && !error && reqIdentifier === 'GET_PROJECTS'){
      dispatch({ type: 'SET', projects: data })
    } else if (!isLoading && !error && reqIdentifier === 'REMOVE_PROJECT') {
      dispatch({ type: 'DELETE', id: reqExtra });
    } else if (!isLoading && !error && reqIdentifier === 'ADD_PROJECT') {
      dispatch({
        type: 'ADD',
        project: { id: data.name, ...reqExtra }
      });
    }
  }, [data, reqExtra, reqIdentifier, isLoading, error]);

  const addProjectHandler = useCallback(project => {
    sendRequest(
      `${process.env.REACT_APP_DATABASE}projects.json?auth=${authContext.token}`,
      'POST',
      JSON.stringify(project),
      project,
      'ADD_PROJECT'
    );
  }, [sendRequest, authContext.token]);

  const removeProjectHandler = useCallback(
    projectId => {
     if (authContext && authContext.token){
      sendRequest(
        `${process.env.REACT_APP_DATABASE}projects/${projectId}.json?auth=${authContext.token}`,
        'DELETE',
        null,
        projectId,
        'REMOVE_PROJECT'
      );
     }
    },
    [sendRequest, authContext]
  );

  const projectList = useMemo(() => {
    return (
      <ProjectList
        projects={userProjects}
        onRemoveItem={removeProjectHandler}
        authStatus={authContext.isAuth}
      />
    );
  }, [userProjects, removeProjectHandler, authContext.isAuth]);

  return (
    <Section >
      {error && <ErrorModal onClose={clear}>{error}</ErrorModal>}
      {data && data.error && <ErrorModal onClose={clear}>{data.error.toLowerCase().replace('_', ' ')}</ErrorModal>}
      {authContext.isAuth && <ProjectForm onAddProject={addProjectHandler} loading={isLoading}/>} 
      {projectList}
    </Section>
  );
};

export default Projects;
