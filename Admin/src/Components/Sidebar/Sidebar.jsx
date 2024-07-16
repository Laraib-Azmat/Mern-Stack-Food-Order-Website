import React from 'react';
import './Sidebar.css';
import cartIcon from '../../assets/Cart.gif';
import listIcon from '../../assets/list.gif';
import orderIcon from '../../assets/order.gif';
import { NavLink } from 'react-router-dom';

const Sidebar = () => {
  return (
    <div className='sideBar'>
        
        <div className="sidebar-options">

           <NavLink to='/add'>
           <div className="sidebar-option">
                <img src={cartIcon} alt='cart' />
                <p>Add Items</p>
            </div>
           </NavLink>

          <NavLink to='/list'>
          <div className="sidebar-option">
                <img src={listIcon} alt='list' />
                <p>List Items</p>
            </div>
          </NavLink>

           <NavLink to="/orders">
           <div className="sidebar-option">
                <img src={orderIcon} alt='orders' />
                <p>Orders</p>
            </div>
           </NavLink>
        </div>
    </div>
  )
}

export default Sidebar