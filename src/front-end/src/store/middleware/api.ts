import axios from 'axios';
import * as actions from '../api';
import { Middleware } from 'redux';

export const api: Middleware = ({ dispatch }) => (next) => async (action) => {
    if (action.type !== actions.apiCalled.type) return next(action);
    next(action);
    const { url, method, data, onSuccess } = action;
    try {
        const response = await axios.request({
            baseURL: "http://localhost:3000/api/", // TODO: add to a config file 
            url,
            method,
            data
        })
        dispatch(actions.apiCallSuccess(response.data));
    } catch (error: any) {
        dispatch(actions.apiCallFalied(error))
    }

}