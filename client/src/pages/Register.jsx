import React, { useState } from 'react'
import {useNavigate} from 'react-router-dom';
import { useAuth } from '../store/auth';
import {toast} from 'react-toastify';

const Register = () => {
  
  const [user, setUser] = useState({
    username:"",
    email:"",
    phone:"",
    password:"",
  });

  const navigate = useNavigate();
  const {storeTokenInLs} = useAuth()


  const handleInput = (e)=>{
    let name = e.target.name;
    let value = e.target.value;

    setUser({
      ...user,
      [name]:value,
     })
  }


const handleSubmit = async (e)=>{
  e.preventDefault();
  // console.log(user);
  
  try{
    const response = await fetch("http://localhost:5000/api/auth/register", {
      method:"POST",
      headers:{
        'Content-Type':'application/json',
      },
      body:JSON.stringify(user),
    });
    const res_data = await response.json();
    console.log("res grom data", res_data.extraDetails);
    if(response.ok){
      toast.success("Registration successgul redirecting to home page")
      //store the token in the local storage
      storeTokenInLs(res_data.token); // built in fuction
      // localStorage.setItem("token", res_data.token); //both works same
      setUser({
        username:"",
        email:"",
        phone:"",
        password:"",
      });
      navigate("/");
    }else{
      toast.error(res_data.extraDetails ? res_data.extraDetails: res_data.message)
    }
    console.log(response);
  }
  
  catch(error){
    toast.error("Missing reuired credentials")
    console.log("register", error);
  }

};

  return (
    <>
      <section>
        <main>
          <div className="section-registration">
            <div className="reg-container grid grid-two-cols">
              <div className="registration-image"> 
                <img src="https://placehold.co/350X300" alt="reg-img" />
              </div>
              <div className="register-form">
                  <h1 className='main-heading mb-3'>Registration Form</h1>
                  <br />
                  <form onSubmit={handleSubmit}>
                    <div>
                      <label htmlFor="username">Username</label>
                      <input type="text" name="username" placeholder='Name here' id='username' required autoComplete='off' value={user.username} onChange={handleInput}/>
                    </div>
                    <div>
                      <label htmlFor="email">email</label>
                      <input type="email" name="email" placeholder='Enter your email' id='email' required autoComplete='off' value={user.email} onChange={handleInput}/>
                    </div>
                    <div>
                      <label htmlFor="phone">phone</label>
                      <input type="number" name="phone" placeholder='Enter your phone number' id='phone' required autoComplete='off' value={user.phone} onChange={handleInput}/>
                    </div>
                    <div>
                      <label htmlFor="password">password</label>
                      <input type="password" name="password" placeholder='Enter your password' id='password' required autoComplete='off' value={user.password} onChange={handleInput}/>
                    </div>
                    <br />
                    <button type='submit' className='btn btn-submit'>Register now</button>
                  </form>
              </div>
            </div>
          </div>
        </main>
      </section>
    </>
  )
}

export default Register
