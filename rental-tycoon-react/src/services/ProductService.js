import axios from "axios";

const hostname = 'http://localhost:8080'

const instanceOf = 'Product'

function createMachineFormData(newMachineData) {
    const formData = new FormData();
  
    newMachineData.files.forEach((file) => {
      formData.append('files', file);
    });

    formData.append('name', newMachineData.name);
  
    formData.append('description', newMachineData.description);
  
    formData.append('price', newMachineData.price);

    formData.append('machineSpecificField', newMachineData.machineSpecificField)
  
    return formData;
  }

function CreateMachine(newMachineData) {
    const formData = createMachineFormData(newMachineData);
    return axios.post(`${hostname}/${instanceOf}/machine`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
        .then(response => response.data)
        .catch(error => {
          console.error('Error creating post:', error);
          throw error; 
        });
    }


    const getProducts = async (name) => {
      const response = await axios.get(`${hostname}/${instanceOf}/${name}`);
      const products = response.data;
    
      for (let product of products) {
        if (products.files && products.files.length > 0) {
          const updatedFiles = [];
          for (let product of products.files) {
            try {
              const fileResponse = await axios.get(`${hostname}/api/files/${product.id}/${files.url}`, { responseType: 'blob' });
    
              const blob = new Blob([fileResponse.data], { type: content.type });
              const objectURL = URL.createObjectURL(blob);
    
              const updatedContentItem = {
                url: objectURL,
                type: content.type,
              };
    
              updatedContent.push(updatedContentItem);
            } catch (error) {
              console.error(`Failed to retrieve file: ${content.url}`);
            }
          }
    
          product.files = updatedContent;
        }
      }
    
      return products;
    }

export default {
    CreateMachine,
    getProducts
}