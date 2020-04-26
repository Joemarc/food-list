import {
  GET_CATEGORIES_REQUEST, GET_CATEGORIES_SUCCESS, GET_CATEGORIES_FAILURE,
  GET_PRODUCTS_NOT_IN_LIST_REQUEST, GET_PRODUCTS_NOT_IN_LIST_SUCCESS, GET_PRODUCTS_NOT_IN_LIST_FAILURE,
} from '../../actions';

const initialState = {
  isLoading: false,
  categories: [],
  products: [],
  error: null
};

export default function(state = initialState, action) {
  let reducer;
  switch(action.type) {
    case GET_CATEGORIES_REQUEST:
      reducer = {
        ...state,
        isLoading: true
      };
      break;
    case GET_CATEGORIES_SUCCESS:
      reducer = {
        ...state,
        isLoading: false,
        categories: action.payload,
      };
      break;
    case GET_CATEGORIES_FAILURE:
      reducer = {
        ...state,
        isLoading: false,
        error: action.payload
      };
      break;
    case GET_PRODUCTS_NOT_IN_LIST_REQUEST:
      reducer = {
        ...state,
        isLoading: true
      };
      break;
    case GET_PRODUCTS_NOT_IN_LIST_SUCCESS:
      reducer = {
        ...state,
        isLoading: false,
        products: action.payload,
      };
      break;
    case GET_PRODUCTS_NOT_IN_LIST_FAILURE:
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
