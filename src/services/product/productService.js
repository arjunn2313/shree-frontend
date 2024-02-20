import axios from "axios";
import { api, config } from "../../api/api";


const getProducts = async (categories) => {
    console.log(categories)
    try {
        const response = categories
            ? await axios.get(`${api}/product/filter?categories=${categories}`)
            : await axios.get(`${api}/product`);

        return response.data;
    } catch (error) {
         
        console.error("Error fetching products:", error);
        throw error; 
    }
};

const getSingleProduct = async(id) => {
    try {
        const response = await axios.get(`${api}/product/${id}`)
        return response.data;
    } catch (error) {
         
        console.error("Error fetching products:", error);
        throw error; 
    }
};
 

export const productService ={
     getProducts,
     getSingleProduct
}