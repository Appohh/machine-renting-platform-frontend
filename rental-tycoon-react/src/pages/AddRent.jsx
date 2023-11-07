import { useState } from 'react'
import RentService from '../services/RentService';


function CreateRent() {
    // State to hold the form data
    const [newRentData, setNewRentData] = useState({
      customerId: '',
      address: '',
      city: '',
      total: '',
      timestamp: '',
      discount: '',
      paid: '',
    });
  
    // Function to handle form input changes
    const handleInputChange = (e) => {
      const { name, value } = e.target;
      setNewRentData({ ...newRentData, [name]: value });
    };
  
    // Function to handle form submission
    const handleFormSubmit = async (e) => {
      e.preventDefault();
  
      try {
        // Call the createRent service
        const createdRent = await RentService.createRent(newRentData);
  
        console.log('Rent created successfully:', createdRent);
  
        //reset the form data after successful submission
        setNewRentData({
          customerId: '',
          address: '',
          city: '',
          total: '',
          timestamp: '',
          discount: '',
          paid: '',
        });
      } catch (error) {
        // Handle errors (e.g., show an error message)
        console.error('Error creating rent:', error);
      }
    };
  
    return (
      <div>
        <h1>Create Rent</h1>
        <form onSubmit={handleFormSubmit}>
            <label>Customer ID:</label>
            <input
            type="text"
            name="customerId"
            value={newRentData.customerId}
            onChange={handleInputChange}
            />

            <label>Address:</label>
            <input
                type="text"
                name="address"
                value={newRentData.address}
                onChange={handleInputChange}
            />

            <label>City:</label>
            <input
                type="text"
                name="city"
                value={newRentData.city}
                onChange={handleInputChange}
            />

            <label>Total:</label>
            <input
                type="text"
                name="total"
                value={newRentData.total}
                onChange={handleInputChange}
            />
          <button type="submit">Create Rent</button>
        </form>
      </div>
    );
  }
  
  export default CreateRent;
