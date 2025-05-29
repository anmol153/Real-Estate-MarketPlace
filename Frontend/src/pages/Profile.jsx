import { signInSuccess,signInFailure,signOut } from  '../../redux/user';
import React, { useState,useCallback,useEffect } from 'react';
import { useSelector,useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useRef } from 'react';
import { set } from 'mongoose';
const Profile = () => {

  const Navigate =  useNavigate();
  const dispatch = useDispatch();
  const [userData, setUserData] = useState({});
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const imgref = useRef(null);
  const [file, setFile] = useState(null);
  const currentUser = useSelector(state => state.user.currentUser);
  const ChangeHandler = useCallback((e) => {
      setUserData((prev) => ({...prev, [e.target.id]: e.target.value}));
    }, []);

  useEffect(() => {
    const uploadFile = async () => {
      if (!file) return;
      const formData = new FormData();
      formData.append('avatar', file);
      try {
        const res = await fetch('/api/v1/auth/upload-avatar', {
          method: 'POST',
          body: formData,
        });
        const result = await res.json();
        console.log("result " ,result);
        if (result.success) {
          setMessage("Avatar uploaded successfully");
          setFile(null); 
          console.log("currentUser ", currentUser);
          dispatch(signInSuccess({
            ...currentUser,
              avatar: result.data.avatar
          }));
        } else {
          console.log(result.message);
        }
      } catch (error) {
        console.log("Error uploading file", error);
      }
    };
    uploadFile();
  }, [file]);

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
        setMessage(result.message || "Something went wrong");
        return;
      }
      setMessage("Profile updated successfully");
      dispatch(signInSuccess({
          ...currentUser.data,
          ...result.data
        
      }));
      console.log("Profile updated successfully", currentUser);

    } catch (error) {
      console.log("Error updating profile", error);
    }
  };


  const signOutHandler = async () => {
  try {
    const res = await fetch('/api/v1/auth/sign-out', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include', 
    });

    const result = await res.json();

    if (result.success) {
      dispatch(signOut());
      alert("Signed out successfully");
      Navigate("/");
    } else {
      console.log(result.message);
      setMessage(result.message || "Something went wrong");
    }
  } catch (error) {
    console.log("Error signing out", error);
    setMessage(error.message);
  }
};


  const DeleteAccountHandler = async () => {
    try {
      const res = await fetch('/api/v1/auth/delete-account', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const result = await res.json();
      if (result.success) {
        dispatch(signOut());
        alert("Account Delete SuccessFully");
        Navigate("/");
      } else {
        console.log(result.message);
        setMessage(result.message);
      }
    } catch (error) {
      console.log("Error in Delete ACcount", error);
      setMessage(result.message);
    }
  };

  return (
    <div className='max-w-xl mx-auto  bg-gray-100 min-h-screen'>
    <div className='max-w-xl mx-auto p-5 bg-white shadow-md rounded-lg mt-10'>
      <h1 className='text-3xl font-semibold text-center my-2'>Profile</h1>
      {message && <p className='text-green-500 text-center'>{message}</p>}
      <form onSubmit={formSubmitHandler} className='flex flex-col m-5 gap-4'>
        <div className='flex flex-col sm:flex-row  items-center gap-4 mx-8'>
        <img
          src={currentUser.avatar}
          alt="profile pic"
          className='rounded-full h-24 w-24 object-cover cursor-pointer self-center'
          onClick={() => imgref.current.click()}
        />
          <div className='sm:ml-auto  text-center'>
              <h5 className='text-md font-semibold'>Profile Details</h5>
              <h5 >Full Name : {currentUser.fullname}</h5>
              <h5 >Username : {currentUser.username}</h5> 
              <h5 >Email : {currentUser.email}</h5> 
          </div>
        </div>
        <input
          type="text"
          placeholder='fullName'
          className='border-1 active:border-2 p-3 rounded-lg'
          id="fullName"
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
          placeholder='username'
          className='border-1 active:border-2 p-3 rounded-lg'
          id="username"
          onChange={ChangeHandler}
        />
        <button disabled={loading} type='submit' className='bg-slate-700 p-2 rounded-lg text-slate-100 hover:opacity-95 disabled:opacity-80'>{loading ? 'Updating...' : 'Update'}</button>
        <Link to="/create-listing" className='bg-green-600 p-2 rounded-lg text-center text-slate-100 hover:opacity-95 disabled:opacity-80'>
          Create Listing
        </Link>
        <Link to="/password-change" className='text-slate-700 font-semibold underline text-center'>
          Change Password
        </Link>
      </form>
      </div>
      <div className='flex flex-row justify-between items-center mt-1'>
        <div className='text-center'>
          <button className='bg-red-500 p-2 rounded-lg text-white hover:opacity-95' onClick={DeleteAccountHandler}> 
            Delete Account
          </button>
        </div>
        <div className='text-center mt-5'>
          <button className='bg-red-500 p-2 rounded-lg text-white hover:opacity-95' onClick={signOutHandler}>
            Sign Out
          </button>
        </div>
      </div>
      <input type="file" accept="image/*" onChange={(e) => setFile(e.target.files[0])}  ref={imgref} hidden />
      </div>

  );
};

export default Profile;
