import API from '../../config/api';

import {
  GET_IN_PRODUCTS_REQUEST, GET_IN_PRODUCTS_SUCCESS, GET_IN_PRODUCTS_FAILURE,
  GET_OUT_PRODUCTS_REQUEST, GET_OUT_PRODUCTS_SUCCESS, GET_OUT_PRODUCTS_FAILURE,
  UPDATE_PRODUCT_REQUEST, UPDATE_PRODUCT_SUCCESS, UPDATE_PRODUCT_FAILURE,
  CREATE_PRODUCT_REQUEST, CREATE_PRODUCT_SUCCESS, CREATE_PRODUCT_FAILURE,
  CREATE_PRODUCT_NAME_REQUEST, CREATE_PRODUCT_NAME_SUCCESS, CREATE_PRODUCT_NAME_FAILURE
} from './ProductTypes';

function getInProductsRequest() {
  return { type: GET_IN_PRODUCTS_REQUEST };
}

function getInProductsSuccess(products) {
  return {
    type: GET_IN_PRODUCTS_SUCCESS,
    payload: products
  };
}

function getInProductsFailure(error) {
  return {
    type: GET_IN_PRODUCTS_FAILURE,
    payload: error
  };
}

export function getInProducts(listId) {
  return dispatch => {
    dispatch(getInProductsRequest());

    return API.get(`/products/in_products?list_id=${listId}`)
      .then(response => {
        return dispatch(getInProductsSuccess(response.data));
      })
      .catch(error => Promise.reject(dispatch(getInProductsFailure(error))));
  };
}

function getOutProductsRequest() {
  return { type: GET_OUT_PRODUCTS_REQUEST };
}

function getOutProductsSuccess(products) {
  return {
    type: GET_OUT_PRODUCTS_SUCCESS,
    payload: products
  };
}

function getOutProductsFailure(error) {
  return {
    type: GET_OUT_PRODUCTS_FAILURE,
    payload: error
  };
}

export function getOutProducts(listId) {
  return dispatch => {
    dispatch(getOutProductsRequest());

    return API.get(`/products/out_products?list_id=${listId}`)
      .then(response => {
        return dispatch(getOutProductsSuccess(response.data));
      })
      .catch(error => Promise.reject(dispatch(getOutProductsFailure(error))));
  };
}


function updateProductRequest() {
  return { type: UPDATE_PRODUCT_REQUEST };
}

function updateProductSuccess(product) {
  return {
    type: UPDATE_PRODUCT_SUCCESS,
    payload: product
  };
}

function updateProductFailure(error) {
  return {
    type: UPDATE_PRODUCT_FAILURE,
    payload: error
  };
}

export function updateProduct(product, params) {
  return dispatch => {
    dispatch(updateProductRequest());

    return API.put(`products/${product.id}`, {...params})
      .then(response => {
        return dispatch(updateProductSuccess(response.data));
      })
      .catch(error => Promise.reject(dispatch(updateProductFailure(error))));
  };
}

function createProductRequest() {
  return { type: CREATE_PRODUCT_REQUEST };
}

function createProductSuccess(product) {
  return {
    type: CREATE_PRODUCT_SUCCESS,
    payload: product
  };
}

function createProductFailure(error) {
  return {
    type: CREATE_PRODUCT_FAILURE,
    payload: error
  };
}

export function createProduct(params) {
  return dispatch => {
    dispatch(createProductRequest());

    return API.post('/products', {...params})
      .then(response => {
        return dispatch(createProductSuccess(response.data));
      })
      .catch(error => Promise.reject(dispatch(createProductFailure(error))));
  };
}

function createProductNameRequest() {
  return { type: CREATE_PRODUCT_NAME_REQUEST };
}

function createProductNameSuccess(product) {
  return {
    type: CREATE_PRODUCT_NAME_SUCCESS,
    payload: product
  };
}

function createProductNameFailure(error) {
  return {
    type: CREATE_PRODUCT_NAME_FAILURE,
    payload: error
  };
}

export function createProductName(params) {
  return dispatch => {
    dispatch(createProductNameRequest());

    return API.post('/product_names', {...params})
      .then(response => {
        return dispatch(createProductNameSuccess(response.data));
      })
      .catch(error => Promise.reject(dispatch(createProductNameFailure(error))));
  };
}

