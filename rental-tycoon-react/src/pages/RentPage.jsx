import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import RentStep1 from '../components/RentSteps/RentStep1';
import RentStep2 from '../components/RentSteps/RentStep2';
import RentStep3 from '../components/RentSteps/RentStep3';

const RentPage = () => {

    const location = useLocation();

    const [rentStep, setRentStep] = useState(1);
    const [rentData, setRentData] = useState({
        startDate: '',
        endDate: '',
        address: '',
        city: '',
        customerId: 1,
        products: [],
    });
    // const { cart } = location.state;
    const [cart, setCart] = useState([]);

    useEffect(() => {
        setCart([1, 2, 3])
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
        console.log("rentdata",rentData);
    }

    useEffect(() => {
        console.log("RentData updated:", rentData);
      }, [rentData]);

    const renderRentStep = () => {
        switch (rentStep) {
            case 0:
                return <div>You have no items selected</div>;
            case 1:
                return <RentStep1 cart={cart} step1Next={step1Next} />;
            case 2:
                return <RentStep2 setData={step2SetData} step2Next={step2Next} />;
            case 3:
                console.log("rentdata3",rentData)
                return <RentStep3 cart={cart} />;
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
