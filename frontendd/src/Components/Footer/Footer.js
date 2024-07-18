import React from 'react';
import footerStyle from "./Footer.module.css"
import { assets } from '../../assets/assets';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const Footer = () => {
  return (
    <div className={footerStyle.footer} id='footer'>
        <div className={footerStyle['footer-content']}>

            <div className={footerStyle['footer-left']}>
                    <Link onClick={()=>window.scrollTo(0,0)} to='/' style={{textDecoration:'none'}}><motion.h2
                    initial={{ opacity: 0, y: -60 }}
                    whileInView={{opacity:1,y:0}}
                    transition={
                      {type:'spring', delay:0.2, damping:10, stiffness:120}
                     }
                    >OrdFoo.</motion.h2></Link>
                <motion.p
                initial={{ opacity: 0, y: -50 }}
                whileInView={{opacity:1,y:0}}
                transition={
                  {type:'spring', delay:0.4, damping:10, stiffness:120}
                 }
                >Order food and groceries online with OrdFoo now and enjoy a great dining experience!</motion.p>
                <div className={footerStyle['footer-social-icons']}>
                    <motion.img 
                    initial={{ opacity: 0, x: -40 }}
    whileInView={{opacity:1,x:0}}
    whileHover={{scale:1.1}}
    transition={
      {type:'spring', delay:0.4, damping:10, stiffness:120}
     }
                    src={assets.facebook_icon} alt='facebook' />
                    <motion.img 
                    initial={{ opacity: 0, x: -40 }}
    whileInView={{opacity:1,x:0}}
    whileHover={{scale:1.1}}
    transition={
      {type:'spring', delay:0.3, damping:10, stiffness:120}
     }
                    src={assets.twitter_icon} alt='twitter' />
                    <motion.img 
                    initial={{ opacity: 0, x: -40 }}
    whileInView={{opacity:1,x:0}}
    whileHover={{scale:1.1}}
    transition={
      {type:'spring', delay:0.2, damping:10, stiffness:120}
     }
                    src={assets.linkedin_icon} alt='linkedin' />
                </div>
            </div>

            <div className={footerStyle['footer-center']}>
                <h2>Company</h2>
                <ul>
                <Link onClick={()=>window.scrollTo(0,0)} to='/' style={{textDecoration:'none',color:'#fff'}}>  <li>Home</li> </Link>
                    <li>About Us</li>
                    <Link onClick={()=>window.scrollTo(0,0)} to='/contact' style={{textDecoration:'none',color:'#fff'}}><li >Contact Us</li></Link>
                    <li>Privacy Policy</li>
                </ul>

            </div>

            <div className={footerStyle['footer-right']}>

                <h2>Get In Touch</h2>
                <ul>
                    <li>+021 000000</li>
                    <li>azmatlaraib2003@gmail.com</li>
                </ul>
            </div>


        </div>

        <hr/>
        <p className={footerStyle['footer-copyright']}>
            Copyright 2024 @ OrdFoo.com - All Right Reserved.
        </p>
    </div>
  )
}

export default Footer