import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    callAccepted: false,
    callEnded: false,
    stream: null,
    name: '',
    call: {},
    me: 0,
}

const videoChatSlice = createSlice({
    name: "videoChat",
    initialState,
    reducers: {
        answercall: (state) => {
            state.callAccepted = true;
        },
        setMe: (state, action) => {
            state.me = action.payload;
        },
        endCall: (state) => {
            state.callEnded = true;
        },
        setStream: (state, action) => {
            state.stream = action.payload;
        },
        setCallName: (state, action) => {
            state.name = action.payload;
        },
        setCall: (state, action) => {
            state.call = action.payload;
        },
    }
})

export const { answercall, setMe, setStream, setCallName, setCall } = videoChatSlice.actions;
export const { reducer } = videoChatSlice;
