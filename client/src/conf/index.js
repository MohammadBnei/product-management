import axios from 'axios'
import { DONE_LOADING, ERROR, LOADING } from '../redux/constants';
import store from '../redux/store';

export const PRODUCT_API_URI = process.env.PRODUCT_API_URI || 'https://localhost/api/product/'
export const EVENTS_API_URI = process.env.EVENTS_API_URI || 'https://localhost/api/events/'
export const USER_URL = process.env.USER_URL || 'https://localhost/api/user/'

// axios.defaults.headers.post['Content-Type'] ='application/x-www-form-urlencoded;charset=utf-8';
// axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*';
axios.defaults.baseURL = PRODUCT_API_URI;

axios.interceptors.request.use((req) => {
    store.dispatch({type: LOADING, payload: `${req.method} ${req.url}`})

    return req
})

axios.interceptors.response.use((res) => {
    store.dispatch({type: DONE_LOADING, payload: res.data.json})

    return res
}, err => {
    store.dispatch({type: DONE_LOADING})

    if (err.response)
        store.dispatch({type: ERROR, payload: err.response.message || 'Something went wrong'})
})



export default axios.create({

    validateStatus: function (status) {
        return status == 200;
    }
});

/**
 * Returns [resource, id]
 * @param {*} url 
 */
export const extractParamsFromUrl = url => url.split('/').filter(e => e).slice(-2)