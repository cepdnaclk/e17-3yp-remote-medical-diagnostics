import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    isJoined: false
}

const videoChatSlice = createSlice({
    name: "videoChat",
    initialState,
    reducers: {
        join: (state) => {
            state.isJoined = true
        }
    }
})

export const { join } = videoChatSlice.actions;
export const { reducer } = videoChatSlice;
