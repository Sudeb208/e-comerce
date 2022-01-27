/* eslint-disable no-unused-vars */
import axios from '../../helpers/axios';

export const addPage = form => {
    return async dispatch => {
        try {
            const res = await axios.post(`/page/create`, form);
            console.log(res);
        } catch (error) {
            console.log(error.response);
        }
    };
};
