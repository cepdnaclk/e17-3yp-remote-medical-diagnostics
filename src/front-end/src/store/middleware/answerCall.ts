import axios from 'axios';
import * as actions from '../actions/answerCall';
import { Middleware } from 'redux';

export const answerCall: Middleware = ({ dispatch }) => (next) => async (action) => {
    if (action.type !== actions.answerCallCalled.type) return next(action);
    next(action);
    const { url, method, data /* onSuccess */ } = action;
    try {
        const response = await axios.request({
            baseURL: "http://localhost:3000/answerCall/", // TODO: add to a config file 
            url,
            method,
            data
        })
        dispatch(actions.answerCallCallSuccess(response.data));
    } catch (error: any) {
        dispatch(actions.answerCallCallFalied(error))
    }

}