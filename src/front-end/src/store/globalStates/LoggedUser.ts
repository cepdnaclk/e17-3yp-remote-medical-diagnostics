import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState = {
    firstName: "",
    accessToken: "",
    type: "",
};

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setName: (state, action: PayloadAction<string>) => {
            state.firstName = action.payload;
        },
        setAccessToken: (state, action: PayloadAction<string>) => {
            state.accessToken = action.payload;
        },
        seType: (state, action: PayloadAction<string>) => {
            state.type = action.payload;
        },
    },
});

export const { setName, setAccessToken, seType } = userSlice.actions;
export const { reducer } = userSlice;