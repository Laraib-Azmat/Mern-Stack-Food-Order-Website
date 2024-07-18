import { useState } from "react";
import Header from "./Components/Layout/Header";
import Meals from "./Components/Meals/Meals";
import CartItem from "./Components/Cart/CartItem";
import CartProvider from "./Components/Context/CartProvider";
import { Route, Routes } from "react-router-dom";
import { Contact } from "./Components/Contact/Contact";
import LoginSignup from "./Components/Register/LoginSignup";
import Footer from "./Components/Footer/Footer";
import PlaceOrder from "./Components/Order/PlaceOrder";
import AppDownload from "./Components/AppDownload/AppDownload";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Myorder } from "./Components/Order/Myorder";

function App() {

  const [cartshow, setCartShow] = useState(false);
  const [showLogin, setShowLogin] = useState(false)

  const showCart = () => {
    setCartShow(true);
  }

  const hideCart = () => {
    setCartShow(false);
  }

  const closeLogin = () => {
    setShowLogin(false);
  }

  return (
    <CartProvider>
      <ToastContainer/>
      {showLogin && <LoginSignup onClose={closeLogin} />}
   { cartshow  &&   <CartItem onClose={hideCart} />}
      <Header onShow={showCart} setLogin={setShowLogin} />
    
       <Routes>
        <Route path="/" element ={<Meals/>}/>
        <Route path="/contact" element={<Contact/>} />
        <Route path="/register" element={LoginSignup} />
        <Route path="/order" element={<PlaceOrder/>} />
        <Route path="/getApp" element={<AppDownload/>} />
        <Route path="/myOrders" element={<Myorder/>} />
       </Routes>

       <Footer/>
       
    </CartProvider>
  );
}

export default App;
