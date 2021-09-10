import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState = {
  firstName: "",
  accessToken: "",
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
  },
});

export const { setName, setAccessToken } = userSlice.actions;
export const { reducer } = userSlice;
