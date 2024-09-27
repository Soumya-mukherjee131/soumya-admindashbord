import React from 'react'
import { NavLink } from 'react-router-dom'

const Error = () => {
  return (
    <>
    <section id="error-page">
        <div className="content">
            <h2 className="header">404</h2>
            <h4>Sorry! Page does not exist..</h4>
            <p>It seems like the page you are trying to access does not esist.If you found any issues, feel free to report the problem or go back to the home page. :) </p>
            <div className="btns">
                <NavLink to="/">return home</NavLink>
                <NavLink to="/contact">Contact</NavLink>
            </div>
        </div>
    </section>
    </>
  )
}

export default Error
