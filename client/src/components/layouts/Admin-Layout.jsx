import React from 'react'
import { NavLink, Outlet, Navigate } from 'react-router-dom';
import { FaUser } from "react-icons/fa6";
import { FaHome } from "react-icons/fa";
import { FaMailBulk } from "react-icons/fa";
import { TbAlignBoxLeftStretch } from "react-icons/tb";
import { useAuth } from '../../store/auth';

const AdminLayout = () => {

  const {user,isLoading } = useAuth();

  if(isLoading){
    return <h1>Loading...</h1>;
  }
  if(!user.isAdmin){
    return <Navigate to="/"/>
  }
  return (
    <>
      <header>
        <div className="container">
            <h1>hello! {user ? `${user.username} welcome to the admin pannel` : `welcome to the admin pannel`}</h1>
            <nav>
                <ul>
                    <li> <NavLink to="/admin/users"> <FaUser /> Users</NavLink></li>
                    <li> <NavLink to="/admin/contacts"> <FaMailBulk /> Contacts</NavLink></li>
                     <li><NavLink to="/"> <TbAlignBoxLeftStretch /> Services</NavLink></li>
                    <li><NavLink to="/"> <FaHome /> Return Home</NavLink></li>
                </ul>
            </nav>
        </div>
      </header>
      <Outlet/>
    </>
  )
}

export default AdminLayout;
