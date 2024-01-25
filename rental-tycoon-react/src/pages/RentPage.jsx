import React, { useEffect, useState } from 'react';
import { decodeToken } from 'react-jwt';
import RentService from '../services/RentService'
import RentStep1 from '../components/RentSteps/RentStep1';
import RentStep2 from '../components/RentSteps/RentStep2';
import RentStep3 from '../components/RentSteps/RentStep3';
import '../rentPage.css';
import { useCart } from '../components/Cart/CartContext';
import UserService from '../services/UserService.js'


const RentPage = () => {
    const [rentStep, setRentStep] = useState(1);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [rentData, setRentData] = useState({
        address: '',
        city: '',
        customerId: null,
        products: [],
    });
    const [cartShadow, setCartShadow] = useState([]);
    const [userIdCurrent, setUserIdCurrent] = useState(null);
    const { cart } = useCart();
    const [rentId, setRentId] = useState();
    const [user, setUser] = useState(null);


    useEffect(() => {
        //retrieve token from localStorage
        const accessToken = localStorage.getItem('accessToken');
        setIsLoggedIn(accessToken !== null);


        if (accessToken) {
            const tokenData = decodeToken(accessToken);
            if (tokenData && tokenData.userId) {
                setRentData({ ...rentData, customerId: tokenData.userId });
                console.log("tokenData.userId", tokenData);
                setUserIdCurrent(tokenData.userId);

                UserService.getUserById(tokenData.userId).then((data) => {
                    setUser(data);
                    console.log("user", data);
                });

            } else {
                console.log("tokenData.userId not found");
                setIsLoggedIn(false);
            }
        }
    }, []);

    function step1Next(cartItems) {
        setRentData({ ...rentData, products: cartItems });
        setCartShadow(cart);
        console.log("setCartShadow", cartShadow);
        console.log("cart10", cart);
    }

    useEffect(() => {
        if (cartShadow.length > 0) {
            setRentStep(2);
        }
    }, [cartShadow]);

    function step2Next() {
        setRentStep(3);
    }

    function step2SetData(data) {
        setRentData({ ...rentData, ...data });
    }

    useEffect(() => {
        console.log("rentData122", rentData);
    }, [rentData]);

    function step3Next(total, discount) {
        rentData.total = total;
        rentData.discount = discount;
        rentData.customerId = userIdCurrent;
        delete rentData.products;

        RentService.createRent(rentData)
            .then((response) => {
                cartShadow.map((product) => {
                    const rentRowData = {
                        productId: product.product.id,
                        startDate: product.startDate,
                        endDate: product.endDate,
                        rentId: response.rentId
                    };

                    RentService.addRentRow(rentRowData)
                        .then(() => {
                            handleSendEmail();
                            window.location.href = '/success';
                        });
                });
            });
    }

    const handleSendEmail = () => {
        const emailData = {
            SecureToken: 'dc6affc8-f817-484b-baf3-381febbf12e0',
            To: user.email,
            From: 'machine.rental.services@gmail.com',
            Subject: 'Order Confirmation',
            Body: `Dear ${user.firstName},<br><br>
        Thank you for your order! We are pleased to confirm your rental.<br><br>
        If you have any questions or need further assistance, please feel free to contact us.<br><br>
        Best regards,<br>
        Machine Rental Services`,
        };

        Email.send(emailData).then(
            message => console.log(`Email sent successfully: ${message}`),
            error => console.log(`Error sending email: ${error}`)
        );
    };

    useEffect(() => {
        console.log("Cart shadowwww: ", cartShadow)
    })


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
                return <div className='rent-container1' style={{ gridTemplateColumns: '1fr' }}><RentStep1 step1Next={step1Next} /></div>;
            case 2:
                return <div className='rent-container1'><RentStep2 setData={step2SetData} step2Next={step2Next} productList={rentData.products} userId={userIdCurrent} /></div>;
            case 3:
                console.log("rentdata3", rentData)
                return <div className='rent-container1' style={{ gridTemplateColumns: '1fr 1fr 1fr' }}><RentStep3 productList={rentData.products} userId={userIdCurrent} step3Next={step3Next} cart={cartShadow} rentInfo={rentData} /></div>;
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
            <style>{`
                .cart-container {
                    display: none !important;
                }
            `}</style>
            <h1 style={{ marginLeft: '8%', width: '500px' }}>Rent Page</h1>
            {renderRentStep()}
        </div>
    );
};

export default RentPage;
