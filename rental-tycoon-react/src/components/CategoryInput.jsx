import React, { useState } from 'react';
import Select from 'react-select';

function CategoryInput({ name, value, handleInputChange }) {
  const allCategories = [
    { value: 1, label: 'Earth moving'},
    { value: 2, label: 'Lifting'},
    { value: 3, label: 'Road machine'},
    { value: 4, label: 'Argricultural vehicles'},
    { value: 5, label: 'Trucks'},
    { value: 6, label: 'Crushing'},
    { value: 7, label: 'Platforms'},
    { value: 8, label: 'Cranes'},
    { value: 9, label: 'Compressors'},
    { value: 10, label: 'Trailers'},
    { value: 11, label: 'Various'},
    { value: 12, label: 'Lawn Mowers'}
  ];

  const [selectedCategories, setSelectedCategories] = useState([]);

  const handleChange = (selectedOptions) => {
    setSelectedCategories(selectedOptions);

    const selectedValues = selectedOptions.map((category) => category.value);
    handleInputChange(name, selectedValues);
  };

  return (
    <div>
      <label htmlFor="categoryIds">Categories:</label>
      <Select
        id="categoryIds"
        name="categoryIds"
        value={selectedCategories}
        onChange={handleChange}
        options={allCategories}
        isMulti
      />
    </div>
  );
}

export default CategoryInput;