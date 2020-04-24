import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { Router } from 'react-router';
import history from '../history';

import Lists from "./components/lists";

const Routes = () => {
  return (
    <Router history={history}>
      <Switch>
        <Route path="/" component={Lists} />
      </Switch>
    </Router>
  );
};

export default Routes;
