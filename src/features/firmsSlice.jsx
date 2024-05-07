import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  firms: [],
  loading: false,
  error: false,
};

const firmsSlice = createSlice({
  name: "firms",
  initialState,
  reducers: {
    fetchFirmStart: (state) => {
      state.loading = true;
    },
    firmsSuccess:(state,{payload})=>{
        state.loading = false;
        state[payload.path] = payload.data.data;

    },
    successWitoutPayload: (state)=> {
        state.loading = false;

    },
    // deleteSuccess:(state,{payload})=> {
    //     state.loading = false;
    //     // state.firms = state.firms.filter(item => item._id !== payload); 
    // },
    // postNewDataSuccess:(state)=>{
    //     state.loading = false;
    // },
    fetchFirmEnd: (state) => {
      state.loading = false;
      state.error = true;
    },
  },
});

export const {fetchFirmStart,fetchFirmEnd,firmsSuccess,successWitoutPayload} = firmsSlice.actions;
export default firmsSlice.reducer;
