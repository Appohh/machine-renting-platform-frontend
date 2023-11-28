import React, { useState, useEffect } from 'react';
import ProductService from './ProductService';
import RentService from './RentService';

const RentComponent = () => {
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [customerId, setCustomerId] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [rentConfirmed, setRentConfirmed] = useState(false);

  useEffect(() => {
    // Fetch the product details when the selectedProductId changes
    const fetchProductDetails = async () => {
      try {
        const product = await ProductService.getProductById(selectedProduct);
        setSelectedProduct(product);
      } catch (error) {
        console.error('Error fetching product details:', error);
      }
    };

    if (selectedProduct) {
      fetchProductDetails();
    }
  }, [selectedProduct]);

  const handleRent = async () => {
    if (!selectedProduct) {
      console.error('Please select a product before proceeding.');
      return;
    }

    // Set rentConfirmed to true to reveal the confirmation button
    setRentConfirmed(true);
  };

  const handleConfirmRent = async () => {
    // Check if credentials are filled in
    if (!customerId || !address || !city) {
      console.error('Please fill in all credentials before confirming.');
      return;
    }

    // Create newRentData object with user input
    const newRentData = {
      customerId,
      address,
      city,
      total: calculateTotal(selectedProduct.price),
      timestamp: getCurrentTimestamp(),
      discount: 0,
      paid: false,
      rows: [
        {
          productId: selectedProduct.id,
          quantity: 1,
          price: selectedProduct.price,
        },
      ],
    };

    try {
      // Create a rent record
      const rentResult = await RentService.createRent(newRentData);
      console.log('Rent successful:', rentResult);

      // You may want to update the product's availability or other details after a successful rent
      // For example: ProductService.updateProductAvailability(selectedProduct.id, false);
    } catch (error) {
      console.error('Failed to rent product:', error);
    }
  };

  return (
    <div>
    {selectedProduct && (
      <div>
        <h2>{selectedProduct.name}</h2>
        {selectedProduct.description}
        {selectedProduct.files && selectedProduct.files.length > 0 && (
          <div className="current-file-container">
            {selectedProduct.files[0].type.startsWith('image/') ? (
              <img src={URL.createObjectURL(selectedProduct.files[0])} alt="Selected File" className="image" />
            ) : (
              <video controls src={URL.createObjectURL(selectedProduct.files[0])} />
            )}
          </div>
        )}
      </div>
    )}
      <label>
        Customer ID:
        <input type="text" value={customerId} onChange={(e) => setCustomerId(e.target.value)} /> {/* HERE HAS TO BE THE USER LOGIN*/}
      </label>
      <label>
        Address:
        <input type="text" value={address} onChange={(e) => setAddress(e.target.value)} />
      </label>
      <label>
        City:
        <input type="text" value={city} onChange={(e) => setCity(e.target.value)} />
      </label>
      <button onClick={handleRent}>Rent</button>
      {rentConfirmed && (
        <button onClick={handleConfirmRent}>Confirm Rent</button>
      )}
    </div>
  );
};

export default RentComponent;