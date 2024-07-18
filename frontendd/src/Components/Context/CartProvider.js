import React, { useEffect, useReducer, useState } from "react";
import CartContext from "./CartContext";
import axios from "axios";
import {toast} from "react-toastify"


const  CartProvider=(props)=> {

  const [food_list, setFoodList] = useState([]);
  const [items, setCartItems] = useState([]);
  const url = "http://localhost:4000";
  const [token, setToken] = useState("");
  const [name, setName] = useState("");
  const [totalAmount, setTotalAmount] = useState(0)

 const fetchFoodList = async ()=>{
  const response = await axios.get(url+"/api/food/list");
  if(response.data.success){
    setFoodList(response.data.data);
    // toast(`Hello there! ${name}`);
  }else{
    toast.error("Something went wrong");
  }
 }
 const fetchCartItem = async (token)=>{
 
  const response = await axios.post(url+"/api/cart/list",{},{headers:{token}})
   if(response.data.success){
    setCartItems(response.data.cartData);
    const total = response.data.cartData.reduce((acc, item) => {
      return acc + item.amount * item.price;
    }, 0);
    
    setTotalAmount(total);
   }else{
    toast.error(response.data.message);
   }

 }


 useEffect(()=>{

      async function loadData (){
        fetchFoodList();

        if(localStorage.getItem("token")){
          setToken(localStorage.getItem("token"));
          setName(localStorage.getItem("name"));
         await  fetchCartItem(localStorage.getItem("token"));
      }else{
        toast.dark("Login to OrdFoo.")
      }
    }

    loadData();
 },[token])

 const addToCart = async (item)=>{
      if(token){
        const response = await axios.post(url+"/api/cart/add", item, {
          headers:{token}
        })
        if(!response.data.success){
          toast.error(response.data.message)
        }else{
          await fetchCartItem(token)
          
        }
      }else{
        toast.error("Login yourself to add on cart")
      }
 }
 
 const removeFromCart = async (id)=>{
    if(token){
   
      const response = await axios.post(url+"/api/cart/remove",{id:id},{ headers:{token}})
      
      if(response.data.success){
        await fetchCartItem(token);
      }else{
        toast.error(response.data.message)
      }
    }
 }

 
  const cartContext = {
    items,
    food_list,
    addItem: addToCart,
    removeItem: removeFromCart,
    food_list,
    url,
    token,
    setToken,
    name,
    setName,
    totalAmount
  };

  return (
    <CartContext.Provider value={cartContext}>
      {props.children}
    </CartContext.Provider>
  );
}

export default CartProvider;
