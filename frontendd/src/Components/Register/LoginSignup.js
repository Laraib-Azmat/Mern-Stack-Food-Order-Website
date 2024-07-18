import React, { useContext, useEffect, useState } from 'react'
import registerStyle from "./Register.module.css"
import { assets } from '../../assets/assets';
import { motion } from 'framer-motion';
import CartContext from '../Context/CartContext';
import axios from "axios";
import {toast} from 'react-toastify';

const LoginSignup = (props) => {

  const {url, setToken, setName} = useContext(CartContext);
  const [state, setState] = useState("Login");
  const [data,setData] = useState({
    name:"",
    email:"",
    password:""
  })

  const changeHandler = (event)=>{
    const name = event.target.name;
    const value = event.target.value;

    setData(data=>({...data,[name]:value}))
  }

  const onLogin = async (e)=>{
    e.preventDefault();

    let newURL = url;
    if(state==='Login'){
      newURL += "/api/user/login";
    }else{
      newURL += "/api/user/register"
    }

      const response = await axios.post(newURL,data);
      if(response.data.success){
        toast.success(`Successfully ${state}`);
          setToken(response.data.token);
          setName(response.data.name);
          localStorage.setItem("token",response.data.token);
          localStorage.setItem("name",response.data.name);
          props.onClose();
      }else{
          toast.error(response.data.message);
      }

  }

  useEffect(() => {
    document.body.classList.add(registerStyle['no-scroll']);
    return () => {
        document.body.classList.remove(registerStyle['no-scroll']);
    };
}, []);



  return (
   <div className={registerStyle['login-popup']}> 
      <form onSubmit={onLogin} className={registerStyle['login-form']}>

          <motion.div
          initial={{ opacity: 0, y: -40 }}
          whileInView={{opacity:1,y:0}}
          transition={
            {type:'spring', delay:0.2, damping:10, stiffness:120}
           }
          className={registerStyle['login-title']} >
            <h2>{state}</h2>
            <img onClick={()=>props.onClose()} src={assets.cross_icon} alt='cross' />
          </motion.div>

          <div className={registerStyle['login-inputs']}>
            {state!=='Login' && <input type='text' name='name' onChange={changeHandler} value={data.name} placeholder='Your name' required/>}
              <input  type='email' name='email' placeholder='Your email' onChange={changeHandler} value={data.email} required/>
              <input  type='password' name='password' placeholder='Password'onChange={changeHandler} value={data.password} required/>
          </div>

          <motion.button
          initial={{ opacity: 0, scale:0 }}
          whileInView={{opacity:1, scale:1}}
          transition={
            {type:'spring', delay:0.3, damping:10, stiffness:120}
           }
           type='submit'
          >
            {state==='Login' ? 'Login':"Create Account"}
          </motion.button>

        <div className={registerStyle['login-condition']}>
          <input type='checkbox' required/>
          <p>I agree terms and conditions</p>
        </div>

        {state==='Login'?
      <p>Create an account <span onClick={()=>setState('Signup')}>Click here</span></p>  :
      <p>Already have an account? <span onClick={()=>setState('Login')}>Login</span></p>
      }
      </form>
      </div>
  )
}

export default LoginSignup