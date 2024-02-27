import '../styles/login.css';
import React, { useState } from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import * as Yup from 'yup';
import authService from '../services/auth.service';
import {motion} from "framer-motion";

import setBodyColor from '../funcs/setBodyColor';
// ... (your imports)

const LoginComponent = () => {
 

  const navigate = useNavigate();
  const [isSubmitted, setIsSubmitted] = useState(false);

  const schema = Yup.object().shape({
    email: Yup.string().email().required(),
    password: Yup.string().required()
  });

  const { register, handleSubmit, formState: { errors, isDirty, isValid } } = useForm({
    mode: 'all',
    resolver: yupResolver(schema)
  });

  const handleValidSubmit = async (data) => {
    setIsSubmitted(true);
    try {
      const result = await authService.login(data);
      if (result.data) {
        

        navigate('/profile');
      }
    } catch (error) {
      toast.error(error);
    }
    setIsSubmitted(false);
  };
 
    setBodyColor({ imageUrl: 'https://media.istockphoto.com/id/1319844646/vector/grey-cement-texture-of-floor-vector-3d-backdrop-of-gray-concrete-wall-room-surface-with.jpg?s=612x612&w=0&k=20&c=JTiP-TB-iz797sgwZMkjDFzPGr4H86NrnJbvyczoOi8=' });
  
  return (

      <motion.div initial={{opacity:0}}
      animate={{opacity:1}}
      exit={{opacity:0}}
      >
        <div className='login-page' >
          <form id="loginform" onSubmit={handleSubmit(handleValidSubmit)}style={{ 
      backgroundImage: `url("https://img.freepik.com/premium-vector/futuristic-technology-background_41981-444.jpg")` 
    }}>
          <center><img src="logo.png" className='logo_login'  alt="logo" />
          </center>     
            <div className="row"  >
      <h6 id="headerTitle"></h6>
              <label htmlFor="inputEmail" style={{color:"black"}} >Email address</label>
              <input type="email"  id="inputEmail" placeholder='Enter your email' {...register('email')} style={{margin:"0px"}} />
              <div className="form-text text-danger"  >
        {errors.email && <p style={{marginLeft:"30px"}}>{errors.email.message}</p>}
              </div>
            </div>
            <div className="row">
              <label htmlFor="inputPassword" style={{color:"black",fontStyle:"normal"}}>Password</label>
              <input type="password"  id="inputPassword" placeholder='Enter your password' {...register('password')}  style={{margin:"0px"}} />
              <div className="form-text text-danger">
                {errors.password && <p style={{marginLeft:"30px"}}>{errors.password.message}</p>}
              </div>
            </div>
            <div id="button" className="row">

            <button  type="submit" disabled={isSubmitted || !isDirty || !isValid} >Submit</button>
            </div>
            <div id="alternativeLogin">
   
    <div id="iconGroup">
    {/* <a href="/register"><label>Or sign up here</label></a> */}
    </div>
  </div>
          </form>
        </div>
      </motion.div>
    
  );
};

export default LoginComponent;
