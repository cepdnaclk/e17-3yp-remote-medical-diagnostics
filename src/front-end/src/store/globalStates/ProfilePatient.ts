import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { profileResponse } from "../../useCases/getProfile/getProfile";

const initialState: profileResponse = {
  name: "",
  email: "",
  age: 0,
  gender: "",
  mobileNo: "",
  homeAddress: "",
};

const profileSlice = createSlice({
  name: "patientProfile",
  initialState,
  reducers: {
    setProfile: (state, action: PayloadAction<profileResponse>) => {
      Object.assign(state, action.payload);
    },
  },
});

export const { setProfile } = profileSlice.actions;
export const { reducer } = profileSlice;
