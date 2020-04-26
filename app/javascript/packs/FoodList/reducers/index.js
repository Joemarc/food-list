import { combineReducers } from 'redux';

import listReducer from './lists/listReducer';
import productReducer from './products/productReducer';
import categoryReducer from "./categories/categoryReducer";

export default combineReducers({
  listReducer,
  productReducer,
  categoryReducer
});
