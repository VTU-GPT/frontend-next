import { createSlice } from "@reduxjs/toolkit";

export const ChangeColor = createSlice({
    name : "ChangeColor",
    initialState : {
        color : '#000'
    },
    reducers : {
        changeColorToColor(state,action){
            state.color = '#444'
        } 
    }
})