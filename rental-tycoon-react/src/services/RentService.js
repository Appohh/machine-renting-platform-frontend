import axiosInstance from "./axiosInstance";
import ProductService from "./ProductService"

const hostname = 'http://localhost:8080';

async function createRent(rentData) {
  const requestBody = {
    customerId: rentData.customerId,
    address: rentData.address,
    city: rentData.city,
    total: rentData.total,
    discount: rentData.discount
  }
  return axiosInstance.post(`${hostname}/rent`, requestBody)
    .then(response => response.data)
    .catch(error => {
      console.error('Error creating rent:', error);
      throw error;
    });
}

async function addRentRow(rentRowData) {
  const requestBody = {
    productId: rentRowData.productId,
    startDate: rentRowData.startDate,
    endDate: rentRowData.endDate,
    rentId: rentRowData.rentId,
  }
  try {
    const response = await axiosInstance.post(`${hostname}/rent/addRentRow`, requestBody);
    return response.data;
  } catch (error) {
    console.error('Error creating rent:', error);
    throw error;
  }
}

const getRentHistory = async () => {
  try {
    const response = await axiosInstance.get(`${hostname}/rent`);
    const rents = response.data;
    return rents;
  }catch(error){
    console.error('Error fetching rents', error);
    throw error;
  }
}

const getRentRowsHistory = async (rentId) => {
  const response = await axiosInstance.get(`${hostname}/rent/getRentRow/${rentId}`);
  const rentProductList = response.data.rentWrapper;
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

const getDiscountAmount = async(total, code) => {
  const requestBody = {
    total: total,
    code: code,
  }
  const response = await axiosInstance.post(`${hostname}/discount`, requestBody)
  return response.data;
}

export default {
  createRent,
  addRentRow,
  getRentHistory,
  getRentRowsHistory,
  getDiscountAmount
};