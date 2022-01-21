import { productConstants } from '../actions/constants';

const initState = {
    loading: false,
    error: '',
    message: '',
    products: [],
};

const productReducer = (state = { initState }, action) => {
    switch (action.type) {
        case productConstants.POST_PRODUCT_REQUEST:
            state = {
                ...state,
                loading: true,
            };
            break;
        case productConstants.POST_PRODUCT_SUCCESS:
            state = {
                ...state,
                loading: false,
            };
            break;
        case productConstants.POST_PRODUCT_FAILURE:
            state = {
                ...state,
                loading: false,
                error: action.payload.error,
            };
            break;
        case productConstants.GET_PRODUCT_REQUEST:
            state = {
                ...state,
                loading: true,
            };
            break;
        case productConstants.GET_PRODUCT_SUCCESS:
            state = {
                ...initState,
                loading: false,
                products: action.payload.products,
            };
    }
    return state;
};

export default productReducer;
