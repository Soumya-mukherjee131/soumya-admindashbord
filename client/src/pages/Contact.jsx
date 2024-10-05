import React, { useState } from 'react';
import { useAuth } from '../store/auth';
import {toast} from 'react-toastify';

const defaultContactFormData = {
  username: "",
  email:"",
  message:"",
};

const Contact = () => {
  const [formData, setFormData] = useState(defaultContactFormData);

  const [userData, setUserData] = useState(true);
  const {user} =useAuth();


  if(userData && user){
    setFormData({
      username: user.username,
      email:user.email,
      message:"",
    });

    setUserData(false);
  }

  const handleInput = (e) => {
    const { name, value } = e.target;
    setFormData({
       ...formData, 
       [name]: value 
      });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // console.log('Form Data:', formData);

    try{
      //https://localhost:5000/api/form/contact
      const response = await fetch("https://soumya-admindashbord-backend.onrender.com",
        {
          method:"POST",
          headers:{
            'Content-Type':"application/json",
          },
          body:JSON.stringify(formData),
        }
      );
      if(response.ok){
        setFormData(defaultContactFormData);
        const data = await response.json();
        console.log(data);
        toast.success('Message send succefully');
      }
      else{
        toast.error("Failed to send the message")
      }

    } catch(error){
      console.error(error);
    }
  };

  return (
    <>
      <section className="contact-section">
        <div className="contact-container">
          <div className="animated-image">
            <img src="https://placehold.co/400x400/orange/white" alt="contact" />
          </div>
          <div className="form-container">
            <h1 className="contact-heading">Get in Touch</h1>
            <p className="contact-subheading">We would love to hear from you! Fill out the form below and we'll get back to you as soon as possible.</p>

            <form className="contact-form" onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="username">Name</label>
                <input
                  type="text"
                  id="name"
                  name="username"
                  placeholder="Your name"
                  required
                  value={formData.username}
                  onChange={handleInput}
                />
              </div>
              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  placeholder="Your email"
                  required
                  value={formData.email}
                  onChange={handleInput}
                />
              </div>
              <div className="form-group">
                <label htmlFor="message">Message</label>
                <textarea
                  id="message"
                  name="message"
                  placeholder="Your message"
                  required
                  value={formData.message}
                  onChange={handleInput}
                />
              </div>
              <button type="submit" className="btn btn-submit">Send Message</button>
            </form>
          </div>
        </div>
      </section>
    </>
  );
};

export default Contact;
