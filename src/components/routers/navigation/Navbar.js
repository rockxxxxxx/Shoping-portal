import React from "react";
import "./Navbar.css";
import {Link} from 'react-router-dom'

export default function Navbar() {
  return (
  <div className="Navbar">
    <div className='nav-links-container'>
    <Link className='logo-container' to='/'>
        HOME
        </Link>
        </div>
        <div className='nav-links-container'>
        <Link className='logo-container' to='/store'>
        STORE
        </Link>
        </div>
        <div className='nav-links-container'>
        <Link className='logo-container' to='/about'>
        ABOUT
        </Link>
        </div>
        <div className="icon">
        <i class="corner big  inverted shopping cart icon">0</i> 
        </div>
    </div>
    );
}
