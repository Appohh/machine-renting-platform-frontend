import axiosInstance from "./axiosInstance";
const hostname = 'http://localhost:8080';

const getUserById = async (id) => {
  const response = await axiosInstance.get(`${hostname}/customers/byId/${id}`);
  const { user } = response.data;
  if (user.profilePicture != null) {
    user.profilePicture = await fetchAndUpdateFiles(user.id, user.profilePicture);
  }
  return user;
};

const updateUserDetails = async (id, firstName, lastName, address, city, email, phone) => {
  try {
    const response = await axiosInstance.post(`${hostname}/customers/updateCustomer`, {
      id,
      firstName,
      lastName,
      address,
      city,
      email,
      phone,
    });

    const { user } = response.data;

    return user;
  } catch (error) {
    console.error("Error updating user details:", error);
    throw error;
  }
};

export default {
  getUserById,
  updateUserDetails,
};
