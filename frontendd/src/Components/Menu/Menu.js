import React from 'react';
import menuSyles from './Menu.module.css' ;
import {menu_list} from '../../assets/assets'
import { motion } from 'framer-motion';

export const Menu = ({category, setCategory}) => {
  return (
    
      <div className={menuSyles.exploreMenu} id='exploreMenu'>
      <motion.h1
       initial={{ opacity: 0, y: -40 }}
       animate={{opacity:1,y:0}}
       transition={
         {type:'spring', delay:0.3, damping:10, stiffness:120}
        }
      >Explore Our Menu</motion.h1>
      <motion.p
       initial={{ opacity: 0, y: -40 }}
       animate={{opacity:1,y:0}}
       transition={
         {type:'spring', delay:0.5, damping:10, stiffness:120}
        }
      >
      "Savor Every Bite" Explore Our Exquisite Menu! Explore the Flavors Today!
      </motion.p>

      <div className={menuSyles['exploreMenu-list']}>

      {menu_list.map((item,i)=>{
        return <div key={i} onClick={()=>setCategory(prev=>prev===item.menu_name?"All":item.menu_name)} className={menuSyles['exploreMenu-listItem']}>

            <motion.img
             initial={{ opacity: 0, y: 50 }}
             animate={{opacity:1,y:0}}
             transition={
               {type:'spring', delay:0.3, damping:10, stiffness:150}
              }
            className={category===item.menu_name?menuSyles.active:""} src={item.menu_image} alt='menu image' />
            <motion.p
             initial={{ opacity: 0, y: 50 }}
             animate={{opacity:1,y:0}}
             transition={
               {type:'spring', delay:0.5, damping:10, stiffness:150}
              }
            >{item.menu_name}</motion.p>
          </div>
      })}
      </div>
      <hr/>
    </div>
 
  )
}
