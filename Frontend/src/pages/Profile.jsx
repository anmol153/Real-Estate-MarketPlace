import React from 'react'
import { useSelector } from 'react-redux';


const Profile = () => {
  const currentUser = useSelector(state => state.user);
  return (
    <div className='max-w-lg mx-auto p-3'>
      <h1 className='text-3xl font-semibold text-center my-2'>Profile</h1>
      <from className = 'flex flex-col'>
        <img src = {currentUser.currentUser.data.avatar} alt ="profile pic" 
        className='rounded-full h-24 w-24 object-cover cursor-pointer self-center'/>
        <input type = "text" placeholder='username' className='border p-3 rounded-lg' id ="username"/>
        <input type = "text" placeholder='email' className='border p-3 rounded-lg' id = "email"/>
        <input type = "text" placeholder='password' className='border p-3 rounded-lg' id = "password"/>
        <button className='bg-slate-700 text-white rounded-lg p-3 uppercase hover:opacity-95 disabled:80'>Update</button>
      </from>
    </div>
  )
}

export default Profile