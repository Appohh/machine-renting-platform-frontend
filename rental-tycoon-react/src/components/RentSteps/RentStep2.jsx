import React from 'react';
import { useState, useEffect } from 'react';

const RentStep2 = ({ setData, step2Next }) => {
    const [formData, setFormData] = useState({
        startDate: '',
        endDate: '',
        address: '',
        city: '',
    });

    const confirmData = () => {
        console.log("step2Data", formData);
        setData(formData);
        step2Next();
    }

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

    };

    useEffect(() => {
    }, []);

    return (
        <div>
            <h2>When and where:</h2>

            <form onSubmit={handleSubmit}>
                <label htmlFor="startDate">Start Date:</label>
                <input
                    type="date"
                    name="startDate"
                    value={formData.startDate}
                    onChange={handleChange}
                />

                <label htmlFor="endDate">End Date:</label>
                <input
                    type="date"
                    name="endDate"
                    value={formData.endDate}
                    onChange={handleChange}
                />

                <label htmlFor="address">Address:</label>
                <input
                    type="text"
                    name="address"
                    value={formData.date}
                    onChange={handleChange}
                />

                <label htmlFor="city">City:</label>
                <input
                    type="text"
                    name="city"
                    value={formData.location}
                    onChange={handleChange}
                />

                <button onClick={confirmData}>Next</button>
            </form>

        </div>
    );
};

export default RentStep2;
