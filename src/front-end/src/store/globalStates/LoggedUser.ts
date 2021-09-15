import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    firstName:''
}

const userSlice = createSlice({
    name:"user",
    initialState,
    reducers:{
        setName:(state, action)=>{
            state.firstName=action.payload
        }
    }
})

export const {setName} = userSlice.actions
export const {reducer} = userSlice;
