import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-hot-toast";

import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "utils/axios";
import useAuth from "hooks/useAuth";




const path=localStorage.getItem('filePath')
const initialState={
    current_img:path,
    loading:false,
    history:[]
}
console.log(path)
export const getHistory = createAsyncThunk(
    "/transaction/find",
    async (id:number, thunkAPI:any) => {
      try {
        
        const res= await axios.get(`http://localhost:8000/api/transaction/history/${id}`)
        return res.data
       
      } catch (error:any) {
        const message =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();
        return thunkAPI.rejectWithValue(message);
      }
    }
  );
export const clearHistory = createAsyncThunk(
    "/transaction/clear",
    async (id:number, thunkAPI:any) => {
      try {
        
        const res= await axios.delete(`http://localhost:8000/api/transaction/clear/${id}`)
        return res.data
       
      } catch (error:any) {
        const message =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();
        return thunkAPI.rejectWithValue(message);
      }
    }
  );

const userSlice=createSlice({name:'user',initialState,reducers:{
    UPDATE_USER(state,action){
        state.current_img=action.payload
    }
},extraReducers(builder){
    builder.addCase(getHistory.pending,(state,action)=>{
        state.loading=true
    }).addCase(getHistory.fulfilled,(state,action)=>{
        state.history=action.payload
        state.loading=false
    }).addCase(clearHistory.pending,(state,action)=>{
        state.loading=true
    }).addCase(clearHistory.fulfilled,(state,action)=>{
        state.history=[]
    })
}

})
export const{UPDATE_USER}=userSlice.actions
export const selectUser=(state:any)=>state.user.current_img
export const selectHistory=(state:any)=>state.user.history
export default userSlice.reducer