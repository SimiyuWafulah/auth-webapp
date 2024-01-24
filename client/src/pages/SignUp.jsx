import React from 'react'
import {Link} from 'react-router-dom'

export default function SignUp() {
  return (
   <div className='p-3 max-w-lg mx-auto'>
    <h1 className='text-3xl font-bold text-center my-7'>Sign Up</h1>
    <form className='flex flex-col p-3 gap-4'>
      <input
        type='text'
        placeholder='username'
        id='username'
        className='border p-3 rounded-lg'
      />
      <input
        type='email'
        placeholder='email'
        id='email'
        className='border p-3 rounded-lg'
      />
      <input
        type='password'
        placeholder='password'
        id='password'
        className='border p-3 rounded-lg'
      />
      <button className='bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80'>Sign Up</button>
    </form>
    <div className='flex gap-2 mt-5'>
      <p>Already Have an Account?</p>
      <Link to ='/signin'>
        <span className='text-blue-700'>Sign In</span>
      </Link>
    </div>
   </div>
  )
}