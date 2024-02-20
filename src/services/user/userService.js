import axios from "axios";
import { api,config } from "../../api/api";
 
const register = async(userData)=>{
    const response = await axios.post(`${api}/user/verify`,userData);
    if(response.data){
        if(response.data){
            localStorage.setItem("customer",JSON.stringify(response.data))
        }
        return response.data
    }
}

const login = async(userData)=>{

    const response = await axios.post(`${api}/user/login`,userData);
    if(response.data){
        return response.data
    }
}

const getUserWishList = async () => {
    try {   
    const response = await axios.get(`${api}/wishlist`,config)
    if(response.data){
        return response.data;
    }
} catch (error) {
      console.log(error);  
}
}
 
const addToMyWishlist = async ({id,image}) => {
    try {   
        const response = await axios.post(`${api}/wishlist/add/${id}`,{image},config)
        if(response.data){
            return response.data;
        }
    } catch (error) {
          console.log(error);
    }
}

const  deleteFromWishList = async (id) => {
    try {   
        const response = await axios.delete(`${api}/wishlist/delete/${id}`,config)
        if(response.data){
            return response.data;
        }
    } catch (error) {
          console.log(error);
    }
}

const addToCart =async(cartData) => {
    try {   
    const response = await axios.post(`${api}/cart/add`,cartData,config)
    if(response.data){
        console.log(cartData);
        return response.data;
    }
} catch (error) {
      console.log(error);  
}
}

const  getCart =async() => {
    try {   
    const response = await axios.get(`${api}/cart/get`,config)
    if(response.data){
        return response.data;
    }
} catch (error) {
      console.log(error);  
}
}
 
const removeFromCart = async (cartItemId) => {
try {
    const response = await axios.delete(`${api}/cart/delete/${cartItemId}`,config);
    if(response.data){
        return response.data;
    }
} catch (error) {
    console.log(error);
}
}

const createOrder=async(orderDEtails)=>{
    try {
        const response = await axios.post(`${api}/order/create-order`,orderDEtails,config);
        if(response.data){
            return response.data;
        }
    } catch (error) {
        console.log(error);
    }
}

const getUserOrder = async()=>{
    try {
        const response = await axios.get(`${api}/order/get-myorder`,config);
        if(response.data){
            return response.data;
        }
    } catch (error) {
        console.log(error);
    }
}

export const authService ={
    register,
    getUserWishList,
    addToCart,
    getCart,
    removeFromCart,
    createOrder,
    getUserOrder,
    addToMyWishlist,
    deleteFromWishList
}