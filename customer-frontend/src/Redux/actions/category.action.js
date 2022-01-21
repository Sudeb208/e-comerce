/* eslint-disable no-unused-vars */
import axios from '../../helpers/axios';
import { categoryConstants } from './constants';

export const getAllCategory = () => {
    return async dispach => {
        try {
            dispach({ type: categoryConstants.GET_ALL_CATEGORY_REQUEST });
            const res = await axios.get(`/category`);
            if (res) {
                const { categories } = res.data;
                dispach({
                    type: categoryConstants.GET_ALL_CATEGORY_SUCCESS,
                    payload: { categories },
                });
            }
            console.log(res.data.categories);
            console.log(dispach);
        } catch (error) {
            dispach({
                type: categoryConstants.GET_ALL_CATEGORY_FAILURE,
                payload: {
                    error: error.data.message,
                },
            });
            console.log(error.response.message);
        }
    };
};
