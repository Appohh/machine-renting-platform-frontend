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
  addRentRow,
  getRentHistory
};