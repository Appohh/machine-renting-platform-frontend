import React, { useEffect, useState } from 'react';
import { decodeToken } from 'react-jwt';
import { useLocation } from 'react-router-dom';
import RentStep1 from '../components/RentSteps/RentStep1';
import RentStep2 from '../components/RentSteps/RentStep2';
import RentStep3 from '../components/RentSteps/RentStep3';
import RentService2 from '../services/RentService2';


const RentPage = () => {

    const location = useLocation();
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
    // const { cart } = location.state;
    const [cart, setCart] = useState([]);

    useEffect(() => {
        const products = location.state.products;
        setCart(products);
    
        // Retrieve token from localStorage
        const accessToken = localStorage.getItem('accessToken');
        setIsLoggedIn(accessToken !== null);
        

        if (accessToken) {
            const tokenData = decodeToken(accessToken); 
            if (tokenData && tokenData.userId) {
                setRentData({ ...rentData, customerId: tokenData.userId });
            }
        }
    }, []);

    function step1Next() {
        setRentData({ ...rentData, products: cart });
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
        const firstProduct = rentData.products.length > 0 ? rentData.products[0] : null;
        const updatedRentData = { ...rentData };
        delete updatedRentData.products;
        updatedRentData.productId = firstProduct;
        console.log("updatedRentData", updatedRentData);
        RentService2.createRent(updatedRentData).then((response) => {
            console.log(response);
            setRentStep(4);
        }).catch((error) => {
            console.error('Error creating rent:', error);
            setRentStep(5);
        });

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
                return <RentStep1 cart={cart} step1Next={step1Next} />;
            case 2:
                return <RentStep2 setData={step2SetData} step2Next={step2Next} />;
            case 3:
                console.log("rentdata3", rentData)
                return <RentStep3 cart={cart} step3Next={step3Next} />;
            case 4:
                return <div>Thank you for your rent!</div>;
            case 5:
                return <div>Something went wrong, please try again later.</div>;
            default:
                return null;
        }
    };

    return (
        <div>
            <h1>Rent Page</h1>
            {renderRentStep()}
        </div>
    );
};

export default RentPage;
