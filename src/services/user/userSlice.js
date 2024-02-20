import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import { authService } from "./userService";
import { toast } from "react-toastify";



export const registerUser = createAsyncThunk("auth/register",async(userData,thunkAPI)=>{
    try {
        return await authService.register(userData)
    } catch (error) {
        return thunkAPI.rejectWithValue(error)
    }
})

export const loginUser= createAsyncThunk("auth/login",async(userData,thunkAPI)=>{
    try {
        return await authService.login(userData)
    } catch (error) {
        return thunkAPI.rejectWithValue(error)
    }
})


export const getMyWishList= createAsyncThunk("user/wishlist",async(thunkAPI)=>{
    try {
        return await authService.getUserWishList();
    } catch (error) {
        return thunkAPI.rejectWithValue(error)
    }
})

export const addToWishList= createAsyncThunk("user/wishlist/add",async({id,image},thunkAPI)=>{
    try {
        return await authService.addToMyWishlist({id,image});
    } catch (error) {
        return thunkAPI.rejectWithValue(error)
    }
})

export const  deleteMyWishlist= createAsyncThunk("user/wishlist/delete",async(id,thunkAPI)=>{
    try {
        return await authService.deleteFromWishList(id);
    } catch (error) {
        return thunkAPI.rejectWithValue(error)
    }
})

export const addProdToCart= createAsyncThunk("user/cart/add",async(cartData,thunkAPI)=>{
    try {
        return await authService.addToCart(cartData);
    } catch (error) {
        return thunkAPI.rejectWithValue(error)
    }
})

export const deleteCartProduct= createAsyncThunk("user/cart/product/delete",async(cartItemId,thunkAPI)=>{
    try {
        return await authService.removeFromCart(cartItemId);
    } catch (error) {
        return thunkAPI.rejectWithValue(error)
    }
})

export const createAnOrder= createAsyncThunk("user/cart/create-order",async(orderDetails,thunkAPI)=>{
    try {
        return await authService.createOrder(orderDetails);
    } catch (error) {
        return thunkAPI.rejectWithValue(error)
    }
})

export const getUserCart= createAsyncThunk("user/cart/get",async(thunkAPI)=>{
    try {
        return await authService.getCart();
    } catch (error) {
        return thunkAPI.rejectWithValue(error)
    }
})

export const getMyOrder= createAsyncThunk("user/order/get",async(thunkAPI)=>{
    try {
        return await authService.getUserOrder();
    } catch (error) {
        return thunkAPI.rejectWithValue(error)
    }
})

const getCustomerFromLocalStorage = localStorage.getItem("customer")
? JSON.parse(localStorage.getItem("customer")) : null;

const initialState = {
    user :getCustomerFromLocalStorage,
    isError:false,
    isSuccess:false,
    isLoading:false,
    message : ""
}


export const authSlice = createSlice({
    name : "auth",
    initialState:initialState,
    reducers:{},
    extraReducers:(builder)=>{
        builder.addCase(registerUser.pending,(state)=>{
            state.isLoading=true
        }).addCase(registerUser.fulfilled,(state,action)=>{
            state.isLoading=false;
            state.isError=false;
            state.isSuccess=true
            state.user = action.payload
            if(state.isSuccess === true){
                localStorage.setItem("token",action.payload.token)
                toast.info("Account Created")
                
            }
        }).addCase(registerUser.rejected,(state,action)=>{
            state.isLoading = false;
            state.isError =true;
            state.isSuccess=false;
            state.message =action.error;
            if(state.isError === true){
                toast.error(action.error)
            }
        })
        .addCase(loginUser.pending,(state)=>{
            state.isLoading=true
        }).addCase(loginUser.fulfilled,(state,action)=>{
            state.isLoading=false;
            state.isError=false;
            state.isSuccess=true
            state.user = action.payload
            if(state.isSuccess === true){
                toast.info("Successfully logged In")
            }
        }).addCase(loginUser.rejected,(state,action)=>{
            state.isLoading = false;
            state.isError =true;
            state.isSuccess=false;
            state.message =action.error;
            if(state.isError === true){
                toast.error(action.error)
            }
        }).addCase(getMyWishList.pending,(state)=>{
            state.isLoading=true
        }).addCase(getMyWishList.fulfilled,(state,action)=>{
            state.isLoading=false;
            state.isError=false;
            state.isSuccess=true;
            state.wishlist = action.payload;
        }).addCase(getMyWishList.rejected,(state,action)=>{
            state.isLoading = false;
            state.isError =true;
            state.isSuccess=false;
            state.message =action.error;
            
        }).addCase(deleteMyWishlist.pending,(state)=>{
            state.isLoading=true
        }).addCase(deleteMyWishlist.fulfilled,(state,action)=>{
            state.isLoading=false;
            state.isError=false;
            state.isSuccess=true;
            state.removeWishlist = action.payload;
        }).addCase(deleteMyWishlist.rejected,(state,action)=>{
            state.isLoading = false;
            state.isError =true;
            state.isSuccess=false;
            state.message =action.error;
            
        }).addCase(addToWishList.pending,(state)=>{
            state.isLoading=true
        }).addCase(addToWishList.fulfilled,(state,action)=>{
            state.isLoading=false;
            state.isError=false;
            state.isSuccess=true;
            state.addWishlist = action.payload;
        }).addCase(addToWishList.rejected,(state,action)=>{
            state.isLoading = false;
            state.isError =true;
            state.isSuccess=false;
            state.message =action.error;
            
        })
        
        .addCase(addProdToCart.pending,(state)=>{
            state.isLoading=true
        }).addCase(addProdToCart.fulfilled,(state,action)=>{
            state.isLoading=false;
            state.isError=false;
            state.isSuccess=true;
            state.cartProduct = action.payload;
            if(state.isSuccess){
                toast.success("Product added to cart",{
                    hideProgressBar: true,
                })
            }
        }).addCase(addProdToCart.rejected,(state,action)=>{
            state.isLoading = false;
            state.isError =true;
            state.isSuccess=false;
            state.message =action.error;
            
        }).addCase(getUserCart.pending,(state)=>{
            state.isLoading=true
        }).addCase(getUserCart.fulfilled,(state,action)=>{
            state.isLoading=false;
            state.isError=false;
            state.isSuccess=true;
            state.userCart = action.payload;
            if(state.isSuccess){
                
            }
        }).addCase(getUserCart.rejected,(state,action)=>{
            state.isLoading = false;
            state.isError =true;
            state.isSuccess=false;
            state.message =action.error;
            
        })
        .addCase(deleteCartProduct.pending,(state)=>{
            state.isLoading=true
        }).addCase(deleteCartProduct.fulfilled,(state,action)=>{
            state.isLoading=false;
            state.isError=false;
            state.isSuccess=true;
            state.deleteCartProduct = action.payload;
            if(state.isSuccess){
                toast.success("Product removed from cart")
            }
        }).addCase(deleteCartProduct.rejected,(state,action)=>{
            state.isLoading = false;
            state.isError =true;
            state.isSuccess=false;
            state.message =action.error;
            
        }) .addCase(createAnOrder.pending,(state)=>{
            state.isLoading=true
        }).addCase(createAnOrder.fulfilled,(state,action)=>{
            state.isLoading=false;
            state.isError=false;
            state.isSuccess=true;
            state.orderedProduct = action.payload;
            if(state.isSuccess){
                toast.success("Ordered Successfully")
            }
        }).addCase(createAnOrder.rejected,(state,action)=>{
            state.isLoading = false;
            state.isError =true;
            state.isSuccess=false;
            state.message =action.error;
            
        })
        .addCase(getMyOrder.pending,(state)=>{
            state.isLoading=true
        }).addCase(getMyOrder.fulfilled,(state,action)=>{
            state.isLoading=false;
            state.isError=false;
            state.isSuccess=true;
            state.getOrders = action.payload;
             
        }).addCase(getMyOrder.rejected,(state,action)=>{
            state.isLoading = false;
            state.isError =true;
            state.isSuccess=false;
            state.message =action.error;
            
        })
    }
})

export default authSlice.reducer;
 