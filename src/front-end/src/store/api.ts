import { createAction } from "@reduxjs/toolkit";

export interface apiCalledPayload {
    url: string,
    onSuccess: string,
    onError: string
}

export interface apiCallSuccessPayload {
    response: string
}

export interface apiCallFailedPayload {
    error: any
}
export const apiCalled = createAction<apiCalledPayload>("api/called");
export const apiCallSuccess = createAction<apiCallSuccessPayload>("api/callSuccess");
export const apiCallFalied = createAction<apiCallFailedPayload>("api/callFalied");