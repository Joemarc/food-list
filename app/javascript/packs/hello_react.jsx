// Run this example by adding <%= javascript_pack_tag 'hello_react' %> to the head of your layout file,
// like app/views/layouts/application.html.erb. All it does is render <div>Hello React</div> at the bottom
// of the page.

import React from 'react'
import ReactDOM from 'react-dom'
import Routes from "./FoodList/Routes";
import { Provider } from 'react-redux';
import logger from 'redux-logger';
import { createStore, applyMiddleware } from 'redux';
import reduxThunk from 'redux-thunk';
import rootReducer from './FoodList/reducers'

const appliedMiddlewares = [reduxThunk];
const middlewares = applyMiddleware(...appliedMiddlewares);
appliedMiddlewares.push(logger);
const store = createStore(rootReducer, {}, middlewares);

document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(
    <Provider store={store}>
      <Routes />
    </Provider>,
    document.body.appendChild(document.createElement('div')),
  )
});
