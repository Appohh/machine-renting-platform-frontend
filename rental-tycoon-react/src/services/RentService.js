import axios from "axios";

const hostname = 'http://localhost:8080'

function createRentFormData(newRentData) {
    const formData = new FormData();
  
    formData.append('customerId', newRentData.customerId);
  
    formData.append('address', newRentData.address);
  
    formData.append('city', newRentData.city); 
    
    formData.append('total', newRentData.total);

    formData.append('timestamp', newRentData.timestamp);

    formData.append('discount', newRentData.discount);

    formData.append('paid', newRentData.paid)
  
    return formData;
  }

  function createRent(newRentData) {
    const formData = createRentFormData(newRentData);
    return axios.post(`${hostname}/rent`, formData)
      .then(response => response.data)
      .catch(error => {
        console.error('Error creating post:', error);
        throw error; 
      });
  }



export default {
    createRent
}