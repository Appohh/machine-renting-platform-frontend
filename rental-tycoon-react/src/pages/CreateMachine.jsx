import React, { useState } from 'react';
import productService from "../services/ProductService";
import ContentInput from '../components/ContentInput';
import CategoryInput from '../components/CategoryInput';
import './CreateMachine.css'


function CreateMachine() {
  const [newMachine, setNewMachine] = useState({
    name: '',
    description: '',
    price: '',
    files:[],
    machineSpecificField:'',
    categoryIds: [],
  });

  const handleSubmit = (e) => {
    e.preventDefault();
     
    const newMachineData = {
        name: newMachine.name,
        description: newMachine.description,
        price: newMachine.price,
        files: newMachine.files,
        machineSpecificField: newMachine.machineSpecificField,
        categoryIds: newMachine.categoryIds
      };
  
    productService
      .CreateMachine(newMachineData)
      .then((response) => {
        console.log('Machine created successfully:', response);
      })
      .catch((error) => {
        console.error('Error creating machine:', error);
      });
  };

  const handleInputChange = (name, value) => {
    setNewMachine((prevMachine) => ({
      ...prevMachine,
      [name]: value
    }))
  };

  return (
    <div className="form">
      <h2>Create a New Machine</h2>
      <form onSubmit={handleSubmit}>
        <ContentInput
          addItem={handleInputChange} 
          name="files"
          value={newMachine.files}
        />
        <input
            placeholder="name"
            type="text"
            name="name"
            value={newMachine.name}
            onChange={(e) => handleInputChange("name", e.target.value)}
        />
        <input
            placeholder="description"
            type="text"
            name="description"
            value={newMachine.description}
            onChange={(e) => handleInputChange("description", e.target.value)}
        />
        <input
            placeholder="price"
            type="text"
            name="price"
            value={newMachine.price}
            onChange={(e) => handleInputChange("price", e.target.value)}
        />
        <input
            placeholder="machineSpecificField"
            type="text"
            name="machineSpecificField"
            value={newMachine.machineSpecificField}
            onChange={(e) => handleInputChange("machineSpecificField", e.target.value)}
        />
         <CategoryInput
                name="categoryIds"
                value={newMachine.categoryIds}
                handleInputChange={handleInputChange}
            />

        <div>
              <button type="submit">Create Machine</button>
        </div>
      </form>
    </div>
  );
}

export default CreateMachine;
