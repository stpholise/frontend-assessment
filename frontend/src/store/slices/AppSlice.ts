import { createSlice } from "@reduxjs/toolkit";

const appSlice = createSlice({
    name:'app',
    initialState: {
        menuState: false,
    },
    reducers: {
        setMenuState : (state, action ) => {
            state.menuState = action.payload
        }
    }
})


export const { setMenuState } = appSlice.actions;

export default appSlice.reducer