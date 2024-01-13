import axiosInstance from "./axiosInstance";

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
    quantity: rentRowData.quantity
  }
  try {
    const response = await axiosInstance.post(`${hostname}/rent/addRentRow`, requestBody);
    return response.data;
  } catch (error) {
    console.error('Error creating rent:', error);
    throw error;
  }
}

export default {
  createRent,
  addRentRow
};