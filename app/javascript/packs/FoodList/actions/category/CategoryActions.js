import API from '../../config/api';

import {
  GET_CATEGORIES_REQUEST, GET_CATEGORIES_SUCCESS, GET_CATEGORIES_FAILURE,
  GET_PRODUCTS_NOT_IN_LIST_REQUEST, GET_PRODUCTS_NOT_IN_LIST_SUCCESS, GET_PRODUCTS_NOT_IN_LIST_FAILURE,
  CREATE_CATEGORY_REQUEST, CREATE_CATEGORY_SUCCESS, CREATE_CATEGORY_FAILURE
} from './CategoryTypes';

function getCategoriesRequest() {
  return { type: GET_CATEGORIES_REQUEST };
}

function getCategoriesSuccess(categories) {
  return {
    type: GET_CATEGORIES_SUCCESS,
    payload: categories
  };
}

function getCategoriesFailure(error) {
  return {
    type: GET_CATEGORIES_FAILURE,
    payload: error
  };
}

export function getCategories() {
  return dispatch => {
    dispatch(getCategoriesRequest());

    return API.get('/categories')
      .then(response => {
        return dispatch(getCategoriesSuccess(response.data));
      })
      .catch(error => Promise.reject(dispatch(getCategoriesFailure(error))));
  };
}

function getProductsNotInListRequest() {
  return { type: GET_PRODUCTS_NOT_IN_LIST_REQUEST };
}

function getProductsNotInListSuccess(categories) {
  return {
    type: GET_PRODUCTS_NOT_IN_LIST_SUCCESS,
    payload: categories
  };
}

function getProductsNotInListFailure(error) {
  return {
    type: GET_PRODUCTS_NOT_IN_LIST_FAILURE,
    payload: error
  };
}

export function getProductsNotInList() {
  return dispatch => {
    dispatch(getProductsNotInListRequest());

    return API.get('/products/products_not_in_list')
      .then(response => {
        return dispatch(getProductsNotInListSuccess(response.data));
      })
      .catch(error => Promise.reject(dispatch(getProductsNotInListFailure(error))));
  };
}

function createCategoryRequest() {
  return { type: CREATE_CATEGORY_REQUEST };
}

function createCategorySuccess(product) {
  return {
    type: CREATE_CATEGORY_SUCCESS,
    payload: product
  };
}

function createCategoryFailure(error) {
  return {
    type: CREATE_CATEGORY_FAILURE,
    payload: error
  };
}

export function createCategory(params) {
  return dispatch => {
    dispatch(createCategoryRequest());

    return API.post('/categories', {...params})
      .then(response => {
        return dispatch(createCategorySuccess(response.data));
      })
      .catch(error => Promise.reject(dispatch(createCategoryFailure(error))));
  };
}

