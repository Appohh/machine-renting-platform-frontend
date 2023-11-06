import { useState } from 'react'
import RentService from '../services/RentService';


function AddRent() {

    const createRent = () => {
        RentService.createRent(formData).then(data => console.log(data)).catch(data => console.log("fail"))
    }

    const [formData, setFormData] = useState({
        productId: '',
        customerId: 1,
        start: '',
        end: '',
        address: '',
        city: '',
        total: 1,
        discount: 1,
        paid: 1,
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Form data submitted:', formData);
        createRent();
    };

    return (
        <>
            <h1>Add rent</h1>
            <form className='form' onSubmit={handleSubmit}>
                <select name="productId" value={formData.productId} onChange={handleChange}>
                    <option value="" disabled selected>Select a building machine</option>
                    <option value="1">Type 1 Building Machine</option>
                    <option value="2">Type 2 Building Machine</option>
                    <option value="3">Type 3 Building Machine</option>
                </select>
                <input placeholder='From' type="date" name="start" value={formData.start} onChange={handleChange} />
                <input placeholder='Until' type="date" name="end" value={formData.end} onChange={handleChange} />
                <input placeholder='Address' type="text" name="address" value={formData.address} onChange={handleChange} />
                <input placeholder='City' type="text" name="city" value={formData.city} onChange={handleChange} />
                <button type="submit">Submit</button>
            </form>
        </>
    )
}

export default AddRent
