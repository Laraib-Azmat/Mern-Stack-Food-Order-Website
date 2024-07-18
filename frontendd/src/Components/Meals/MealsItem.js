import mealStyles from "./MealsItem.module.css";
import { useContext, useEffect, useState } from "react";
import { assets } from "../../assets/assets";
import CartContext from "../Context/CartContext";
import { motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

const MealsItem = ({id,name,image,price,description, available}) => {

  const {items,addItem, removeItem,url} = useContext(CartContext);
  const [itemAmount, setAmount] = useState(0)



  useEffect(() => {
    const currentItem = items.find((i) => i.id === id);
    if (currentItem) {
      setAmount(currentItem.amount);
    } else {
      setAmount(0);
    }
  }, [items, id]);



  const addToCart=()=>{
    addItem({
      id:id,
      name:name,
      price:price,
      image:image,
      amount:1
    })
  }

  return (

    <motion.div
    initial={{ opacity: 0, y: 40 }}
    whileInView={{opacity:1,y:0}}
    transition={
      {type:'spring', delay:0.1, damping:10, stiffness:120}
     }
     className={`${mealStyles.mealItem} ${!available ? mealStyles.disabled : ''}`} >
 {!available && <div className={mealStyles.overlay}>Not available now</div>}
      <div className={mealStyles['mealItem-imgConatainer']}>
          <motion.img
           whileHover={{scale:1.1}}
           transition={
             {type:'spring', delay:0.2, damping:10, stiffness:150}
            }
          className={mealStyles['mealItem-img']} src={url+"/images/"+image} alt="meal-image" />
          {!itemAmount>0 ?
          <motion.div
          whileHover={{scale:1.3}}
        transition={
          {type:'spring', delay:0.2, damping:10, stiffness:100}
         }
         onClick={addToCart}
         className={mealStyles.add}
          >
              <FontAwesomeIcon icon={faPlus} />
          </motion.div>:
        <div className={mealStyles['foodItem-counter']}>
          <img onClick={()=>removeItem(id)} src={assets.remove_icon_red} alt="remove" />
          <p>{itemAmount}</p>
          <img onClick={addToCart} src={assets.add_icon_green} alt="add" />
        </div>  
        }
      </div>

      <div className={mealStyles['mealItem-info']}>

        <div className={mealStyles['mealItem-name']}>
          <p>{name}</p>
          <img  src={assets.rating_starts} alt="ratings" />
        </div>

      
        <p className={mealStyles['mealItem-desc']}>{description}</p>
        <p className={mealStyles['mealItem-price']}>${price}</p>

      </div>

    </motion.div>
  );
};
export default MealsItem;
