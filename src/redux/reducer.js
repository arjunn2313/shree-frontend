import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
    name : 'user',
    initialState:{
        token : ''
    },
    reducers : {
        logIn : (state,action) =>{
            state.token = action.payload;
        },
        logOut : (state,action) =>{
            state.token = "";
        }
    }
})

export const {logIn,logOut} = userSlice.actions;
export default userSlice.reducer;