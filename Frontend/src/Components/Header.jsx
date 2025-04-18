import React from 'react'
import { Link } from 'react-router-dom'
import { FaSearch } from 'react-icons/fa';
const Header = () => {
  return (
    <header className='bg-slate-200 shadow-md'>
        <div className='flex justify-between item-center max-w-6xl mx-auto p-3' >
            <Link to="/" className='flex items-center gap-2'>
            <h1 className="font-bold text-sm sm:text-xl flex flex-wrap ">
            <span className='text-slate-500 '>Sehand</span>
            <span className='text-slate-700 '>Estate</span>
            </h1>
            </Link>
        <form className='bg-slate-100 p-3 rounded-lg flex items-center'> 
            <input type = "text" placeholder='Search...' className='bg-transparent focus:outline-none w-25 sm:w-65' />
            <FaSearch className='text-slate-600'/>
        </form>
        <ul className='flex gap-4 text-sm'>
            <Link to="/"        className='my-auto hidden sm:inline hover:scale-110'>Home</Link>
            <Link to="/about"     className='my-auto hidden sm:inline hover:scale-110'>About</Link>
            <Link to="/sign-up"   className='my-auto sm:inline hover:scale-110'>SignIn</Link>
        </ul>
        </div>
    </header>
  )
}

export default Header