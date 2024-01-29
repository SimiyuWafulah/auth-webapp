import React from 'react'
import {GoogleAuthProvider, getAuth, signInWithPopup} from 'firebase/auth'
import { app } from '../firebase'
import { signInSuccess } from '../redux/user/userSlice'
import {useDispatch} from 'react-redux'
import {useNavigate } from 'react-router-dom'

export default function Oauth() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleGoogleClick = async () => {
    try {
      const provider = new GoogleAuthProvider()
      const auth = getAuth(app)
      
      const result = await signInWithPopup(auth, provider);
      const res = await fetch ('http://localhost:3000/api/auth/google', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name: result.user.displayName,
          email: result.user.email,
          photo : result.user.photoURL,
        })
      })
      const data = await res.json();
      dispatch(signInSuccess(data));
      navigate('/')
    } catch (error) {
      console.log('Could not connect with google')
    }
  }

  return (
    <button
    type='button'
    className='bg-red-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-95'
    onClick={handleGoogleClick}
    >
      Continue with google
    </button>
  )
}
