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
      state.error = false;
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
    fetchFirmFail: (state) => {
      state.loading = false;
      state.error = true;
    },
    deleteFirmsLogout : (state)=>{
      state.firms = []
      
    }
  },
});

export const {fetchFirmStart,fetchFirmFail,firmsSuccess,successWitoutPayload,deleteFirmsLogout} = firmsSlice.actions;
export default firmsSlice.reducer;


 
 
//todo css