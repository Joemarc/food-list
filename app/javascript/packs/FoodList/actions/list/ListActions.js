import API from '../../../../../../../front/src/config/api';

import {
  GET_LISTS_REQUEST, GET_LISTS_SUCCESS, GET_LISTS_FAILURE,
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
