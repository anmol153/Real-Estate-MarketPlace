import { signInSuccess,signInFailure,signOut } from  '../../redux/user';
import React, { useState,useCallback,useEffect } from 'react';
import { useSelector,useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useRef } from 'react';
const Profile = () => {

  const Navigate =  useNavigate();
  const dispatch = useDispatch();
  const [userData, setUserData] = useState({});
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const imgref = useRef(null);
  const [file, setFile] = useState(null);
  const currentUser = useSelector(state => state.user.currentUser);
  const [listings,setListing] = useState(false);
  const [list,setlist] = useState(null); 
  const [listmess , setlistme] = useState(false);
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

const DeleteHandler = async (item) => {
  setLoading(true);
  try {
    const res = await fetch(`/api/v1/listings/delete`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ listingId: item._id }), 
    });

    const data = await res.json();
    setLoading(false);
    if (data.success) {
      setlist((prev) => prev.filter((i) => i._id !== item._id));
      alert("Listing deleted successfully");
    } else {
      alert(data.message || "Failed to delete listing");
    }
  } catch (error) {
    console.error("Error deleting listing", error);
    alert("Something went wrong");
  }
};



  useEffect(async()=>{
    try {
      const listings = await fetch(`/api/v1/user/listing/${currentUser._id}`);
      const data = await listings.json();

      if(data.success == true)
      {
        setlistme("Listings are Fetched Successfully");
        setlist(data.data);
        console.log(data.data);
      }
      else{
        setlistme("Listings are not Fetched Successfully")
      }
    } catch (error) {
      console.log("error ",error.message);
      setlistme(error.message);
    }
  },[]);
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
      {listings && <p className='text-green-500 text-center'>{listmess}</p>}
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
        <div className='text-center '>
          <button className='bg-red-500 p-2 rounded-lg text-white hover:opacity-95' onClick={signOutHandler}>
            Sign Out
          </button>
        </div>
      </div>
      <input type="file" accept="image/*" onChange={(e) => setFile(e.target.files[0])}  ref={imgref} hidden />
      <button className='w-full text-center text-green-400 cursor-pointer' onClick={()=>setListing((prev)=>!prev)} >Show Listings</button>
      {listings && list && list.length > 0 && (
        <div className='flex flex-col gap-4 '>
          <h1 className='text-center mt-7 text-2xl font-semibold'>
            Your Listings
          </h1>
          {list.map((listing) => (
            <div
              key={listing._id}
              className='border rounded-lg p-3 flex justify-between items-center gap-4 ' 
            >
              <Link to={`/listing/${listing._id}`}>
                <img
                  src={listing.imageUrls[0]}
                  alt='listing cover'
                  className='h-16 w-16 object-contain'
                />
              </Link>
              <Link
                className='text-slate-700 font-semibold  hover:underline truncate flex-1'
                to={`/listing/${listing._id}`}
              >
                <p>{listing.name}</p>
              </Link>

              <div className='flex flex-col item-center justify-center'>
                <button
                  onClick={() => DeleteHandler(listing)}
                  className='bg-red-500  rounded-lg p-1 text-sm text-white'
                >
                  Delete
                </button>
                <Link to={`/update-listing/${listing}`}>
                  <button className={`w-full text-white  rounded-lg p-1 text-sm bg-green-400`}>Edit</button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
      </div>

  );
};

export default Profile;
