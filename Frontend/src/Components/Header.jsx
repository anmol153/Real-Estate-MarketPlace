import React, { useEffect } from 'react'
import { Link,useNavigate } from 'react-router-dom'
import { FaSearch, FaWindows } from 'react-icons/fa';
import { useSelector } from 'react-redux';
import { useState } from 'react';

const Header = () => {
  const currentUser = useSelector((state) => state.user);
  const [searchTerm,setSearchTerm] = useState('');
  const navigate = useNavigate();


  const sumbitHandler = ((e)=>{
    e.preventDefault();
    const urlParams = new URLSearchParams(window.location.search);
    urlParams.set('searchTerm', searchTerm);
    const searchQuery = urlParams.toString();
    navigate(`/search?${searchQuery}`);
  });

  useEffect(()=>{
    const urlParams = new URLSearchParams(location.search);
    const search = urlParams.get('searchTerm');
    if(search) setSearchTerm(search);
  },[location.search]);

  
  return (
    <header className='bg-slate-200 shadow-md'>
        <div className='flex justify-between item-center  p-3' >
            <Link to="/" className='flex items-center gap-2'>
                <h1 className="font-bold text-sm sm:text-xl flex flex-wrap ">
                  <span className='text-slate-500 '>Sehand</span>
                  <span className='text-slate-700 '>Estate</span>
                </h1>
            </Link>
            <div className='flex justify-between gap-6'>
                  <form onSubmit={sumbitHandler} className='bg-slate-100 p-3 rounded-lg flex items-center'> 
                      <input type = "text" placeholder='Search...' className='bg-transparent focus:outline-none w-25 sm:w-65'
                      onChange={(e)=> setSearchTerm(e.target.value)}
                      value={searchTerm} />
                      <button><FaSearch className='text-slate-600'/></button>
                  </form>
                  <ul className='flex gap-6  text-sm'>
                      <Link to="/"        className='my-auto hidden sm:inline hover:scale-110'>Home</Link>
                        <Link to="/about"     className='my-auto hidden sm:inline hover:scale-110'>About</Link>
                        {/* {console.log(currentUser.currentUser.avatar)} */}
                        {currentUser && currentUser.currentUser ? <Link to="/profile"><img src ={currentUser.currentUser.avatar} className ="rounded-full h-7 w-7 object-cover my-3"alt ="profile" /> 
                      </Link> : <Link to="/sign-up"   className='my-auto sm:inline hover:scale-110'>Sign In</Link>}
                  </ul>
            </div>
        </div>
    </header>
  )
}

export default Header