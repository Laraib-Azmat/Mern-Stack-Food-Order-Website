import React, { useRef, useState } from 'react';
import contactStyle from './ContactStyle.module.css'
import emailjs from 'emailjs-com'
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';

export const Contact = () => {

  const form = useRef();



const handleSubmit = (e) => {
    e.preventDefault();
    
    emailjs.sendForm("service_g04pzjv","template_51tzsji", form.current,'wWbb2c9phUC-l3ssR')
    .then(res=>{
      console.log(res);
      toast.success("Your message sent!")
      form.current.reset();
    })
    .catch(error=>{
      console.log(error)
      toast.error("Error! Try later")
    })

};

  return (
 <div className={contactStyle.contactDiv}>
   <div className={contactStyle["contact-form"]}>
            <motion.h2
            initial={{ opacity: 0, y: -50 }}
            animate={{opacity:1,y:0}}
            transition={
              {type:'spring', delay:0.3, damping:10, stiffness:120}
             }
            >Contact Us</motion.h2>
            <form  ref={form} onSubmit={handleSubmit}>
                <div className={contactStyle['form-group']}>
                    <motion.label
                    initial={{ opacity: 0, x: -40 }}
                    animate={{opacity:1,x:0}}
                    transition={
                      {type:'spring', delay:0.2, damping:10, stiffness:120}
                     }
                    htmlFor="name">Name:</motion.label>
                    <motion.input
                    initial={{ opacity: 0, x: 40 }}
                    animate={{opacity:1,x:0}}
                    transition={
                      {type:'spring', delay:0.2, damping:10, stiffness:120}
                     } 
                        type="text" 
                        name="to_name"
                        required 
                    />
                </div>
                <div className={contactStyle['form-group']}>
                <motion.label
                    initial={{ opacity: 0, x: -40 }}
                    animate={{opacity:1,x:0}}
                    transition={
                      {type:'spring', delay:0.4, damping:10, stiffness:120}
                     } htmlFor="email">Email:</motion.label>
                    <motion.input
                    initial={{ opacity: 0, x: 40 }}
                    animate={{opacity:1,x:0}}
                    transition={
                      {type:'spring', delay:0.4, damping:10, stiffness:120}
                     } 
                        type="email" 
                        name="from_email" 
                        required 
                    />
                </div>
                <div className={contactStyle['form-group']}>
                <motion.label
                    initial={{ opacity: 0, x: -40 }}
                    animate={{opacity:1,x:0}}
                    transition={
                      {type:'spring', delay:0.6, damping:10, stiffness:120}
                     } htmlFor="message">Message:</motion.label>
                    <motion.textarea
                    initial={{ opacity: 0, x: 40 }}
                    animate={{opacity:1,x:0}}
                    transition={
                      {type:'spring', delay:0.6, damping:10, stiffness:120}
                     }
                        id="message" 
                        name="message"  
                        rows="4" 
                        required 
                    />
                </div>
                <motion.button 
                initial={{ opacity: 0, y: 40 }}
                whileInView={{opacity:1,y:0}}
                transition={
                  {type:'spring', delay:0.4, damping:10, stiffness:120}
                 }
                className={contactStyle.submitBtn} type="submit">Submit</motion.button>
            </form>
        </div>
 </div>
  )
}
