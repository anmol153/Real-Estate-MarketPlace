import React from 'react'
import { useSelector } from 'react-redux';
import {useState} from 'react';
import { useEffect } from 'react';
import { ChangeStream } from 'mongodb';

const Profile = () => {
  const currentUser = useSelector(state => state.user);
  const [userData, setUserData] = useState({
  });
  const ChangeHandler = (e) => {
    setUserData(prev=>({...prev, [e.target.id]: e.target.value}));
  }
  const formSubmitHandler = async(e) => {
    e.preventDefault();
    try{
      const res = await fetch('/api/v1/auth/update', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });
      const result = await res.json();
      if(result.success === false) {
        console.log(result.message);
        return;
      }
      console.log("Profile updated successfully", result);
    }
    catch (error) {
    console.log("Error updating profile", error);
  }
  return (
    <div className='max-w-lg mx-auto p-5 bg-white shadow-md rounded-lg mt-10'>
      <h1 className='text-3xl font-semibold text-center my-2'>Profile</h1>
      <form onSubmit={formSubmitHandler} className = 'flex flex-col m-5 gap-4'>
        <img src = {currentUser.currentUser.data.avatar} alt ="profile pic " onChange={ChangeHandler} 
        className='rounded-full h-24 w-24 object-cover cursor-pointer self-center'/>
        <input 
        type = "text" placeholder='username' className='border p-3 rounded-lg' id ="username" onChange={ChangeHandler} />
        <input type = "text" placeholder='email' className='border p-3 rounded-lg' id = "email" onChange={ChangeHandler} />
        <input type = "text" placeholder='enter avatar_url' className='border p-3 rounded-lg' id = "avatar" onChange={ChangeHandler} />
        <button className='bg-slate-700 text-white rounded-lg p-3 uppercase hover:opacity-95 disabled:80'>Update</button>
        <PasswordChange/>
      </form>
    </div>
  )
}
}
export default Profile;