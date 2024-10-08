import React from 'react'
import { NavLink } from 'react-router-dom'
import './Navbar.css';
import { useAuth } from '../store/auth';


const Navbar = () => {
  const {isLoggedIn} = useAuth();
  return (
    <>
      <div className="container">
        <div className="logo-brand">
            <img src="https://placehold.co/40" alt="logo" />
            <NavLink to="/">Admin@Soumya</NavLink>
        </div>

        <nav>
            <ul>
                <li> <NavLink to="/">Home</NavLink></li>
                <li> <NavLink to="/about">About</NavLink></li>
                <li> <NavLink to="/contact">Contact</NavLink></li>
                <li> <NavLink to="/admin">Admin</NavLink></li>
                {isLoggedIn ? (<li> <NavLink to="/logout">Logout</NavLink></li>) :
                (<>
                <li> <NavLink to="/register">Register</NavLink></li>
                <li> <NavLink to="/login">Login</NavLink></li>
                </>)}                
            </ul>
        </nav>
    </div>
    </>
  )
}

export default Navbar
