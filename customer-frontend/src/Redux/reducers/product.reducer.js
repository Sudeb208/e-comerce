/* eslint-disable default-case */
import { productConstants } from '../actions/constants';

const initState = {
    loading: false,
    error: '',
    message: '',
    products: [],
    productPage: {},
    productsByPrice: {
        under5k: [],
        under10k: [],
        under15k: [],
        under20k: [],
        under30k: [],
        upper30k: [],
    },
    productDetails: {},
};

const productReducer = (state = initState, action) => {
    switch (action.type) {
        case productConstants.GET_PRODUCT_BY_CATEGORY_REQUEST:
            state = {
                ...state,
                loading: true,
            };
            break;
        case productConstants.GET_PRODUCT_BY_CATEGORY_SUCCESS:
            state = {
                ...state,
                products: action.payload.data.products,
                productsByPrice: {
                    ...action.payload.data.productByPrice,
                },
                loading: false,
            };
            break;
        case productConstants.GET_PRODUCT_BY_CATEGORY_FAILURE:
            state = {
                ...state,
                loading: false,
                error: action.payload.error,
            };
            break;
        case productConstants.GET_PRODUCT_BY_PAGE_REQUEST:
            state = {
                ...state,
                loading: true,
            };
            break;
        case productConstants.GET_PRODUCT_BY_PAGE_SUCCESS:
            state = {
                ...state,
                loading: false,
                productPage: action.payload,
            };
            break;
        case productConstants.GET_PRODUCT_BY_PAGE_FAILURE:
            state = {
                ...initState,
                loading: false,
                error: action.payload.error,
            };
            break;
        case productConstants.GET_PRODUCT_SINGLE_REQUEST:
            state = {
                ...state,
                loading: true,
            };
            break;
        case productConstants.GET_PRODUCT_SINGLE_SUCCESS:
            state = {
                ...state,
                loading: false,
                productDetails: action.payload,
            };
            break;
        case productConstants.GET_PRODUCT_SINGLE_FAILURE:
            state = {
                ...state,
                loading: false,
                error: action.payload,
            };
    }
    return state;
};

export default productReducer;
