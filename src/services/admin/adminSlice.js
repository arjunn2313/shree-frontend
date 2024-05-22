import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { thunk } from "redux-thunk";
import { adminService } from "./adminService";
import { toast } from "react-toastify";
import { redirect } from "react-router-dom";
 

export const loginAdmin = createAsyncThunk(
  "admin/login",
  async (adminData, thunkAPI) => {
    try {
      return await adminService.adminLogin(adminData);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const getAllExpenses = createAsyncThunk("admin/get/expense",async(params,thunkAPI)=>{
  try {
    return await adminService.getExpenses(params)
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
})

export const getAllCusOrders = createAsyncThunk("admin/get/orders",async(thunkAPI)=>{
  try {
    return await adminService.getAllOrders()
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
})

export const changeStatus = createAsyncThunk("admin/post/status",async(status,thunkAPI)=>{
  try {
    return await adminService.changeOrderStatus(status)
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
})

export const getDispatched = createAsyncThunk("admin/get/dispatche-orders",async(thunkAPI)=>{
  try {
    return await adminService.getAllDispatched()
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
})

export const getStocks = createAsyncThunk("admin/get/totalstock",async(params,thunkAPI)=>{
  try {
    return await adminService.getTotalStock(params)
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
})


const initialState = {
  admin: "",
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

export const adminSlice = createSlice({
  name: "admin",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loginAdmin.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(loginAdmin.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.admin = action.payload;
        if (state.isSuccess === true) {
          localStorage.setItem("admin",action.payload.token);
          toast.success("Successfully Logged In",{
            hideProgressBar: true,
          });
           redirect('/admin')
        }
      })
      .addCase(loginAdmin.rejected, (state,action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
        if (state.isError === true) {
          toast.error(action.error);
        }
      }) .addCase(getAllExpenses.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllExpenses.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.expense = action.payload;
      })
      .addCase(getAllExpenses.rejected, (state,action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
        if (state.isError === true) {
          toast.error(action.error);
        }
      }).addCase(getAllCusOrders.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllCusOrders.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.orders = action.payload;
      })
      .addCase(getAllCusOrders.rejected, (state,action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
        if (state.isError === true) {
          toast.error(action.error);
        }
      }).addCase(changeStatus.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(changeStatus.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.orderStatus = action.payload;
      })
      .addCase(changeStatus.rejected, (state,action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
        if (state.isError === true) {
          toast.error(action.error);
        }
      }).addCase(getDispatched.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getDispatched.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.dispatched = action.payload;
      })
      .addCase(getDispatched.rejected, (state,action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
        if (state.isError === true) {
          toast.error(action.error);
        }
      }).addCase(getStocks.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getStocks.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.totalstock = action.payload;
      })
      .addCase(getStocks.rejected, (state,action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
  },
});

export default adminSlice.reducer;
