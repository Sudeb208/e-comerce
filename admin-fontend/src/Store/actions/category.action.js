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

export const addCategory = form => {
    return async dispach => {
        dispach({
            type: categoryConstants.POST_CATEGORY_REQUEST,
        });
        try {
            const res = await axios.post(`/category/create`, form);
            console.log(res.data);
            if (res.status === 201) {
                dispach({
                    type: categoryConstants.POST_CATEGORY_SUCCESS,
                    payload: {
                        category: res.data.category,
                    },
                });
            }
        } catch (error) {
            if (error) {
                dispach({
                    type: categoryConstants.POST_CATEGORY_FAILURE,
                    payload: {
                        error: 'there was known error', //error.response.data.message,
                    },
                });
                console.log('there was a error');
                console.log({ error });
            }
        }
    };
};

export const updateCategories = form => {
    return async dispatch => {
        try {
            const res = await axios.post(`category/update`, form);
            if (res.status == 200) {
                return true;
            }
        } catch (error) {
            console.log(error);
        }
    };
};

export const deleteCategories = form => {
    return async dispatch => {
        try {
            const res = await axios.post(`category/delete`, form);
            if(res.status == 200){
                return true
            }
        } catch (error) {
            console.log(error);
        }
    };
};
