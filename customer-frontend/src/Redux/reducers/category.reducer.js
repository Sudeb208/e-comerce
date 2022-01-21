/* eslint-disable no-case-declarations */
import { categoryConstants } from '../actions/constants';

const iniState = {
    categories: [],
    loading: false,
    error: '',
    message: '',
    newCategory: '',
};

const categoryReducer = (state = { iniState }, action) => {
    switch (action.type) {
        case categoryConstants.GET_ALL_CATEGORY_REQUEST:
            state = {
                ...state,
                loading: true,
            };
            break;
        case categoryConstants.GET_ALL_CATEGORY_SUCCESS:
            state = {
                ...state,
                loading: false,
                categories: action.payload.categories,
            };
            break;
        case categoryConstants.GET_ALL_CATEGORY_FAILURE:
            state = {
                ...state,
                loading: false,
                error: action.payload.error,
            };
            break;
        default:
            state = {
                ...state,
            };
    }
    return state;
};
export default categoryReducer;
