import React, { useState } from 'react'
import {Link, useNavigate} from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
import { signInStart, signInSuccess, signInFailure } from '../redux/user/userSlice';
import {useDispatch, useSelector } from 'react-redux';
import Oauth from '../components/Oauth';

export default function SignIn() {
  const [formData, setFormData] = useState({});
  const {loading, error} = useSelector((state) => state.user);
  const navigate = useNavigate()
  const dispatch = useDispatch();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id] : e.target.value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(signInStart());
      const res = await fetch ('/api/auth/signin', {
        method: 'POST',
        mode: 'cors',
        credentials: 'include',
        headers: {
          'Content-Type' : 'application/json'
        },
        body: JSON.stringify(formData)
      });
      const data = await res.json();
      if(!res.ok || data.success ===false) {
        dispatch(signInFailure(data.message))
        toast.error(data.message);
        return
      }

      dispatch(signInSuccess(data));
      navigate('/')
      toast.success('Sign in successful');
    } catch (error) {
      dispatch(signInFailure(error.message))
      toast.error(error.message)
    }
  }
  return (
   <div className='p-3 max-w-lg mx-auto'>
    <h1 className='text-3xl font-bold text-center my-7'>Sign In</h1>
    <form  onSubmit={handleSubmit} className='flex flex-col p-3 gap-4'>
      <input
        type='email'
        placeholder='email'
        id='email'
        className='border p-3 rounded-lg'
        onChange = {handleChange}
        required
      />
      <input
        type='password'
        placeholder='password'
        id='password'
        className='border p-3 rounded-lg'
        onChange = {handleChange}
        required
      />
      <button 
      disabled ={loading}
      className='bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80'
      >
     {loading ? 'Loading...' : 'Sign In'}
      </button>
      <Oauth/>
    </form>
    <div className='flex gap-2 mt-5
    onChange = {handleChange}'>
      <p>Dont Have an Account?</p>
      <Link to ='/signup'>
        <span className='text-blue-700'>Sign Up</span>
      </Link>
    </div>
    <ToastContainer/>
   </div>
  )
}

