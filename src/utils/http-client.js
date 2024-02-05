import axios from 'axios';
import authService from '../services/auth.service';

const instance = axios.create({
    baseURL: process.env.REACT_APP_API_BASE_URL 

});

instance.interceptors.request.use((config) => {
    const authUser =localStorage.getItem('authUser');
    if (authUser) {
        console.log(localStorage.getItem('authUser'))
        config.headers['authorization'] = `Bearer ${authUser}`;
        console.log(config)
    }
    return config;
}, (error) => {
    return Promise.reject(error);
});

instance.interceptors.response.use((response) => {
    return response;
}, (error) => {
    if (error?.response?.status === 401) { 
        localStorage.removeItem('authUser');
        window.location.reload();
    } else {
        return Promise.reject(error.response);
    }
});

const get = (url, params, config = {}) => instance.get(url, { params, ...config });
const post = (url, data, config = {}) => instance.post(url, data, config);
const put = (url, data, config = {}) => instance.put(url, data, config);
const remove=(url,data,config={})=>instance.delete(url,data,config);
const methods = { get, post,put,remove };

export default methods;
