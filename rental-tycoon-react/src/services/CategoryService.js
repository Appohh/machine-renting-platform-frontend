import axios from "axios";

const hostname = 'http://localhost:8080'

function getCategories() {
return axios.get(`${hostname}/machine/categories`)
        .then(response => response.data)
        .catch(error => {
          console.error('Error creating post:', error);
          throw error; 
        });
}

export default {
    getCategories
};