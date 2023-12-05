import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-hot-toast";

import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState={
    loading:false,
    recproducts:new Array(),
    techproducts:new Array(),
    homeproducts:new Array(),
    elecproducts:new Array(),

    product:{}
}
export const getProduct = createAsyncThunk(
    "/products/find",
    async (id:number, thunkAPI:any) => {
      try {
        
        const res= await axios.get(`http://localhost:8000/api/products/find/${id}`)
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
export const getRecProduct = createAsyncThunk(
    "/products/getitemrec",
    async (id:number, thunkAPI:any) => {
      try {
        
        const res= await axios.get(`http://127.0.0.1:4000/api/products/getitemrec/${id}`)
        
       
        return res.data.recs
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
export const getTechProduct = 
createAsyncThunk(
    "/products/tech",
    async (_,thunkAPI:any) => {
      try {
        
        const res=await axios.get('http://localhost:8000/api/products/getcategory',{params:{category:"Computers&Accessories'"}})
        
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
export const getElecProduct = createAsyncThunk(
    "/products/getelec",
    async (_, thunkAPI:any) => {
      try {
        
        const res=await axios.get('http://localhost:8000/api/products/getcategory',{params:{category:"Electronics'"}})
       
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
export const getHomeProduct = createAsyncThunk(
    "/products/gethome",
    async (_, thunkAPI:any) => {
      try {
       
        const res=await axios.get('http://localhost:8000/api/products/getcategory',{params:{category:"Home&Kitchen'"}})
        
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

const productSlice=createSlice({name:"product",initialState,reducers:{
    GETPRODUCT(action,payload){
        console.log("DONE")
    }

},extraReducers(builder) {
    builder.addCase(getProduct.pending,(state,action:any)=>{
        state.loading=true;
        
    })
    .addCase(getProduct.fulfilled,(state,action:any)=>{
        
        state.product=action.payload
        state.loading=false
    })
    .addCase(getRecProduct.pending,(state,action:any)=>{
        state.loading=true;
       
    })
    .addCase(getRecProduct.fulfilled,(state,action:any)=>{
        
        state.recproducts=action.payload
        state.loading=false
    })
 .addCase(getHomeProduct.pending,(state,action:any)=>{
        state.loading=true;
       
    })
 .addCase(getHomeProduct.fulfilled,(state,action:any)=>{
        
        state.homeproducts=action.payload
        state.loading=false
    })
    .addCase(getTechProduct.pending,(state,action:any)=>{
        state.loading=true;
       
    })
    .addCase(getTechProduct.fulfilled,(state,action:any)=>{
        
        state.techproducts=action.payload
        state.loading=false
        
    })
    .addCase(getElecProduct.pending,(state,action:any)=>{
        state.loading=true;
        
    })
    .addCase(getElecProduct.fulfilled,(state,action:any)=>{
        
        state.elecproducts=action.payload
       
    })
},})
export const { GETPRODUCT } =
  productSlice.actions;
export const selectProduct = (state:any) => state.product.product;
export const selectRecproduct = (state:any) => state.product.recproducts;
export const selectTechproduct = (state:any) => state.product.techproducts;
export const selectHomeproduct = (state:any) => state.product.homeproducts;
export const selectElecproduct = (state:any) => state.product.elecproducts;

export default productSlice.reducer;