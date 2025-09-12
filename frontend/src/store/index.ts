import { configureStore, combineReducers } from "@reduxjs/toolkit";
import CartReducer from './slices/CartSlice'


const rootReducer = combineReducers({
cart: CartReducer
})

export const store = configureStore({
    reducer: rootReducer
})

export type RootState = ReturnType<typeof store.getState>