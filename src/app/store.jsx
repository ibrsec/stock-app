// import { configureStore } from "@reduxjs/toolkit";
// import authSlice from "../features/authSlice";
// import firmsSlice from "../features/firmsSlice";

//  const store = configureStore({
//     reducer:{
//         auth:authSlice,
//         firms:firmsSlice
//     },
//     devTools:process.env.NODE_ENV !== 'production'
// });
// export default store;

import { combineReducers, configureStore } from "@reduxjs/toolkit";
import authSlice from "../features/authSlice";
import firmsSlice from "../features/firmsSlice";
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage' // defaults to localStorage for web
 


const rootReducer = combineReducers({
  auth: authSlice,
  firms: firmsSlice,
});
const persistConfig = {
    key: 'root',
    storage,
    version:1
  }
 
const persistedReducer = persistReducer(persistConfig, rootReducer)


const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
  devTools: process.env.NODE_ENV !== "production",
});
export default store;
export const persistor = persistStore(store);