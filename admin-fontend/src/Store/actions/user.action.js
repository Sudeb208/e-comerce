import axios from '../../helpers/axios';
import { userConstants } from './constants';

export const signup = user => {
    console.log(user);
    return async dispatch => {
        dispatch({ type: userConstants.USER_REGISTER_REQUEST });
        try {
            const res = await axios.post('/admin/signup', { ...user });
            console.log(res);
            if (res.status === 201) {
                const { message } = res.data;

                dispatch({
                    type: userConstants.USER_REGISTER_SUCCESS,
                    payload: {
                        message,
                    },
                });
            }
        } catch (error) {
            let message;
            if (error.response.data.message) {
                message = error.response.data.message;
                window.alert(message);
            } else {
                message = error.response.data.error;
                window.alert(message);
            }
            dispatch({
                type: userConstants.USER_REGISTER_FAILURE,
                payload: { error: message },
            });
        }
    };
};
