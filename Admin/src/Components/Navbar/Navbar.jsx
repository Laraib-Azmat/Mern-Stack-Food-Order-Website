import React from 'react';
import './Navbar.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser } from '@fortawesome/free-solid-svg-icons'

const Navbar = () => {
  return (
    <div className='navbar'>
    
    <div className="logo-div">
    <h2>OrdFoo.</h2>
    <p>Admin Panel</p>
    </div>

    <div className="profile-div">
    <FontAwesomeIcon icon={faUser} />
    </div>
    </div>
  )
}

export default Navbar