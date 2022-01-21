/* eslint-disable no-undef */
import axios from 'axios';
import { api } from '../UrlConfig';

const token = window.localStorage.getItem('token');

const axiosIntance = axios.create({
    baseURL: api,
    headers: {
        'Authorization': token ? `Barer ${token} `: null,
    },
});

export default axiosIntance;
