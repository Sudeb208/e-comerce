/* eslint-disable no-undef */
import axios from 'axios';
import { api } from '../UrlConfig';
import store from '../Store/index';
import { authConstants } from '../Store/constants';
const token = window.localStorage.getItem('token');

const axiosIntance = axios.create({
    baseURL: api,
    headers: {
        Authorization: token ? `Barer ${token} ` : null,
    },
});
//axios middleware
axiosIntance.interceptors.response.use(req => {
    const { auth } = store.getState();
    if (auth.token) {
        req.headers.Authorization = `Bearer ${auth.token}`;
    }
    return req;
});
axiosIntance.interceptors.response.use(
    res => {
        return res;
    },
    error => {
        console.log(error);
        const { message } = error.response.data;
        console.log(message);
        if (message == 'jwt expired') {
            console.log('hello world');
            localStorage.clear();
            store.dispatch({ type: authConstants.LOGOUT_SUCCESS });
        }
        if (message == 'jwt must be provided') {
            console.log('hello world');
            localStorage.clear();
            store.dispatch({ type: authConstants.LOGOUT_SUCCESS });
        }
        return Promise.reject(error);
    },
);
export default axiosIntance;
