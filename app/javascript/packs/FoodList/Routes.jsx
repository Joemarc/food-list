import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { Router } from 'react-router';
import history from '../history';

import Lists from "./components/lists/lists";
import listView from "./components/lists/listView"
import listEdit from "./components/lists/listEdit"
import categories from "./components/categories/categories";
import ToastMessage from "./ToastMessage/ToastMessage";

const Routes = () => {
  return (
    <Router history={history}>
      <Switch>
        <Route exact path="/" component={Lists} />
        <Route path="/list/:id/edit" component={listEdit} />
        <Route path="/list/:id" component={listView} />
        <Route exact path="/categories" component={categories} />
        <Route path="/products/new" component={categories} />
      </Switch>
      <ToastMessage />
    </Router>
  );
};

export default Routes;
