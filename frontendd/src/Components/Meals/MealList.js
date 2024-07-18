import { useContext } from "react";
import MealsItem from "./MealsItem";
import CartContext from "../Context/CartContext";
import mealStyle from './MealsItem.module.css'

const MealList = ({category}) => {

 const {food_list} = useContext(CartContext)

    return (
      
   <div className={mealStyle.mealDisplay} id="mealDisplay">
                <h1>Top dishes near you!</h1>

            <div className={mealStyle['mealDisplay-list']}>
        {
            food_list.map((item,i)=>{
       if(category==='All' || category===item.category){
               return <MealsItem 
               key={i}
               id={item._id}
               name={item.name}
               price={item.price}
               image={item.image}
               description={item.description}
               available={item.available}
               />
            }     
          })
                }
            </div>
            </div>
    
    );
}

export default MealList;