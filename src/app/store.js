import { configureStore } from "@reduxjs/toolkit";
import crudReducer from '../features/crudSlice'

const store = configureStore({
    reducer: crudReducer
})

export default store;