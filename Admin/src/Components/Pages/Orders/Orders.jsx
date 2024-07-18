import React from 'react'
import { useState } from 'react'
import axios from "axios"
import {toast} from "react-toastify"
import { useEffect } from 'react'
import { assets } from '../../../../../frontend/src/assets/assets'
import './Orders.css'

const Orders = ({url}) => {

  const [orders, setOrders] = useState([]);

  const fetchAllOrders = async ()=>{
        const response = await axios.get(url+"/api/order/list");
        if(response.data.success){
          setOrders(response.data.data);
        }else{
          toast.error(response.data.message)
        }
  }

  useEffect(()=>{
      fetchAllOrders()
  },[])

  const orderStatus = async (e, orderId)=>{
      const response = await axios.post(url+"/api/order/update",{orderId,status:e.target.value})
      if(response.data.success){
        await fetchAllOrders()
        toast.success(response.data.message)
      }else{
        toast.error(response.data.message)
      }
  }

  


  return (
    <div className='order add'>
       <div style={{display:"flex", alignItems:"center", justifyContent:"space-between", width:'90%', margin:"auto"}}>
        <h2>Order Page</h2>
        <button onClick={()=>fetchAllOrders()} className='order-amount-date' style={{cursor:'pointer',border:'none'}} >Refresh</button>
        </div>
      <div className="order-list">
        {orders.map((order, i)=>{

const date = new Date(order.date);
let hours = date.getHours();
const minutes = date.getMinutes();
const ampm = hours >= 12 ? 'PM' : 'AM';
const month = date.getMonth() + 1; 
const day = date.getDate();
const year = date.getFullYear(); 

       return   <div key={i} className="order-item">

              <img src={assets.parcel_icon} alt="parcel" />
              <div>
                <p className='order-item-food'>
                  {order.items.map((item,i)=>{
                      if(i===order.items.length-1){
                        return item.name + "x" +item.amount
                      }else{
                        return item.name + "x" +item.amount + ","
                      }
                  })}
                </p>
                <p className="order-item-name">
                  {order.address.firstName+ " "+order.address.lastName}
                </p>
                <div className="order-item-address">
                  <p>{order.address.street+", "}</p>
                  <p>{order.address.city+", " + order.address.state+", "+order.address.country+", "+order.address.zipCode}</p>
                </div>
                <p className="order-item-phone">
                  {order.address.phone}
                </p>
              </div>
              <p className='num-item'>Items: {order.items.length} </p>
              <p>${order.amount}</p>
            <div className='order-select-div'>
            <select value={order.status} onChange={(e)=>orderStatus(e,order._id)} >
                    <option value="Processing">Processing</option>
                    <option value="Cancel">Cancel</option>
                    <option value="on way">Out for Delivery</option>
                    <option value="Delivered">Delivered</option>
              </select>
        <div className='order-amount-date'>
        <p>{`${hours}:${minutes} ${ampm}`}</p>
        <p  > {`${month}/${day}/${year}`} </p>
          </div>
              </div>
          </div>
        })}
      </div>
      
    </div>
  )
}

export default Orders