import React, { useContext, useEffect, useState } from 'react';
import orderStyle from "./Order.module.css";
import CartContext from '../Context/CartContext';
import axios from 'axios';
import { toast } from 'react-toastify';
import { assets } from '../../assets/assets';


export const Myorder = () => {

    const [data, setData] = useState([]);
    const {url, token } = useContext(CartContext);

    const fetchOrders = async ()=>{
        const response = await axios.post(url+"/api/order/userOrders", {}, {headers:{token}});
        if(response.data.success){
            setData(response.data.data.sort((a, b) => new Date(b.date) - new Date(a.date)))
        }else{
            toast.error(response.data.message)
        }
    }

    useEffect(()=>{
        if(token){
            fetchOrders();
            console.log(data);
        }
    },[token])

    const cancelOrder  = async (orderId)=>{
        const response = await axios.post(url+"/api/order/update",{orderId,status:"Cancel"})
      if(response.data.success){
        await fetchOrders()
        toast.success(response.data.message)
      }else{
        toast.error(response.data.message)
      }
    }


    const deleteOrder = async(orderId)=>{
      
            const response = await axios.post(url+"/api/order/delete",{orderId})
            if(response.data.success){
                await fetchOrders()
                toast.success(response.data.message)
            }else{
                toast.error(response.data.message)
            }
    }

  return (
    <div className={orderStyle.myOrders}>
        <div style={{display:"flex", alignItems:"center", justifyContent:"space-between", width:'90%', margin:"auto"}}>
        <h2>My Orders</h2>
        <button onClick={()=>fetchOrders()} className={orderStyle.cancelBtn} >Refresh</button>
        </div>

        {data.length<=0 ?
    <div style={{height:"30vh", alignItems:'center',display:"flex",justifyContent:"center",width:"100%",fontSize:22, color:"#802b06", fontWeight:"bolder"}}>
        <p>No orders yet!</p>
        </div>:
        <div className={orderStyle['orders-list']}>
        {data.map((item,i)=>{
             const date = new Date(item.date);
             let hours = date.getHours();
            const minutes = date.getMinutes();
             const ampm = hours >= 12 ? 'PM' : 'AM';
             const month = date.getMonth() + 1; 
             const day = date.getDate();
             const year = date.getFullYear(); 

            if(item.status==='Processing'){
                return <div key={i} className={orderStyle['order-processing-item']}>
                   <div className={orderStyle['order-status']} >
                   <img src={assets.processIcon} alt='process' />
                   <p>Processing</p>
                    </div>
                
                   <div className={orderStyle['order-names']}>
                   {item.items.map((itm,i)=>{
                        if(i===item.items.length-1){
                            return <p key={i}>{itm.name} <span style={{color:"yellow"}}>x{itm.amount}</span></p>
                        }else{
                            return <p key={i}>{itm.name}<span style={{color:"yellow"}}>  x{itm.amount}</span>,</p>
                        }
                    })}
                   </div>

                    <div style={{display:"flex",alignItems:'center',gap:10}}>
                    <button onClick={()=>cancelOrder(item._id)} className={orderStyle.cancelBtn}>Cancel</button>

                    <div className={orderStyle['orders-amount-date']}>
                    <p><span style={{color:'#8a2b06'}}>Total: </span> ${item.amount}</p>
                    <p>{`${hours}:${minutes} ${ampm}`}</p>
                    <p style={{color:"#9c8327"}} > {`${month}/${day}/${year}`} </p>
                        </div>
                        </div>
            
                </div>       
            }else if(item.status==="Delivered"){
                return <div key={i} className={orderStyle['order-delivered-item']}>
                    <div className={orderStyle['order-status']} >
                     <img src={assets.parcel_icon} alt='parcel' />
                     <p>Delivered</p>
                     </div>
                     <div className={orderStyle['order-names']}>
                   {item.items.map((itm,i)=>{
                        if(i===item.items.length-1){
                            return <p key={i}>{itm.name} <span style={{color:"yellow"}}>x{itm.amount}</span></p>
                        }else{
                            return <p key={i}>{itm.name}<span style={{color:"yellow"}}>  x{itm.amount}</span>,</p>
                        }
                    })}
                   </div>
                   <div style={{display:"flex",alignItems:'center',gap:10}}>
                    <button onClick={()=>deleteOrder(item._id)} className={orderStyle.cancelBtn}>Delete</button>

                    <div className={orderStyle['orders-amount-date']}>
                    <p><span style={{color:'#8a2b06'}}>Total: </span> ${item.amount}</p>
                    <p>{`${hours}:${minutes} ${ampm}`}</p>
                    <p style={{color:"#9c8327"}} > {`${month}/${day}/${year}`} </p>
                        </div>
                        </div>
                </div>
            }else if(item.status==="Cancel"){
                return <div key={i} className={orderStyle['order-cancel-item']}>
                    <div className={orderStyle['order-status']} >
                    <img src={assets.cancelIcon} alt='parcel' />
                    <p>Cancelled</p>
                    </div>
                    <div className={orderStyle['order-names']}>
                   {item.items.map((itm,i)=>{
                        if(i===item.items.length-1){
                            return <p key={i}>{itm.name} <span style={{color:"yellow"}}>x{itm.amount}</span></p>
                        }else{
                            return <p key={i}>{itm.name}<span style={{color:"yellow"}}>  x{itm.amount}</span>,</p>
                        }
                    })}
                   </div>
                   <div style={{display:"flex",alignItems:'center',gap:10}}>
                    <button onClick={()=>deleteOrder(item._id)} className={orderStyle.cancelBtn}>Delete</button>

                    <div className={orderStyle['orders-amount-date']}>
                    <p><span style={{color:'#8a2b06'}}>Total: </span> ${item.amount}</p>
                    <p>{`${hours}:${minutes} ${ampm}`}</p>
                    <p style={{color:"#9c8327"}} > {`${month}/${day}/${year}`} </p>
                        </div>
                        </div>
                </div>
            }else{
                return <div key={i} className={orderStyle['order-processing-item']}>
                   <div className={orderStyle['order-status']} >
                   <img src={assets.processIcon} alt='process' />
                   <p>Processing</p>
                    </div>
                
                   <div className={orderStyle['order-names']}>
                   {item.items.map((itm,i)=>{
                        if(i===item.items.length-1){
                            return <p key={i}>{itm.name} <span style={{color:"yellow"}}>x{itm.amount}</span></p>
                        }else{
                            return <p key={i}>{itm.name}<span style={{color:"yellow"}}>  x{itm.amount}</span>,</p>
                        }
                    })}
                   </div>

                    <div style={{display:"flex",alignItems:'center',gap:10}}>
                    <button className={orderStyle.wayBtn}>On the way</button>

                    <div className={orderStyle['orders-amount-date']}>
                    <p><span style={{color:'#8a2b06'}}>Total: </span> ${item.amount}</p>
                    <p>{`${hours}:${minutes} ${ampm}`}</p>
                    <p style={{color:"#9c8327"}} > {`${month}/${day}/${year}`} </p>
                        </div>
                        </div>
            
                </div>   
            }
           
        })}
        </div>    
    }
        
    </div>
  )
}
