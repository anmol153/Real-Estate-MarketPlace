import React, { useCallback } from 'react'
import { Link } from 'react-router-dom'
import { useState} from 'react'
import { useNavigate } from 'react-router-dom'
import {useDispatch, useSelector} from 'react-redux'
import { signInStart,signInFailure,signInSuccess } from '../../redux/user.jsx'


const SignIn = () => {
  const dispatch = useDispatch();

  const navigate = useNavigate();
  const [data, setData] = useState({});
  const {loading,error} = useSelector((state) =>state.user);
  const submitHandler = async (e) => {
      try {
        e.preventDefault();
        dispatch(signInStart());
        const res = await fetch('/api/v1/auth/sign-in', 
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
          }
        );
        const result = await res.json();
        if(result.success === false) {
          dispatch(signInFailure(result.message));
          return;
        }
        dispatch(signInSuccess(data));
        navigate('/');
        console.log("result ", result);
      } catch (error) {
        dispatch(signInFailure(error.message))
      }
    }
  const changeHandler = useCallback((e) => {
    setData((prev) => ({...prev, [e.target.id]: e.target.value}));
  }, [])
  console.log(data);
  return (
    <div className='p-3 max-w-lg mx-auto'>
      <h1 className='text-3xl text-center font-semibold my-7'>Sign In</h1> {/* Updated heading */}
        <form onSubmit={submitHandler} className='flex flex-col gap-4'>
          <input type="email" placeholder='email' className = "bg-white p-3 rounded-lg" id ="email"  onChange={changeHandler} />
          <input type="password" placeholder='password' className = "bg-white p-3 rounded-lg" id ="password" onChange={changeHandler}/>
          <button disabled={loading} type='submit' className='bg-slate-700 p-2 rounded-lg text-slate-100 hover:opacity-95 disabled:opacity-80'>{loading ? 'Loading...' : 'Sign Up'}</button>
        </form>
        <div className='flex flex-col'>
        <div className='flex justify-center items-center gap-2 my-4'>
          <p>Don't Have an Account?</p>
          <Link to="/sign-up" className='text-slate-700 font-semibold underline'>Sign Up</Link>
          </div>
          {error && <p className='text-red-500 text-lg text-center mt-2'>{error}</p>}
        </div>
    </div>
  )
}

export default SignIn;