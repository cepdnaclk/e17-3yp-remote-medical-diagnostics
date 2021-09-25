import axios from 'axios';
import * as actions from '../actions/endCall';
import { Middleware } from 'redux';

export const endCall: Middleware = ({ dispatch }) => (next) => async (action) => {
    if (action.type !== actions.endCallCalled.type) return next(action);
    next(action);
    const { url, method, data /* onSuccess */ } = action;
    try {
        const response = await axios.request({
            baseURL: "http://localhost:3000/endCall/", // TODO: add to a config file 
            url,
            method,
            data
        })
        dispatch(actions.endCallCallSuccess(response.data));
    } catch (error: any) {
        dispatch(actions.endCallCallFalied(error))
    }

}