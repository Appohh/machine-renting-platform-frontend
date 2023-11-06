import axios from "axios";

const hostname = 'http://localhost:8080'


function createRent(createRentInput) {
    return axios.post(`${hostname}/rent`, createRentInput)
        .then(response => response.data)
}

export default {
    createRent
}