import React, {useState} from 'react'
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../store/auth';
import {toast} from 'react-toastify';

const Login = () => {

  const[user, setUser] = useState({
    email:"",
    password:"",
  });

  const navigate = useNavigate();
  const {storeTokenInLs, API} = useAuth();

  const URL = `${API}/api/auth/login`

  const handleInput=(e)=>{
    let name = e.target.name;
    let value = e.target.value;

    setUser({
      ...user,
      [name]:value,
    });
  };


  const handleSubmit= async (e)=>{
    e.preventDefault();
    // console.log(user);

    try{
      const response = await fetch(URL, {
        method:"POST",
        headers:{
          'Content-Type':'application/json',
        },
        body:JSON.stringify(user),
      });

      console.log("login form", response);
      
      const res_data = await response.json();
      if(response.ok){
        toast.success("Login successful redirected to homepage!");
      console.log("res from data", res_data);
      //store the token in the local storage
      storeTokenInLs(res_data.token);
      // localStorage.setItem("token", res_data.token);

        setUser({
          email:"",
          password:"",
        });
        navigate("/");
      }else{
        toast.error(res_data.extraDetails ? res_data.extraDetails: res_data.message);
        console.log("Invalid credentials");
      }
    }
    catch(error){
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
                <img src="https://placehold.co/400X300" alt="reg-img" />
              </div>
              <div className="register-form">
                  <h1 className='main-heading mb-3'>Login here!</h1>
                  <br />
                  <form onSubmit={handleSubmit}>                 
                    <div>
                      <label htmlFor="email">email</label>
                      <input type="email" name="email" placeholder='Enter your email' id='email' required autoComplete='off' value={user.email} onChange={handleInput}/>
                    </div>
                    <div>
                      <label htmlFor="password">password</label>
                      <input type="password" name="password" placeholder='Enter your password' id='password' required autoComplete='off' value={user.password} onChange={handleInput}/>
                    </div>
                    <br />
                    <button type='submit' className='btn btn-submit'>Login</button>
                  </form>
              </div>
            </div>
          </div>
        </main>
      </section>
    </>
  )
}

export default Login
