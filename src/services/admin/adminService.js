import axios from "axios";
import { adminConfig, api } from "../../api/api";

const adminRegister = async (adminData) => {
  const response = await axios.post(`${api}/admin/createAdmin`, adminData);
  if (response.data) {
    return response.data;
  }
};

const adminLogin = async (adminData) => {
  const response = await axios.post(`${api}/admin/adminlogin`, adminData);
  if (response.data) {
    return response.data;
  }
};

// Expense
const getExpenses = async ({itemsPerPage, currentPage, search}) => {
  try {
    const response = await axios.get(`${api}/expense/getAllExpenses?page=${currentPage}&limit=${itemsPerPage}&search=${search}`,adminConfig);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// orders
const getAllOrders = async()=>{
  try {
    const response = await axios.get(`${api}/order/get-allorders`,adminConfig);
    if(response.data){
      return response.data;
    }
  } catch (error) {
    throw error;
  }
}

// change status to dispatch

const  changeOrderStatus = async({id,status})=>{
  try {
    const response = await axios.put(`${api}/order/dispatch/${id}/${status}`,adminConfig);
    if(response.data){
      return response.data;
    }
  } catch (error) {
    throw error;
  }
}

// get All dispatched products

const getAllDispatched = async()=>{
  try {
    const response = await axios.get(`${api}/order/dispatched-orders`,adminConfig);
    if(response.data){
      return response.data;
    }
  } catch (error) {
    throw error;
  }
}


export const adminService = {
  adminLogin,
  getExpenses,
  getAllOrders,
  changeOrderStatus,
  getAllDispatched
};
