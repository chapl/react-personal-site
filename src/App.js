import React, { useEffect, Suspense, useContext } from 'react';
import Layout from './hoc/Layout/Layout';
import { Route, Switch, withRouter, Redirect } from 'react-router-dom';
import Auth from './components/Auth/Auth';
import Logout from './components/Auth/Logout/Logout';
import { AuthContext } from './context/auth-context';

import Landing from './components/Landing/Landing';

const Projects = React.lazy(() => { return import('./components/Projects/Projects');});
const Personal = React.lazy(() => { return import('./components/Personal/Personal');});
const Contact = React.lazy(() => { return import('./components/ContactBare/ContactBare');});

const App = props => {

  const authContext = useContext(AuthContext);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      const expirationDate = new Date(localStorage.getItem('expirationDate'));
      authContext.setAuth(expirationDate); 
      authContext.token = localStorage.getItem('token')
    }
  },[authContext])

  let routes = (
    <Switch>
      <Route path="/auth" component={Auth} />
      <Route path="/projects" render={(props) => <Projects {...props}/>} />
      <Route path="/personal" render={(props) => <Personal {...props}/>} />
      <Route path="/contact" render={(props) => <Contact {...props}/>} />
      <Route path="/" exact component={Landing} />
      <Redirect to="/" />
    </Switch>
  )
  if (authContext.isAuth) {
    routes = (
      <Switch>
        <Route path="/projects" render={(props) => <Projects {...props}/>} />
        <Route path="/personal" render={(props) => <Personal {...props}/>} />
        <Route path="/contact" render={(props) => <Contact {...props}/>} />
        <Route path="/logout" component={Logout} />
        <Route path="/" exact component={Landing} />
        <Redirect to="/" />
      </Switch>
    )
  }

  return (
    <Layout>
      <Suspense fallback={<p>Loading...</p>}>
        {routes}
      </Suspense>
    </Layout>
  );

}

export default withRouter(App);
