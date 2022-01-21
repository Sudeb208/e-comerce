import {
    categoryConstants,
    initialDataConstants,
    productConstants,
} from './constants';
import axios from '../../helpers/axios';

export const getInitialData = () => {
    return async dispatch => {
        dispatch({ type: initialDataConstants.GET_ALL_INITIALDATA_REQUEST });
        try {
            const res = await axios.get(`/initialdata`);
            if (res.status === 200) {
                const { categories, products } = res.data;
                dispatch({
                    type: productConstants.GET_PRODUCT_SUCCESS,
                    payload: { products },
                });
                dispatch({
                    type: categoryConstants.GET_ALL_CATEGORY_SUCCESS,
                    payload: { categories },
                });

                console.log(res);
            }
        } catch (error) {
            if (error) {
                console.log(error.response);
            }
        }
    };
};
