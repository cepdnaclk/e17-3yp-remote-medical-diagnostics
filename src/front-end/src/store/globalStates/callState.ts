import { createSlice } from '@reduxjs/toolkit'
import { Socket } from 'socket.io-client';

const initialState = {
    callAccepted: false,
    callEnded: false,
    // myVideo: undefined,
    // callerVideo: undefined,
    stream: false,
    name: '',
    call: {
        isReceivingCall: false,
        from: "",
        name: "",
        signal: ""
    },
    me: 0,
}

export interface Call {
    isReceivingCall: boolean,
    from: string,
    name: string,
    signal: string

}

const videoChatSlice = createSlice({
    name: "videoChat",
    initialState,
    reducers: {
        answerCall: (state) => {
            state.callAccepted = true;
        },
        setMe: (state, action) => {
            state.me = action.payload;
        },
        endCall: (state) => {
            state.callEnded = true;
        },
        // setMyVideo: (state, action) => {
        //     state.myVideo = action.payload;
        // },
        // setCallerVideo: (state, action) => {
        //     state.callerVideo = action.payload;
        // },
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

export const { answerCall, setMe, /* setCallerVideo, setMyVideo, */ setCallName, setCall, setStream, endCall } = videoChatSlice.actions;
export const { reducer } = videoChatSlice;
