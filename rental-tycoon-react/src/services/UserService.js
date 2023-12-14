import axiosInstance from "./axiosInstance";
const hostname = 'http://localhost:8080';

const getUserById = async (id) => {
    const response= await axiosInstance.get(`${hostname}/customers/byId/${id}`)
    const { user } = response.data;
    if (user.profilePicture != null) {
      user.profilePicture = await fetchAndUpdateFiles(user.id, user.profilePicture)
    }
    return user;
  };

  export default {
    getUserById,
  };