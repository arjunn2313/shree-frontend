import persistReducer from "redux-persist/es/persistReducer";
import storage from "redux-persist/lib/storage";
import userReducer from './reducer'
import { applyMiddleware, configureStore} from "@reduxjs/toolkit";
import persistStore from "redux-persist/es/persistStore";
import cartReducer from './cartReducer'
import productReducer from '../services/product/productSlice'
import authReducer from '../services/user/userSlice'
import adminReducer from '../services/admin/adminSlice'

const persistConfig = {
    key : 'root',
    storage
}

const persistedReducer = persistReducer(persistConfig,userReducer)
 



export const store = configureStore({
    reducer:{
        auth :authReducer,
        product:productReducer,
        user : persistedReducer,
        cart : cartReducer,
        admin : adminReducer
    }
})


export let persistor = persistStore(store)



 