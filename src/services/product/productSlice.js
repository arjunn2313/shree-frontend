import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { productService } from "./productService";


export const getAllProducts= createAsyncThunk("product/get",async(thunkAPI)=>{
    try {
        return await productService.getProducts()
    } catch (error) {
        return thunkAPI.rejectWithValue(error)
    }
})

export const getAProducts= createAsyncThunk("product/getAproduct",async(id,thunkAPI)=>{
    try {
        return await productService.getSingleProduct(id)
    } catch (error) {
        return thunkAPI.rejectWithValue(error)
    }
})

export const addToWishList= createAsyncThunk("product/wishlist",async(prodId,thunkAPI)=>{
    try {
        return await productService.addToWishList(prodId)
    } catch (error) {
        return thunkAPI.rejectWithValue(error)
    }
})

const  initialState = {
    product : "",
    isError:false,
    isSuccess:false,
    isLoading:false,
    message : ""
}

 

export const productSlice = createSlice({
    name : "product",
    initialState:initialState,
    reducers:{},
    extraReducers:(builder)=>{
        builder.addCase(getAllProducts.pending,(state)=>{
            state.isLoading=true
        }).addCase(getAllProducts.fulfilled,(state,action)=>{
            state.isLoading = false;
            state.isError = false;
            state.isSuccess = true;
            state.product = action.payload
            
        }).addCase(getAllProducts.rejected,(state,action)=>{
            state.isError = true;
            state.isLoading = false;
            state.isSuccess = false;
            state.message = action.error;
        }).addCase(addToWishList.pending,(state)=>{
            state.isLoading = true;
        }).addCase(addToWishList.fulfilled,(state,action)=>{
            state.isLoading = false;
            state.isError = false;
            state.isSuccess = true;
            state.addToWishList=action.payload;
            state.message="Product added to wishlist"
        }).addCase(addToWishList.rejected,(state,action)=>{
            state.isError = true;
            state.isLoading = false;
            state.isSuccess = false;
            state.message = action.error;  
        })
        .addCase(getAProducts.pending,(state)=>{
            state.isLoading = true;
        }).addCase(getAProducts.fulfilled,(state,action)=>{
            state.isLoading = false;
            state.isError = false;
            state.isSuccess = true;
            state.singleProduct=action.payload;
            state.message="Product Fetched successfully"
        }).addCase(getAProducts.rejected,(state,action)=>{
            state.isError = true;
            state.isLoading = false;
            state.isSuccess = false;
            state.message = action.error;  
        })
    }
})

export default productSlice.reducer;
 