import {
  GET_LISTS_REQUEST, GET_LISTS_SUCCESS, GET_LISTS_FAILURE,
} from '../../actions';

const initialState = {
  isLoading: false,
  lists: [],
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
    default:
      reducer = state;
  }
  return reducer;
}
