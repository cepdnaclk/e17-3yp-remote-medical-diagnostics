import axios from 'axios';
import * as actions from '../actions/makeCall';
import { Middleware } from 'redux';

export const makeCall: Middleware = ({ dispatch }) => (next) => async (action) => {
    if (action.type !== actions.makeCallCalled.type) return next(action);
    next(action);
    const { url, method, data /* onSuccess */ } = action;
    try {
        const response = await axios.request({
            baseURL: "http://localhost:3000/makeCall/", // TODO: add to a config file 
            url,
            method,
            data
        })
        dispatch(actions.makeCallCallSuccess(response.data));
    } catch (error: any) {
        dispatch(actions.makeCallCallFalied(error))
    }

}