import { configureStore, combineReducers } from "@reduxjs/toolkit";
import CartReducer from './slices/CartSlice'
import AppReducer from './slices/AppSlice'


const rootReducer = combineReducers({
cart: CartReducer,
app:AppReducer
})

export const store = configureStore({
    reducer: rootReducer
})

export type RootState = ReturnType<typeof store.getState>