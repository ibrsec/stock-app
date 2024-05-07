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
        state.firms = payload.data;

    },
    deleteSuccess:(state,{payload})=> {
        state.loading = false;
        // state.firms = state.firms.filter(item => item._id !== payload); 
    },
    fetchFirmEnd: (state) => {
      state.loading = false;
      state.error = true;
    },
  },
});

export const {firmsSuccess,deleteSuccess,fetchFirmStart,fetchFirmEnd} = firmsSlice.actions;
export default firmsSlice.reducer;
