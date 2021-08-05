import { configureStore } from "@reduxjs/toolkit";
import { reducer as loggedUserReducer } from "./globalStates/LoggedUser";

const Store = configureStore({
    reducer:{
        user: loggedUserReducer
    }
})


export type RootState = ReturnType<typeof Store.getState>
export type AppDispatch = typeof Store.dispatch
// export type AppDispatch = typeof Store.dispatch
export default Store;