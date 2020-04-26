import API from '../../config/api';

import {
  GET_LISTS_REQUEST, GET_LISTS_SUCCESS, GET_LISTS_FAILURE,
  GET_LIST_REQUEST, GET_LIST_SUCCESS, GET_LIST_FAILURE,
  GET_LIST_EDIT_REQUEST, GET_LIST_EDIT_SUCCESS, GET_LIST_EDIT_FAILURE,
  UPDATE_LIST_REQUEST, UPDATE_LIST_SUCCESS, UPDATE_LIST_FAILURE,
  GET_LISTS_PRODUCTS_REQUEST, GET_LISTS_PRODUCTS_SUCCESS, GET_LISTS_PRODUCTS_FAILURE,
} from './ListTypes';

function getListsRequest() {
  return { type: GET_LISTS_REQUEST };
}

function getListsSuccess(lists) {
  return {
    type: GET_LISTS_SUCCESS,
    payload: lists
  };
}

function getListsFailure(error) {
  return {
    type: GET_LISTS_FAILURE,
    payload: error
  };
}

export function getLists() {
  return dispatch => {
    dispatch(getListsRequest());

    return API.get('/lists')
      .then(response => {
        return dispatch(getListsSuccess(response.data));
      })
      .catch(error => Promise.reject(dispatch(getListsFailure(error))));
  };
}

function getListRequest() {
  return { type: GET_LIST_REQUEST };
}

function getListSuccess(list) {
  return {
    type: GET_LIST_SUCCESS,
    payload: list
  };
}

function getListFailure(error) {
  return {
    type: GET_LIST_FAILURE,
    payload: error
  };
}

export function getList(list_id) {
  return dispatch => {
    dispatch(getListRequest());

    return API.get(`lists/${list_id}`)
      .then(response => {
        return dispatch(getListSuccess(response.data));
      })
      .catch(error => Promise.reject(dispatch(getListFailure(error))));
  };
}

function getListEditRequest() {
  return { type: GET_LIST_EDIT_REQUEST };
}

function getListEditSuccess(list) {
  return {
    type: GET_LIST_EDIT_SUCCESS,
    payload: list
  };
}

function getListEditFailure(error) {
  return {
    type: GET_LIST_EDIT_FAILURE,
    payload: error
  };
}

export function getListEdit(list_id) {
  return dispatch => {
    dispatch(getListEditRequest());

    return API.get(`lists/${list_id}/edit`)
      .then(response => {
        return dispatch(getListEditSuccess(response.data));
      })
      .catch(error => Promise.reject(dispatch(getListEditFailure(error))));
  };
}

function updateListRequest() {
  return { type: UPDATE_LIST_REQUEST };
}

function updateListSuccess(list) {
  return {
    type: UPDATE_LIST_SUCCESS,
    payload: list
  };
}

function updateListFailure(error) {
  return {
    type: UPDATE_LIST_FAILURE,
    payload: error
  };
}

export function updateList(listId, params) {
  return dispatch => {
    dispatch(updateListRequest());

    return API.put(`lists/${listId}`, {...params})
      .then(response => {
        return dispatch(updateListSuccess(response.data));
      })
      .catch(error => Promise.reject(dispatch(updateListFailure(error))));
  };
}


function getListsProductsRequest() {
  return { type: GET_LISTS_PRODUCTS_REQUEST };
}

function getListsProductsSuccess(lists) {
  return {
    type: GET_LISTS_PRODUCTS_SUCCESS,
    payload: lists
  };
}

function getListsProductsFailure(error) {
  return {
    type: GET_LISTS_PRODUCTS_FAILURE,
    payload: error
  };
}

export function getListsProducts(listId) {
  return dispatch => {
    dispatch(getListsProductsRequest());

    return API.get(`lists/${listId}/products`)
      .then(response => {
        return dispatch(getListsProductsSuccess(response.data));
      })
      .catch(error => Promise.reject(dispatch(getListsProductsFailure(error))));
  };
}

