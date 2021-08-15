import { configureStore } from "@reduxjs/toolkit";
import { reducer as loggedUserReducer } from "./globalStates/LoggedUser";
import {reducer as sidebarReducer } from "./globalStates/SidebarState"

const Store = configureStore({
    reducer:{
        user: loggedUserReducer,
        sidebar: sidebarReducer
    }
})


export type RootState = ReturnType<typeof Store.getState>
export type AppDispatch = typeof Store.dispatch
export default Store;