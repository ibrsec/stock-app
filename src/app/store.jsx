import { configureStore } from "@reduxjs/toolkit";
import authSlice from "../features/authSlice";
import firmsSlice from "../features/firmsSlice";


 const store = configureStore({
    reducer:{
        auth:authSlice,
        firms:firmsSlice
    },
    devTools:process.env.NODE_ENV !== 'production'
});
export default store;