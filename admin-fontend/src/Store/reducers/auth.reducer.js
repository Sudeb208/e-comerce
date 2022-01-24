import { authConstants } from '../constants';

const initState = {
    token: null,
    user: {
        email: '',
        fristName: '',
        fullName: '',
        lastName: '',
        role: '',
    },
    authenticate: false,
    authenticating: false,
    loading: false,
    error: null,
    message: '',
};

export default (state = { initState }, action) => {
    console.log(action);
    switch (action.type) {
        case authConstants.LOGIN_REEQUEST:
            state = {
                ...state,
                authenticating: true,
            };
            break;
        case authConstants.LOGIN_SUCCESS:
            state = {
                user: action.payload.user,
                token: action.payload.token,
                authenticate: true,
                authenticating: false,
            };
            break;
        case authConstants.LOGIN_FAILUR:
            state = {
                ...state,
            };
            break;
        case authConstants.LOGOUT_REQUEST:
            state = {
                ...state,
                loading: true,
            };
            break;
        case authConstants.LOGOUT_SUCCESS:
            state = {
                ...initState,
                message: action.payload.message,
            };
            break;
        case authConstants.LOGOUT_FAILUR:
            state = {
                ...state,
                loading: false,
                error: action.payload.message,
            };
    }

    return state;
};
