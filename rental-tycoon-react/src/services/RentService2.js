import axios from 'axios';

const BASE_URL = 'http://localhost:8080/rent'; 

const rentService = {
  createRent: async (createRentRequest) => {
    try {
      const response = await axios.post(BASE_URL, createRentRequest);
      return response.data;
    } catch (error) {

      console.error('Error creating rent:', error);
      throw error;
    }
  },
};

const getRentHistory = async (userId) => {
  const response = await axiosInstance.get(`${BASE_URL}/rent/${userId}`);
  const rents = response.data
  console.log("rents: ", rents)
}

export default {
rentService,
getRentHistory};