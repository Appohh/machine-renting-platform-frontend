import axios from 'axios';

const hostname = 'http://localhost:8080/customers';

function registerUser(userDetails) {
  return axios.post(hostname, userDetails)
    .then(response => response.data);
}

export default {
  registerUser
};
