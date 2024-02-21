import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-hot-toast";

import { createAsyncThunk } from "@reduxjs/toolkit";
import useAuth from "hooks/useAuth"
import axios from "utils/axios";


const initialState={
    isloading:false,
    cart:new Array()
}
export const getCart = createAsyncThunk(
    "/cart/getcart",
    async (email:any, thunkAPI:any) => {
      try {
        let cart=[]
        
        console.log(email)
        const res= await axios.get(`http://localhost:8000/api/cart/getcart/${email}`)
      
        console.log(res)
        for(let i=0;i<res.data.length;i++){
          cart.push(res.data[i][0])
         }
        return cart
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
export const Add2Cart = createAsyncThunk(
    "/products/create",
    async (obj:Object, thunkAPI:any) => {
      try {
       
        return await axios.post('http://localhost:8000/api/cart/addtocart',obj)
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
const cartSlice=createSlice({
    name:'cart',
    initialState,
    reducers:{
        ADD_CART(state,action){
            Add2Cart(action.payload)
            const new_product:Object=action.payload
            const newState=[...state.cart]
            newState.push(new_product)
            state.cart=newState
        },
        
    },
    extraReducers:(builder)=>{
        builder.addCase(Add2Cart.pending, (state, action) => {
            state.isloading = true;
          })
          .addCase(Add2Cart.fulfilled, (state, action) => {
            state.isloading = false;
            
            console.log(action.payload);
            
          })
          .addCase(Add2Cart.rejected, (state, action) => {
            state.isloading = false;
            
            console.log(action.payload);
    
           
          }).addCase(getCart.pending, (state, action) => {
            state.isloading = true;
          })
          .addCase(getCart.fulfilled, (state, action) => {
            state.isloading = false;
            
            
            state.cart = action.payload;
          })
          .addCase(getCart.rejected, (state, action) => {
            state.isloading = false;
            
            console.log(action.payload);
    
           
          })
    
    }
})
export const{ADD_CART}=cartSlice.actions
export const selectCart=(state:any)=>state.cart.cart
export default cartSlice.reducer