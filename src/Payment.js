import React, { useEffect, useState } from 'react';
import "./Payment.css";
import { useStateValue } from './StateProvider';
import CheckoutProduct from './CheckoutProduct';
import { Link, useHistory } from 'react-router-dom';
import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import CurrencyFormat from 'react-currency-format';
import { getBasketTotal } from './Reducer';
import axios from './axios';
import { Card } from '@mui/material';
import { db } from './firebase';

// using stripes for card payment functions our express for this build

function Payment() {

    //variable for history basket and the rest
    const history = useHistory();
    const [{basket, user}, dispatch] = useStateValue();

    const stripe = useStripe();
    const elements = useElements();

    //states for card element
    const [error, setError] = useState(null);
    const [disable, setDisabled] = useState(true);
    //states for card element button processes
    const [succeeded, setSucceeded] =useState(false);
    const [processing, setProcessing] = useState("");
    // clientSecret part create variable then useEffect function
    const [clientSecret, setClientSecret] = useState(true);

    useEffect(() => {
        // generate the special stripe secret which allows us to charge a customer
        const getClientSecret = async () => {
            const response = await axios({
                method: "post",
                // Stripes expects the total in a currencies submits (meaning: 1$ = 100 cents)
                url: `/payments/create?total=${ getBasketTotal(basket) *100 }`
            });
            setClientSecret(response.data.clientSecret)
        }

        // Get for async functions
        getClientSecret();
        //condition everytime basket change
    },[basket])

    console.log("Secret>>> ", clientSecret);

    const handleSubmit = async (event) => {
        // Pulling from Stripe Part
        event.preventDefault();
        //setProcessing to block the user from clicking button while entering card number and allow to click once if succeeded
        setProcessing(true);

        // Step 1 Get client secret from secret
        const payload = await stripe.confirmCardPayment(clientSecret, {
            payment_method: {
                card: elements.getElement(CardElement)
            }
        }).then(({paymentIntent}) => {       //response from stripe

            // Push into database(firestore)
            db
                .collection("users")
                    .doc(user?.uid)
                        .collection("orders")
                            .doc(paymentIntent.id)
                                .set({
                                    basket: basket,
                                    amount: paymentIntent.amount,
                                    created: paymentIntent.created
                                });

            // paymentIntent = payment confirmation
            setSucceeded(true);
            setError(null);
            setProcessing(false);

            //Empty Basket before redirect

            dispatch({
                type: "EMPTY_BASKET"
            })

            // After payment confirmed we want to take them to orders page
            // However we are using history.replace instead of push because we don't want customers to be able to comeback to the payment page once it succeeded
            history.replace("./orders");
        })

    }

    const handleChange = event => {
        // Change on Card Element

        // Listen to changes in CardElement...
        //  and display any errors as the customer types their card details    
        setDisabled(event.empty);
        setError(event.error ? event.error.massage : "");
    }

  return (
    <div className='payment'>
        {/* Payment sections */}
        <div className='payment__container'>

            <h1>
                Checkout (<Link to="/checkout">{basket?.length} items</Link>)
            </h1>

            {/* 1 Delivery address */}
            <div className='payment__section'>
                <div className='payment__title'>
                    <h3>The Delivery Address</h3>
                </div>

                <div className='payment__address'>
                    <p>{user?.email}</p>
                    <form>
                        <h5>
                            Country
                        </h5>
                        <input type="search" />

                        <h5>
                           City
                        </h5>
                        <input type="search"  />

                        <h5>
                           Address
                        </h5>
                        <input type="text"  />

                        <button className='payment__addressButton' type='submit'>
                            Submit
                        </button>

                    </form>
                </div>
            </div>

            {/* 2 Review items */}
            <div className='payment__section'>
                <div className='payment__title'>
                    <h3>Review items and delivery</h3>
                </div>

                <div className='payment__items'>
                    {/* products */}
                    {basket.map(item => (
                        <CheckoutProduct
                            id={item.id}
                            title={item.title}
                            image={item.image}
                            rating={item.rating}
                            price={item.price}
                        />
                    ))}
                </div>
            </div>

            {/* 3 Payment method */}
            <div className='payment__section'>
                <div className='payment__title'>
                    <h3>Payment Method</h3>
                </div>

                <div className='payment__details'>

                    {/* Stripe payment method here */}
                    <form onSubmit={handleSubmit}>
                        <CardElement onChange={handleChange}/>
                        <div className='payment__priceContainer'>
                            <CurrencyFormat
                                renderText={(value) => (
                                    <h3>Order Total: {value}</h3>
                                )}
                                decimalScale={2}
                                value={getBasketTotal(basket)}
                                displayType={"text"}
                                thousandSeparator={true}
                                prefix={"$"}
                            />

                            <button disabled={processing || disable || succeeded}>
                                <span>{processing? <p>Processing</p>: "Buy Now" }</span>
                            </button>
                        </div>
                        
                        {/* Error */}
                        {error && 
                            <div>
                                {error}
                            </div>
                        }
                    </form>

                </div>
            </div>
        </div>
    </div>
  )
}

export default Payment