import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    isCollapsed:false
}

const userSlice = createSlice({
    name:"sidebar",
    initialState,
    reducers:{
        collapse:(state)=>{
            state.isCollapsed=true
        },
        expand: (state)=>{
            state.isCollapsed=false
        },
        toggle: (state)=>{
            state.isCollapsed=!state.isCollapsed
        }
    }
})

export const {collapse, expand, toggle} = userSlice.actions
export const {reducer} = userSlice;
