import React, { useContext, useState } from 'react';
import orderStyle from './Order.module.css';
import CartContext from '../Context/CartContext';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import {toast} from "react-toastify";

const PlaceOrder = () => {

    const {totalAmount, items, url, token} = useContext(CartContext);
    const [data, setData] = useState({
        firstName:"",
        lastName:"",
        email:"",
        street:"",
        city:"",
        state:"",
        zipCode:"",
        country:"",
        phone:""
    })
    const navigate = useNavigate();

    const onChangeHandler = (e)=>{
        const name = e.target.name
        const value = e.target.value

        setData(data=>({...data, [name]:value}))
    }

        const placeOrderHandler = async (e)=>{
                e.preventDefault();
                let orderData = {
                    items,
                    amount:totalAmount+2,
                    address:data
                }

                let response = await axios.post(url+"/api/order/place", orderData,{headers:{token}})
                if(response.data.success){
                    toast.success(response.data.message)
                    setData({
                        firstName:"",
                        lastName:"",
                        email:"",
                        street:"",
                        city:"",
                        state:"",
                        zipCode:"",
                        country:"",
                        phone:""
                    })
                    navigate("/myOrders")
                    window.location.reload();
                }else{
                    toast.error(response.data.message)
                }
        }

  return (
   <form onSubmit={placeOrderHandler} className={orderStyle.Order}>

    <div className={orderStyle['order-left']}>
        <p className={orderStyle.title}>
            Delivery Information
        </p>
        <div className={orderStyle['order-fields']}>
            <input name='firstName' onChange={onChangeHandler} value={data.firstName} type='text' placeholder='First name' required/>
            <input name='lastName' onChange={onChangeHandler} value={data.lastName} type='text' placeholder='Last name' required/>
        </div>

            <input name='email' onChange={onChangeHandler} value={data.email} type='email' placeholder='Email' required />
            <input name='street' onChange={onChangeHandler} value={data.street} type='text' placeholder='Street' required />

            <div className={orderStyle['order-fields']}>
            <input name='city' onChange={onChangeHandler} value={data.city} type='text' placeholder='City' required/>
            <input name='state' onChange={onChangeHandler} value={data.state} type='text' placeholder='State' required/>
        </div>  
        <div className={orderStyle['order-fields']}>
            <input name='zipCode' onChange={onChangeHandler} value={data.zipCode} type='text' placeholder='Zip code' required/>
            <input name='country' onChange={onChangeHandler} value={data.country} type='text' placeholder='Country' required/>
        </div>

        <input name='phone' onChange={onChangeHandler} value={data.phone} type='text' placeholder='Phone'  required/>
    </div>

    <div className={orderStyle['order-right']}>
        <div className={orderStyle.orderTotal}>
                <h2>Total Amount</h2>
           <div>
                    <div className={orderStyle['order-details']}>
                        <p>SubTotal</p>
                        <p>${totalAmount}</p>
                    </div>
                  <hr/>
                  <div className={orderStyle['order-details']}>
                        <p>Delivery Fee</p>
                        <p>{totalAmount===0?"$0":"$2"}</p>
                    </div> 
                  <hr/>   
                  <div className={orderStyle['order-details']}>
                        <p>Total</p>
                        <p style={{color:'#8a2b06',fontWeight:600}}>${totalAmount===0?'0':totalAmount+2}</p>
                    </div>
            </div>     
           {totalAmount===0 ?
         <Link to='/'  >
            <button>
            Explore Item
            </button>
         </Link>:
         <button type='submit'>Proceed For Payment</button>   
        }
        </div>
    </div>

   </form>
  )
}

export default PlaceOrder