import React, { useContext } from "react";
import Model from "./Model";
import styles from "./Cartitem.module.css";
import CartList from "./CartList";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import CartContext from "../Context/CartContext";

const CartItem = (props) => {
 const {items,addItem,removeItem ,totalAmount} = useContext(CartContext)
  const navigate = useNavigate();
 

  const addItems = item => {
    addItem({...item, amount : 1})
  }

  const removeItems = id => {
    removeItem(id);
  }
  const hasItem = items.length > 0;

  const cartitems = (
    <ul className={styles["cart-items"]}>
      {items.map((item) => (
        <CartList
          key={item.id}
          name={item.name}
          price={item.price}
          amount={item.amount}
          image={item.image}
          onAdd={addItems.bind(null, item)}
          onRemove = {removeItems.bind(null ,item.id)}
        />
      ))}
    </ul>
  );

  return (
    <Model onClose={props.onClose}>
      {cartitems}
      <div className={styles.total}>
        <span>Total Amount</span>
        <span>${totalAmount?totalAmount:0.0}</span>
      </div>
      <div className={styles.actions}>
        <motion.button 
        initial={{ opacity: 0, y: 40 }}
        whileInView={{opacity:1,y:0}}
        transition={
          {type:'spring', delay:0.1, damping:10, stiffness:120}
         }
        onClick={props.onClose} className={styles["button--alt"]}>
          Close
        </motion.button>
        {hasItem && <motion.button
        initial={{ opacity: 0, y: 40 }}
        whileInView={{opacity:1,y:0}}
        transition={
          {type:'spring', delay:0.3, damping:10, stiffness:120}
         }
        onClick={()=>{window.scrollTo(0,0);navigate('/order');props.onClose()}} className={styles.button}>Order</motion.button>}
      </div>
    </Model>
  );
};

export default CartItem;
