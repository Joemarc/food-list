import {
  GET_LISTS_REQUEST, GET_LISTS_SUCCESS, GET_LISTS_FAILURE,
  GET_LIST_REQUEST, GET_LIST_SUCCESS, GET_LIST_FAILURE,
  GET_LIST_EDIT_REQUEST, GET_LIST_EDIT_SUCCESS, GET_LIST_EDIT_FAILURE,
  UPDATE_LIST_REQUEST, UPDATE_LIST_SUCCESS, UPDATE_LIST_FAILURE,
  UPDATE_PRODUCT_REQUEST, UPDATE_PRODUCT_SUCCESS, UPDATE_PRODUCT_FAILURE,
  GET_LISTS_PRODUCTS_REQUEST, GET_LISTS_PRODUCTS_SUCCESS, GET_LISTS_PRODUCTS_FAILURE,
} from '../../actions';

const initialState = {
  isLoading: false,
  lists: [],
  products: [],
  list: null,
  error: null
};

export default function(state = initialState, action) {
  let reducer;
  switch(action.type) {
    case GET_LISTS_REQUEST:
      reducer = {
        ...state,
        isLoading: true
      };
      break;
    case GET_LISTS_SUCCESS:
      reducer = {
        ...state,
        isLoading: false,
        lists: action.payload,
      };
      break;
    case GET_LISTS_FAILURE:
      reducer = {
        ...state,
        isLoading: false,
        error: action.payload
      };
      break;
    case GET_LIST_REQUEST:
      reducer = {
        ...state,
        isLoading: true
      };
      break;
    case GET_LIST_SUCCESS:
      reducer = {
        ...state,
        isLoading: false,
        list: action.payload,
      };
      break;
    case GET_LIST_FAILURE:
      reducer = {
        ...state,
        isLoading: false,
        error: action.payload
      };
      break;
    case GET_LIST_EDIT_REQUEST:
      reducer = {
        ...state,
        isLoading: true
      };
      break;
    case GET_LIST_EDIT_SUCCESS:
      reducer = {
        ...state,
        isLoading: false,
        list: action.payload,
      };
      break;
    case GET_LIST_EDIT_FAILURE:
      reducer = {
        ...state,
        isLoading: false,
        error: action.payload
      };
      break;
    case UPDATE_LIST_REQUEST:
      reducer = {
        ...state,
        isLoadingUpdate: true
      };
      break;
    case UPDATE_LIST_SUCCESS:
      reducer = {
        ...state,
        list: action.payload,
        isLoading: false
      };
      break;
    case UPDATE_LIST_FAILURE:
      reducer = {
        ...state,
        isLoading: false,
        error: action.payload
      };
      break;
    case GET_LISTS_PRODUCTS_REQUEST:
      reducer = {
        ...state,
        isLoading: true
      };
      break;
    case GET_LISTS_PRODUCTS_SUCCESS:
      reducer = {
        ...state,
        isLoading: false,
        products: action.payload,
      };
      break;
    case GET_LISTS_PRODUCTS_FAILURE:
      reducer = {
        ...state,
        isLoading: false,
        error: action.payload
      };
      break;
    default:
      reducer = state;
  }
  return reducer;
}
