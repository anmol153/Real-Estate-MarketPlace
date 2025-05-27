import { signInSuccess } from  '../../redux/user';
import React, { useState,useCallback } from 'react';
import { useSelector,useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';

const Profile = () => {


  const dispatch = useDispatch();
  const [userData, setUserData] = useState({});
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const currentUser = useSelector(state => state.user.currentUser);
  const ChangeHandler = useCallback((e) => {
      setUserData((prev) => ({...prev, [e.target.id]: e.target.value}));
    }, []);

 
  const formSubmitHandler = async (e) => {
    e.preventDefault();
    setMessage("");
    setLoading(true);
    try {
      console.log(userData);
      const res = await fetch('/api/v1/auth/update', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });
      const result = await res.json();
      setLoading(false);
      if (result.success === false) {
        console.log(result.message);
        return;
      }
      setMessage("Profile updated successfully");
      dispatch(signInSuccess({
        ...currentUser,
        data: {
          ...currentUser.data,
          ...result.data
        }
      }));

    } catch (error) {
      console.log("Error updating profile", error);
    }
  };

  return (
    <div className='max-w-lg mx-auto p-5 bg-white shadow-md rounded-lg mt-10'>
      <h1 className='text-3xl font-semibold text-center my-2'>Profile</h1>
      {message && <p className='text-green-500 text-center'>{message}</p>}
      <form onSubmit={formSubmitHandler} className='flex flex-col m-5 gap-4'>
        <img
          src={currentUser?.data?.avatar}
          alt="profile pic"
          className='rounded-full h-24 w-24 object-cover cursor-pointer self-center'
        />
        <input
          type="text"
          placeholder='fullname'
          className='border-1 active:border-2 p-3 rounded-lg'
          id="fullname"
          onChange={ChangeHandler}
        />
        <input
          type="text"
          placeholder='email'
          className='border-1 active:border-2 p-3 rounded-lg'
          id="email"
          onChange={ChangeHandler}
        />
        <input
          type="text"
          placeholder='enter avatar_url'
          className='border-1 active:border-2 p-3 rounded-lg'
          id="avatar"
          onChange={ChangeHandler}
        />
        <button disabled={loading} type='submit' className='bg-slate-700 p-2 rounded-lg text-slate-100 hover:opacity-95 disabled:opacity-80'>{loading ? 'Updating...' : 'Update'}</button>
        <Link to="/password-change" className='text-slate-700 font-semibold underline text-center'>
          Change Password
        </Link>
      </form>
    </div>
  );
};

export default Profile;
