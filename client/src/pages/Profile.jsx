import React, { useState, useEffect } from 'react'
import {useSelector} from 'react-redux'
import { useRef } from 'react'
import {getStorage, ref, uploadBytesResumable } from 'firebase/storage'
import{ app} from '../firebase'

export default function Profile() {
  const fileRef = useRef(null);
  const [image, setImage] = useState(undefined)
  const {currentUser} = useSelector((state) => state.user)
  const [perc, setPerc] = useState(0);
  const [imageError, setImageError] = useState(false)
  useEffect(() => {
    if (image) {
      handleFileUpload(image);
    }
  },[image]);

  const handleFileUpload = async (image) => {
    const storage = getStorage(app);
    const fileName = new Date().getTime() + image.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, image);

    uploadTask.on('state_changed', (snapshott) => {
      const progress = (snapshott.bytesTransferred/snapshott.totalBytes) * 100;
      setPerc(Math.round(progress));
    });
    (error) => {}
  }

  return (
    <div className='p-3 max-w-lg mx-auto'>
      <h1 className='text-3xl font-semibold text-center my-7'>Profile</h1>
      <input onChange={(e) => setImage(e.target.files[0])} type='file' ref={fileRef} hidden accept='image/*'/>
      <form className='flex flex-col gap-4'>
        <img 
        className='h-24 w-24 self-center rounded-full object-cover mt-2'
         src={currentUser.profilePic} 
         alt=''
        onClick={() => fileRef.current.click()}
         />
        <input
        defaultValue={currentUser.username}
          type='text'
          id='username'
          placeholder='username'
          className='bg-slate-100 rounded-lg p-3'
        />
        <input
        defaultValue={currentUser.email}
          type='email'
          id='email'
          placeholder='email'
          className='bg-slate-100 rounded-lg p-3'
        />
        <input
          type='password'
          id='password'
          placeholder='password'
          className='bg-slate-100 rounded-lg p-3'
        />
        <button className='bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80'>Update</button>
      </form>
      <div className='flex justify-between mt-5'>
        <span className='text-red-700 cursor-pointer'>Delete</span>
        <span className='text-red-700 cursor-pointer'>Sign Out</span>
      </div>
    </div>
  )
}
