import React, { useState,useCallback } from 'react';

const PasswordChange = () => {
  const [userdata, setUserdata] = useState({});
  const [errorMessage, setErrorMessage] = useState('');
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const changeHandler = useCallback((e) => {
    setUserdata((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  }, []);

  const formSubmitHandler = async (e) => {
    e.preventDefault();
    if (userdata.new_Password !== userdata.confirm_Password) {
      setErrorMessage('New Password and Confirm Password do not match');
      return;
    }

    setLoading(true);
    setSuccess(false);
    setErrorMessage('');
    try {
      const res = await fetch('/api/v1/auth/update-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userdata),
      });

      const result = await res.json();
      setLoading(false);

      if (result.success === false) {
        console.log(result.message);
        setErrorMessage(result.message);
        return;
      }

      setSuccess(true);
      setUserdata({});
      setErrorMessage('');
    } catch (err) {
      console.error("Network error:", err);
      setLoading(false);
      setErrorMessage(err.message || 'An error occurred while changing the password');
      setSuccess(false);
    }
  };

  return (
    <form onSubmit={formSubmitHandler} className='p-3 max-w-lg mx-auto flex flex-col gap-4 bg-white shadow-md rounded-lg mt-10'>
      <h1 className='text-3xl font-bold text-center mt-5'>Password Change</h1>
      {success && <span className='text-green-600 text-center'>Password changed successfully</span>}
      {errorMessage && <span className='text-red-500 text-center'>{errorMessage}</span>}
      <input type="password" id='old_Password' placeholder='Old Password' className='bg-white p-3 rounded-lg my-2 border' onChange={changeHandler} />
      <input type="password" id='new_Password' placeholder='New Password' className='bg-white p-3 rounded-lg my-2 border' onChange={changeHandler} />
      <input type="password" id='confirm_Password' placeholder='Confirm New Password' className='bg-white p-3 rounded-lg my-2 border' onChange={changeHandler} />

      <button disabled={loading} type='submit' className='bg-slate-700 p-2 rounded-lg text-slate-100 hover:opacity-95 disabled:opacity-80'>
        {loading ? 'Changing...' : 'Change Password'}
      </button>
    </form>
  );
};

export default PasswordChange;
