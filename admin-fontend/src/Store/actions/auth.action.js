import axios from '../../helpers/axios';
import { authConstants } from './constants';

export const login = user => {
    console.log(user);
    return async dispatch => {
        dispatch({ type: authConstants.LOGIN_REEQUEST });
        try {
            const res = await axios.post('/admin/signin', { ...user });
            console.log(res);
            if (res.status === 200) {
                const { token, user } = res.data;
                localStorage.setItem('token', token);
                localStorage.setItem('user', JSON.stringify(user));
                dispatch({
                    type: authConstants.LOGIN_SUCCESS,
                    payload: {
                        token,
                        user,
                    },
                });
            }
        } catch (error) {
            console.log(error);
            dispatch({
                type: authConstants.LOGIN_FAILUR,
                payload: {
                    message: error.response.message,
                },
            });
        }
    };
};
export const isUserLoggedIn = () => {
    return async dispatch => {
        const token = localStorage.getItem('token');
        if (token) {
            const user = localStorage.getItem('user');
            console.log(user);
            dispatch({
                type: authConstants.LOGIN_SUCCESS,
                payload: {
                    token,
                    user,
                },
            });
        } else {
            dispatch({
                type: authConstants.LOGOUT_FAILUR,
                payload: { error: 'needs to login' },
            });
        }
    };
};

export const signOut = () => {
    return async dispatch => {
        dispatch({ type: authConstants.LOGOUT_REQUEST });
        try {
            const res = await axios.post('/admin/signout');
            console.log(res);
            if (res.status === 200) {
                localStorage.clear();
                dispatch({
                    type: authConstants.LOGOUT_SUCCESS,
                    payload: {
                        message: res.data.message,
                    },
                });
            }
        } catch (error) {
            dispatch({
                type: authConstants.LOGOUT_FAILUR,
                payload: {
                    message: error.response,
                },
            });
            console.log(error.response.data);
        }
    };
};
