import axios from '../../helpers/axios';
import { productConstants } from './constants';

export const addProduct = form => {
    return async dispatch => {
        dispatch({ type: productConstants.POST_PRODUCT_REQUEST });
        try {
            const res = await axios.post(`/product/create`, form);
            console.log(res);
            if (res.status == 201) {
                dispatch({
                    type: productConstants.POST_PRODUCT_SUCCESS,
                    payload: {
                        product: res.data.product,
                    },
                });
            }
        } catch (error) {
            dispatch({
                type: productConstants.POST_PRODUCT_FAILURE,
                payload: {
                    error: error.response
                        ? error.response.message
                        : 'there was an unknown error',
                },
            });
        }
    };
};
