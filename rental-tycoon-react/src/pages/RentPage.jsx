import React, { useEffect, useState } from 'react';
import { decodeToken } from 'react-jwt';
import RentStep1 from '../components/RentSteps/RentStep1';
import RentStep2 from '../components/RentSteps/RentStep2';
import RentStep3 from '../components/RentSteps/RentStep3';
import '../rentPage.css';


const RentPage = () => {
    const [rentStep, setRentStep] = useState(1);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [rentData, setRentData] = useState({
        startDate: '',
        endDate: '',
        address: '',
        city: '',
        customerId: null,
        products: [],
    });
    const [products, setProducts] = useState([]);

    useEffect(() => {    
        //retrieve token from localStorage
        const accessToken = localStorage.getItem('accessToken');
        setIsLoggedIn(accessToken !== null);
        
        if (accessToken) {
            const tokenData = decodeToken(accessToken); 
            if (tokenData && tokenData.userId) {
                setRentData({ ...rentData, customerId: tokenData.userId });
            } else {
                console.log("tokenData.userId not found");
                setIsLoggedIn(false);
            }
        }
    }, []);

    function step1Next(cartItems) {
        setRentData({ ...rentData, products: cartItems });
        setRentStep(2);
    }

    function step2Next() {
        setRentStep(3);
    }

    function step2SetData(data) {
        setRentData({ ...rentData, ...data });
        console.log("rentdata", rentData);
    }

    function step3Next() {

    }

    useEffect(() => {
        console.log("RentData updated:", rentData);
    }, [rentData]);

    const renderRentStep = () => {
        if (!isLoggedIn) {
            return <div>You need to be logged in to rent. Please log in first.</div>;
        }
        switch (rentStep) {
            case 0:
                return <div>You have no items selected</div>;
            case 1:
                return <div className='rent-container1'><RentStep1 step1Next={step1Next} /></div>;
            case 2:
                return <div className='rent-container1'><RentStep2 setData={step2SetData} step2Next={step2Next} /></div>;
            case 3:
                console.log("rentdata3", rentData)
                return <RentStep3 cart={cart} step3Next={step3Next} />;
            case 4:
                return <div className='rent-container1'><div>Thank you for your rent!</div></div>;
            case 5:
                return <div className='rent-container1'><div>Something went wrong, please try again later.</div></div>;
            default:
                return null;
        }
    };

    return (
        <div>
                <h1 style={{ marginLeft: '8%', width: '500px' }}>Rent Page</h1>
                {renderRentStep()}
        </div>
    );
};

export default RentPage;
