import { configureStore } from "@reduxjs/toolkit";
import { reducer as loggedUserReducer } from "./globalStates/LoggedUser";
import { reducer as sidebarReducer } from "./globalStates/SidebarState";
import { reducer as videoChatReducer } from "./globalStates/VideoChat";
import { reducer as appointmentsReducer } from "./globalStates/appointmentsState";
import { reducer as patientProfileReducer } from "./globalStates/ProfilePatient";
import { api } from "./middleware/api";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";

const Store = configureStore({
  reducer: {
    user: loggedUserReducer,
    sidebar: sidebarReducer,
    videoChat: videoChatReducer,
    appointments: appointmentsReducer,
    patientProfile: patientProfileReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(api),
});
export type RootState = ReturnType<typeof Store.getState>;
export type AppDispatch = typeof Store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
export default Store;
