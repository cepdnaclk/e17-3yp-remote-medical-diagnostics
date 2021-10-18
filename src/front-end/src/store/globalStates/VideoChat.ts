import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    isJoined: false,
    doctor: ""
}

const videoChatSlice = createSlice({
    name: "videoChat",
    initialState,
    reducers: {
        join: (state, action) => {
            state.isJoined = true;
            state.doctor = action.payload.doctor;
        }
    }
})

export const { join } = videoChatSlice.actions;
export const { reducer } = videoChatSlice;
