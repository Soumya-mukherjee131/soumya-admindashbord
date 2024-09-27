import React from 'react'
import {useAuth} from '../store/auth';
const Home = () => {

  const {user} =useAuth();

  return (
    <>
      <div className="section-hero">
        <div className="home-container grid grid-two-cols">
          <div className="hero-content">
            <h1>Welcome! {user ? `${user.username} to our website` : `to our website`}</h1>
            <p className="intro-paragraph">This is an example paragraph</p>
            <p>
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Cumque corporis quidem dolorum consequatur odio sed explicabo fugit ad aliquid repellendus. Eligendi ut eum nemo porro sapiente, magni animi cumque expedita?
            </p>
            <div className="btn-group"> 
              <a href="/contact">
                <button className='btn connect-btn'>Connect Now</button>
              </a>
              <a href="/dashboard">
                <button className='btn dashboard-btn'>Dashboard</button>
              </a>
            </div>
          </div>

          <div className="hero-image">
            <img src="https://placehold.co/400x300/orange/white" alt="Hero" />
          </div>
        </div>
      </div>

      <section className="section-analytics">
      <div className="sec-container grid grid-four-cols">
        <div className="box">
          <h2>1</h2>
          <p>Project structure</p>
        </div>
        <div className="box">
          <h2>2</h2>
          <p>Database connection</p>
        </div>
        <div className="box">
          <h2>3</h2>
          <p>Frontend development</p>
        </div>
        <div className="box">
          <h2>4</h2>
          <p>Backend development</p>
        </div>
      </div>  
    </section>

    <div className="section-hero">
        <div className="home-container grid grid-two-cols">
        <div className="hero-image">
            <img src="https://placehold.co/400x300/orange/white" alt="Hero" />
          </div>
          <div className="hero-content">
            <h1>Lets connect!</h1>
            <p className="intro-paragraph">This is an example paragraph</p>
            <p>
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Cumque corporis quidem dolorum consequatur odio sed explicabo fugit ad aliquid repellendus. Eligendi ut eum nemo porro sapiente, magni animi cumque expedita?
            </p>
          </div>
        </div>
      </div>

    </>
  )
}

export default Home
