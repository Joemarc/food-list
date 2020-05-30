import {
  GET_IN_PRODUCTS_REQUEST, GET_IN_PRODUCTS_SUCCESS, GET_IN_PRODUCTS_FAILURE,
  GET_OUT_PRODUCTS_REQUEST, GET_OUT_PRODUCTS_SUCCESS, GET_OUT_PRODUCTS_FAILURE,
  UPDATE_PRODUCT_OUT_SUCCESS, UPDATE_PRODUCT_IN_SUCCESS, UPDATE_PRODUCT_SUCCESS,
  DELETE_PRODUCT_SUCCESS
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
    case UPDATE_PRODUCT_OUT_SUCCESS:
      reducer = {
        ...state,
        inProducts: [...state.inProducts.filter(product => product.id !== action.payload.id)],
        outProducts: [...state.outProducts, action.payload],
        error: action.payload
      };
      break;
    case UPDATE_PRODUCT_IN_SUCCESS:
      reducer = {
        ...state,
        outProducts: [...state.outProducts.filter(product => product.id !== action.payload.id)],
        inProducts: [...state.inProducts, action.payload],
        error: action.payload
      };
      break;
    case UPDATE_PRODUCT_SUCCESS: {
      const outProducts = [...state.outProducts].slice();
      const inProducts = [...state.inProducts].slice();
      let outProduct = outProducts.filter(c => c.id === action.payload.id)[0];
      if (outProduct) outProduct = Object.assign(outProduct, { description: action.payload.description });
      let inProduct = inProducts.filter(c => c.id === action.payload.id)[0];
      if (inProduct) inProduct = Object.assign(inProduct, { description: action.payload.description });
      reducer = {
        ...state,
        outProducts,
        inProducts,
        error: action.payload
      };
      break;
    }
    case DELETE_PRODUCT_SUCCESS: {
      const newArrayOut = [...state.outProducts].slice();
      const positionOut = newArrayOut.indexOf(action.payload);
      newArrayOut.splice(positionOut, 1);
      const newArrayIn = [...state.inProducts].slice();
      const positionIn = newArrayIn.indexOf(action.payload);
      newArrayIn.splice(positionIn, 1);
      reducer = {
        ...state,
        outProducts: newArrayOut,
        inProducts: newArrayIn,
        isLoading: false
      };
      break;
    }
    default:
      reducer = state;
  }
  return reducer;
}
