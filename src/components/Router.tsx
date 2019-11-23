import React from 'react';
import {Switch, Route} from 'react-router-dom';
import Landing from '../pages/Landing/Landing';
import Dashboard from '../pages/Dashboard/Dashboard';

const Router = () => {
  return (
    <Switch>
      <Route exact path='/' component={Landing} />
      <Route exact path='/dashboard' component={Dashboard} />
    </Switch>
  );
}

export default Router;
