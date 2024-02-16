import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-hot-toast";

import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState={
    loading:false,
    searchproducts:new Array(),
    crecproducts:new Array(),
    precproducts:new Array(),
    irecproducts:new Array(),
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
        
       
        const c_recs=res.data.rec
        const i_recs=res.data.i_rec
        return {c_recs,i_recs}
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
export const getPRecProduct = createAsyncThunk(
    "/products/getrecs",
    async (id:number, thunkAPI:any) => {
      try {
        
        const res= await axios.get(`http://127.0.0.1:4000/getrecs/${id}`)
        
       
        const c_recs=res.data.recs
        
        return c_recs
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
        
        const res=await axios.get('http://localhost:8000/api/products/getcategory',{params:{category:"Sports & Outdoors "}})
        
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
        
        const res=await axios.get('http://localhost:8000/api/products/getcategory',{params:{category:"Toys & Games "}})
       
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
       
        const res=await axios.get('http://localhost:8000/api/products/getcategory',{params:{category:"Clothing, Shoes & Jewelry "}})
        
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
    SETPRODUCT(state,action){
      
      const result=action.payload
      
       state.searchproducts=result
    },
    FILTERPRODUCT(state,action){
      const{text,result,price,rating}=action.payload
      console.log(price,rating)
      console.log(state.searchproducts)
      const filteredProd=result.filter((item:any,index:Number)=>{
        return(
          item.discounted_price*120<=price&&item.ratings>=rating
        )
      })
      // filteredProd.forEach((item,index)=>{
        //   if(item.product_name.toLowerCase().includes(text.toLowerCase())){
          
          //   }
          // })
          // console.log(filteredProd)
          if(filteredProd.length!=0){
            filteredProd.sort(function(x:any,y:any){return x.product_name.toLowerCase().includes(text.toLowerCase())?-1:y.product_name.toLowerCase().includes(text.toLowerCase())?1:0})
            
            state.searchproducts=filteredProd
      }
      else{
        state.searchproducts=result
      }
      
      
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
      const {c_recs,i_recs}=action.payload
        
        state.crecproducts=c_recs
        state.irecproducts=i_recs
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
    .addCase(getPRecProduct.pending,(state,action:any)=>{
      state.loading=true
    })
    .addCase(getPRecProduct.fulfilled,(state,action:any)=>{
      state.precproducts=action.payload
    })
},})
export const { SETPRODUCT,FILTERPRODUCT } =
  productSlice.actions;
export const selectProduct = (state:any) => state.product.product;
export const selectSearchProd=(state:any)=>state.product.searchproducts
export const selectCRecproduct = (state:any) => state.product.crecproducts;
export const selectIRecproduct = (state:any) => state.product.irecproducts;
export const selectTechproduct = (state:any) => state.product.techproducts;
export const selectHomeproduct = (state:any) => state.product.homeproducts;
export const selectElecproduct = (state:any) => state.product.elecproducts;
export const selectPProduct=(state:any)=>state.product.precproducts

export default productSlice.reducer;