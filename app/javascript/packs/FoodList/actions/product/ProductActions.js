import API from '../../config/api';

import {
  GET_IN_PRODUCTS_REQUEST, GET_IN_PRODUCTS_SUCCESS, GET_IN_PRODUCTS_FAILURE,
  GET_OUT_PRODUCTS_REQUEST, GET_OUT_PRODUCTS_SUCCESS, GET_OUT_PRODUCTS_FAILURE,
  UPDATE_PRODUCT_OUT_REQUEST, UPDATE_PRODUCT_OUT_SUCCESS, UPDATE_PRODUCT_OUT_FAILURE,
  UPDATE_PRODUCT_IN_REQUEST, UPDATE_PRODUCT_IN_SUCCESS, UPDATE_PRODUCT_IN_FAILURE,
  UPDATE_PRODUCT_REQUEST, UPDATE_PRODUCT_SUCCESS, UPDATE_PRODUCT_FAILURE,
  CREATE_PRODUCT_REQUEST, CREATE_PRODUCT_SUCCESS, CREATE_PRODUCT_FAILURE,
  CREATE_PRODUCT_NAME_REQUEST, CREATE_PRODUCT_NAME_SUCCESS, CREATE_PRODUCT_NAME_FAILURE,
  DELETE_PRODUCT_REQUEST, DELETE_PRODUCT_SUCCESS, DELETE_PRODUCT_FAILURE,
  UPDATE_PRODUCTS_REQUEST, UPDATE_PRODUCTS_SUCCESS, UPDATE_PRODUCTS_FAILURE
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


function updateProductOutRequest() {
  return { type: UPDATE_PRODUCT_OUT_REQUEST };
}

function updateProductOutSuccess(product) {
  return {
    type: UPDATE_PRODUCT_OUT_SUCCESS,
    payload: product
  };
}

function updateProductOutFailure(error) {
  return {
    type: UPDATE_PRODUCT_OUT_FAILURE,
    payload: error
  };
}

export function updateProductOut(product, params) {
  return dispatch => {
    dispatch(updateProductOutRequest());

    return API.put(`products/${product.id}`, {...params})
      .then(response => {
        return dispatch(updateProductOutSuccess(response.data));
      })
      .catch(error => Promise.reject(dispatch(updateProductOutFailure(error))));
  };
}

function updateProductInRequest() {
  return { type: UPDATE_PRODUCT_IN_REQUEST };
}

function updateProductInSuccess(product) {
  return {
    type: UPDATE_PRODUCT_IN_SUCCESS,
    payload: product
  };
}

function updateProductInFailure(error) {
  return {
    type: UPDATE_PRODUCT_IN_FAILURE,
    payload: error
  };
}

export function updateProductIn(product, params) {
  return dispatch => {
    dispatch(updateProductInRequest());

    return API.put(`products/${product.id}`, {...params})
      .then(response => {
        return dispatch(updateProductInSuccess(response.data));
      })
      .catch(error => Promise.reject(dispatch(updateProductInFailure(error))));
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

function deleteProductRequest() {
  return {
    type: DELETE_PRODUCT_REQUEST
  };
}

function deleteProductSuccess(event) {
  return {
    type: DELETE_PRODUCT_SUCCESS,
    payload: event
  };
}

function deleteProductFailure(error) {
  return {
    type: DELETE_PRODUCT_FAILURE,
    payload: { error }
  };
}

export function deleteProduct(product) {
  return dispatch => {
    dispatch(deleteProductRequest());

    return API.delete(`/products/${product.id}`)
      .then(() => dispatch(deleteProductSuccess(product)),
        error => Promise.reject(dispatch(deleteProductFailure(error))));
  };
}


function updateProductsRequest() {
  return { type: UPDATE_PRODUCTS_REQUEST };
}

function updateProductsSuccess(product) {
  return {
    type: UPDATE_PRODUCTS_SUCCESS,
    payload: product
  };
}

function updateProductsFailure(error) {
  return {
    type: UPDATE_PRODUCTS_FAILURE,
    payload: error
  };
}

export function refreshList(listId) {
  return dispatch => {
    dispatch(updateProductsRequest());

    return API.put(`/products/refresh_list?list_id=${listId}`)
      .then(response => {
        return dispatch(updateProductsSuccess(response.data));
      })
      .catch(error => Promise.reject(dispatch(updateProductsFailure(error))));
  };
}


