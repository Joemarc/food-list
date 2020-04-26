import {
  GET_IN_PRODUCTS_REQUEST, GET_IN_PRODUCTS_SUCCESS, GET_IN_PRODUCTS_FAILURE,
  GET_OUT_PRODUCTS_REQUEST, GET_OUT_PRODUCTS_SUCCESS, GET_OUT_PRODUCTS_FAILURE,
} from '../../actions';

const initialState = {
  isLoading: false,
  inProducts: [],
  outProducts: [],
  product: null,
  error: null
};

export default function(state = initialState, action) {
  let reducer;
  switch(action.type) {
    case GET_IN_PRODUCTS_REQUEST:
      reducer = {
        ...state,
        isLoading: true
      };
      break;
    case GET_IN_PRODUCTS_SUCCESS:
      reducer = {
        ...state,
        isLoading: false,
        inProducts: action.payload,
      };
      break;
    case GET_IN_PRODUCTS_FAILURE:
      reducer = {
        ...state,
        isLoading: false,
        error: action.payload
      };
      break;
    case GET_OUT_PRODUCTS_REQUEST:
      reducer = {
        ...state,
        isLoading: true
      };
      break;
    case GET_OUT_PRODUCTS_SUCCESS:
      reducer = {
        ...state,
        isLoading: false,
        outProducts: action.payload,
      };
      break;
    case GET_OUT_PRODUCTS_FAILURE:
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
