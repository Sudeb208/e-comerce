import axios from '../../helpers/axios';
import { productConstants } from './constants';

export const getProductByCategory = category => {
    return async dispatch => {
        dispatch({ type: productConstants.GET_PRODUCT_BY_CATEGORY_REQUEST });
        try {
            const res = await axios.get(`/product/${category}`);
            console.log(res);
            if (res.status === 200) {
                dispatch({
                    type: productConstants.GET_PRODUCT_BY_CATEGORY_SUCCESS,
                    payload: { data: res.data },
                });
            }
        } catch (error) {
            if (error) {
                dispatch({
                    type: productConstants.GET_PRODUCT_BY_CATEGORY_FAILURE,
                    payload: { error: error.response },
                });
            }
        }
    };
};

export const getPageProduct = params => {
    return async dispatch => {
        try {
            dispatch({ type: productConstants.GET_PRODUCT_BY_PAGE_REQUEST });
            const res = await axios.get(`/page/${params.cid}/${params.type}`);
            if (res.status === 200) {
                dispatch({
                    type: productConstants.GET_PRODUCT_BY_PAGE_SUCCESS,
                    payload: res.data.page,
                });
            }
        } catch (error) {
            console.log(error.response);
            dispatch({
                type: productConstants.GET_PRODUCT_BY_PAGE_FAILURE,
                payload: error.response.data,
            });
        }
    };
};
