import { configureStore } from "@reduxjs/toolkit";
import { reducer as loggedUserReducer } from "./globalStates/LoggedUser";
import { reducer as sidebarReducer } from "./globalStates/SidebarState";
import { reducer as videoChatReducer } from "./globalStates/VideoChat";
import { reducer as appointmentsReducer } from "./globalStates/VideoChat";
import { api } from './middleware/api';

const Store = configureStore({
    reducer: {
        user: loggedUserReducer,
        sidebar: sidebarReducer,
        videoChat: videoChatReducer,
        appointments: appointmentsReducer
    }, middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(api)
})
export type RootState = ReturnType<typeof Store.getState>
export type AppDispatch = typeof Store.dispatch
export default Store;