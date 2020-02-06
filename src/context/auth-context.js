import React, { useState, useEffect, useCallback } from 'react';

import ErrorModal from '../components/UI/ErrorModal/ErrorModal';

import useHttp from '../hooks/http';

export const AuthContext = React.createContext({
  isAuth: false,
  login: () => {},
  setAuth: () => {},
  logout: () => {},
  token: ''
});


const AuthContextProvider = props => {  
  const {
    error,
    data,
    sendRequest,
    clear
  } = useHttp();

  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userToken, setUserToken] = useState('');

  const checkAuthTimeout = useCallback(expirationTime => {
    setTimeout(() => {
      logoutHandler();
    }, expirationTime * 1000)
  },[])

  const login = useCallback(expirationDate => {    
      if ((expirationDate.getTime() - new Date().getTime()) / 1000 > 0){      
        setIsAuthenticated(true);
        checkAuthTimeout((expirationDate.getTime() - new Date().getTime()) / 1000 );
      } else {
        logoutHandler();
      }
    }, [checkAuthTimeout]
  )

  useEffect(()=> {
    if (data && !data.error){
      const expirationDate = new Date(new Date().getTime() + data.expiresIn * 1000);
      localStorage.setItem('token', data.idToken);
      localStorage.setItem('expirationDate', expirationDate);
      localStorage.setItem('userId', data.localId);      
      setUserToken(data.idToken)
      login(expirationDate)
    }
  }, [data, login])



  const logoutHandler = () => {
    setIsAuthenticated(false);
    localStorage.removeItem('token');
    localStorage.removeItem('expirationDate');
    localStorage.removeItem('userId');
  }



  const loginHandler = (email, password, isSignup) => {
    let url = '';
        const authData = {
            email: email, 
            password:password,
            returnSecureToken: true
        }
        if (isSignup){
            url = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${process.env.REACT_APP_API_KEY}`
        } else {
            url = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${process.env.REACT_APP_API_KEY}`
        }
        sendRequest(
            url,
            'POST',
            JSON.stringify(authData),
            authData,
            null
            ) 
  };

  return (
    <AuthContext.Provider
      value={{ login: loginHandler, isAuth: isAuthenticated, setAuth: login, logout:logoutHandler, token:userToken}}
    >
      {data && data.error && <ErrorModal onClose={clear}>{data.error.message.toLowerCase().replace('_', ' ')}</ErrorModal>}
      {error && <ErrorModal onClose={clear}>{data.error.message.toLowerCase().replace('_', ' ')}</ErrorModal>}
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;