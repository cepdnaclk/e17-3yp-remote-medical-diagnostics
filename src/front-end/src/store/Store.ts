import { configureStore } from "@reduxjs/toolkit";
import { reducer as loggedUserReducer } from "./globalStates/LoggedUser";
import { reducer as sidebarReducer } from "./globalStates/SidebarState";
import { reducer as videoChatReducer } from "./globalStates/VideoChat";
import { reducer as appointmentsReducer } from "./globalStates/appointmentsState";
import { reducer as callReducer } from "./globalStates/callState";
import { api } from './middleware/api';
import { endCall } from './middleware/endCall';
import { makeCall } from './middleware/makeCall';
import { answerCall } from './middleware/answerCall';

const Store = configureStore({
    reducer: {
        user: loggedUserReducer,
        sidebar: sidebarReducer,
        videoChat: videoChatReducer,
        appointments: appointmentsReducer,
        call: callReducer,
    }, middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware()
            .concat(api)
            .concat(endCall)
            .concat(makeCall)
            .concat(answerCall)
})
export type RootState = ReturnType<typeof Store.getState>
export type AppDispatch = typeof Store.dispatch
export default Store;