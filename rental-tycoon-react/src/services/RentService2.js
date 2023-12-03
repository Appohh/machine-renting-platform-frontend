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

export default rentService;