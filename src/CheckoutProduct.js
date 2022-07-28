import React from 'react';
import "./CheckoutProduct.css";
import { useStateValue } from './StateProvider';

function CheckoutProduct({id,image,title,price,rating,hideButton}) {

    const [{basket},dispatch] = useStateValue();

    const removeFromBasket = () => {
        
        //remove the item from the data layer for that we need useStateValue
        dispatch({
            type: "REMOVE_FROM_BASKET",
            id:id,
            
        })

    }
    
  return (
    <div className='checkoutProduct'>
        <img className='checkoutProduct__image' src={image}/>

        <div className='checkoutProduct__info'>

            <p className='checkoutProduct__title'>
                {title}
            </p>

            <p className='checkoutProduct__price'>
                <small>
                    $
                </small> 
                <strong>
                    {price}
                </strong>
            </p>

            <div className='checkoutProduct__rating'>
                
                {Array(rating).fill().map(() => 
                    (
                        <p>⭐</p>
                    )
                    
                )}
            </div>
                        
            {/* Hide button with condition */}

            {!hideButton && (

                <button onClick={removeFromBasket} className='checkoutProduct__button'>
                Remove from Checkout
                </button>

            )}           
           
        </div>
    </div>
  )
}

export default CheckoutProduct