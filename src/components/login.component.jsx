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
  setBodyColor({imageUrl: "https://cdn.pixabay.com/photo/2016/06/02/02/33/triangles-1430105_1280.png"})


  return (

      <motion.div initial={{opacity:0}}
      animate={{opacity:1}}
      exit={{opacity:0}}
      >
        <div className='login-page'>
          <form id="loginform" onSubmit={handleSubmit(handleValidSubmit)}>
      <h2 id="headerTitle">Login</h2>
            <div className="row">
              <label htmlFor="inputEmail" >Email address</label>
              <input type="email"  id="inputEmail" placeholder='Enter your email' {...register('email')} />
              <div className="form-text text-danger">
                {errors.email && <p>{errors.email.message}</p>}
              </div>
            </div>
            <div className="row">
              <label htmlFor="inputPassword" >Password</label>
              <input type="password"  id="inputPassword" placeholder='Enter your password' {...register('password')} />
              <div className="form-text text-danger">
                {errors.password && <p>{errors.password.message}</p>}
              </div>
            </div>
            <div id="button" className="row">

            <button  type="submit" disabled={isSubmitted || !isDirty || !isValid} >Submit</button>
            </div>
            <div id="alternativeLogin">
   
    <div id="iconGroup">
    <a href="/register"><label>Or sign up here</label></a>
    </div>
  </div>
          </form>
        </div>
      </motion.div>
    
  );
};

export default LoginComponent;
