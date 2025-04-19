import React from 'react'
import { Link } from 'react-router-dom'
const SignUp = () => {
  const submitHandler = (e) => {};

  return (
    <div className='p-3 max-w-lg mx-auto'>
      <h1 className='text-3xl text-center font-semibold my-7'>Sign Up</h1>
        <form onSubmit={submitHandler} className='flex flex-col gap-4'>
          <input type="text" placeholder='fullname' className = "bg-white p-3 rounded-lg" id ="fullname" />
          <input type="text" placeholder='username' className = "bg-white p-3 rounded-lg" id ="username" />
          <input type="email" placeholder='email' className = "bg-white p-3 rounded-lg" id ="email" />
          <input type="password" placeholder='password' className = "bg-white p-3 rounded-lg" id ="password" />
          <button type='submit' className='bg-slate-700 p-2 rounded-lg text-slate-100 hover:opacity-95 disabled:opacity-80'>Sign Up</button>
        </form>
        <div className='flex justify-center items-center gap-2 my-4'>
          <p>Have an Account?</p>
          <Link to="/sign-in" className='text-slate-700 font-semibold underline'>Sign In</Link>
        </div>
    </div>
  )
}

export default SignUp