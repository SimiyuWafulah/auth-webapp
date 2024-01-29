import React from 'react'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'

export default function Header() {
    const {currentUser} = useSelector((state) => state.user)
  return (
   <header className='bg-slate-200 shadow-md'>
    <div className='flex justify-between items-center max-w-6xl p-3 mx-auto'>
    <Link to= '/'>
        <h1 className='text-sm sm:text-xl font-bold flex flex-wrap'>
            <span className='text-slate-500'>Auth</span>
            <span className='text-slate-700'>-Webapp</span>
        </h1>
    </Link>
        <ul className='flex gap-4'>
        <Link to = '/'>
        <li className='hidden sm:inline-block hover:underline'>Home</li>
        </Link>
        <Link to='/about'>
        <li className='hidden sm:inline-block hover:underline'>About</li>
        </Link>
        <Link to='/profile'>
       {currentUser ? (
        <img className='h-7 w-7 rounded-full object-cover' src={currentUser.profilePic} alt=""/>
       ) : (
        <li className='sm:inline-block hover:underline'>Sign In</li>
       )}
        </Link>
        </ul>
    </div>
   </header>
  )
}
