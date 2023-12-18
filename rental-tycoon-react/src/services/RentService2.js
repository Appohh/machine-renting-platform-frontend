import axios from 'axios';
import axiosInstance from './axiosInstance';
import ProductService from './ProductService'

const BASE_URL = 'http://localhost:8080/rent'; 

function createRent(createRentRequest){
  const response = axiosInstance.post(BASE_URL, createRentRequest);
  return response.data;
}
    

const getRentHistory = async (userId) => {
  const response = await axiosInstance.get(`${BASE_URL}/${userId}`);
  const rentProductList = response.data.rentProductList;
  console.log("Response rentProductList: ", rentProductList);

  const updatedRentProductList = await Promise.all(rentProductList.map(async (item) => {
    const product = item.product;
    console.log("Product: ", product);

    if (product.files && product.files.length > 0) {
      product.files = await ProductService.fetchAndUpdateFiles(product.id, product.files);
    }
    return item; 
  }));

  return updatedRentProductList;
}

export default {
createRent,
getRentHistory};