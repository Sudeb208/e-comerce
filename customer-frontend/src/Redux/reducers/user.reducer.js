/* eslint-disable no-unused-vars */
import { userConstants } from '../actions/constants';

const initState = {
    error: null,
    message: '',
    loading: false,
    success: false,
};

export default (state = initState, action) => {
    switch (action.type) {
        case userConstants.USER_REGISTER_REQUEST:
            state = {
                ...state,
                loading: true,
            };
            break;
        case userConstants.USER_REGISTER_SUCCESS:
            state = {
                ...state,
                loading: false,
                message: action.payload.message,
                success: true,
            };
            break;
        case userConstants.USER_REGISTER_FAILURE:
            state = {
                ...state,
                message: 'register failed',
                loading: false,
            };
            break;
    }
    return state;
};
