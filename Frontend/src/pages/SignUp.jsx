import React, { useCallback } from 'react'
import { Link } from 'react-router-dom'
import { useState} from 'react'
import { useNavigate } from 'react-router-dom'
import Oauth from '../Components/Oauth'
const SignUp = () => {
  const navigate = useNavigate();
  const [data, setData] = useState({});
  const [error,setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const submitHandler = async (e) => {
      e.preventDefault();
      setLoading(true);
      const res = await fetch('/api/v1/auth/sign-up', 
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data),
        }
      );
      const result = await res.json();
      console.log(result.success);
      if(result.success === false) {
        setError(result.message);
        setLoading(false);
        return;
      }
      setLoading(false);
      navigate('/sign-in');
      console.log("result ", result);
  };

  const changeHandler = useCallback((e) => {
    setData((prev) => ({...prev, [e.target.id]: e.target.value}));
  }, [])
  console.log(data);
  return (
    <div className='p-3 max-w-lg mx-auto'>
      <h1 className='text-3xl text-center font-semibold my-7'>Sign Up</h1>
        <form onSubmit={submitHandler} className='flex flex-col gap-4'>
          <input type="text" placeholder='fullname' className = "bg-white p-3 rounded-lg" id ="fullname" onChange={changeHandler} />
          <input type="text" placeholder='username' className = "bg-white p-3 rounded-lg" id ="username" onChange={changeHandler}/>
          <input type="email" placeholder='email' className = "bg-white p-3 rounded-lg" id ="email"  onChange={changeHandler} />
          <input type="password" placeholder='password' className = "bg-white p-3 rounded-lg" id ="password" onChange={changeHandler}/>
          <button disabled={loading} type='submit' className='bg-slate-700 p-2 rounded-lg text-slate-100 hover:opacity-95 disabled:opacity-80'>{loading ? 'Loading...' : 'Sign Up'}</button>
          <Oauth/>
        </form>
        <div className='flex flex-col'>
        <div className='flex justify-center items-center gap-2 my-4'>
          <p>Have an Account?</p>
          <Link to="/sign-in" className='text-slate-700 font-semibold underline'>Sign In</Link>
          </div>
          {error && <p className='text-red-500 text-lg text-center mt-2'>{error}</p>}
        </div>
    </div>
  )
}

export default SignUp