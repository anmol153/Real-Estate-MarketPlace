import React from 'react'

function Search() {
  return (
    <div className='flex flex-col md:flex-row'>
        <div className='p-7 border-b-2 md:border-r-2 border-slate-200 md:min-h-screen'>
            <form className='flex flex-col gap-8'>
                <div className='flex item-center gap-2'>
                    <label className='whitespace-nowrap mt-3 font-semibold'>Search Term:</label>
                    <input type ="text"
                    id = "searchTerm"
                    placeholder='Search...'
                    className=' border-0 rounded-lg p-3 w-full bg-white'></input>
                </div>
                <div className='flex gap-2 flex-wrap items-center'>
                    <label className='font-semibold'>Type :</label>
                        <div className='flex gap-2'>
                            <input type="checkbox" id="all" className='w-5 h-5 accent-blue-600 rounded-lg' />
                            <span>Rent & Sale</span>
                        </div>
                        <div className='flex gap-2'>
                            <input type="checkbox" id="rent" className='w-5 h-5 accent-blue-600 rounded-lg' />
                            <span>Rent</span>
                        </div>
                        <div className='flex gap-2'>
                            <input type="checkbox" id="sale" className='w-5 h-5 accent-blue-600 rounded-lg' />
                            <span>Sale</span>
                        </div>
                        <div className='flex gap-2'>
                            <input type="checkbox" id="offer" className='w-5 h-5 accent-blue-600 rounded-lg' />
                            <span>Offer</span>
                        </div>
                </div>
                <div className='flex gap-2 flex-wrap items-center '>
                    <label className='font-semibold'>Anemities :</label>
                        <div className='flex gap-2'>
                            <input type="checkbox" id="parking" className='w-5 h-5 accent-blue-600 rounded-lg' />
                            <span>Parking</span>
                        </div>
                        <div className='flex gap-2'>
                            <input type="checkbox" id="furnished" className='w-5 h-5 accent-blue-600 rounded-lg' />
                            <span>furnished</span>
                        </div>
                </div>
                <div className='flex items-center gap-2 ' >
                    <label className='font-semibold'>Sort:</label>
                    <select defaultValue="created_at" id="sort_order" className='border-0 rounded-lg p-3 bg-white'>
                        <option value="regularPriceDesc">Price high to low</option>
                        <option value="regularPriceAsc">Price low to high</option>
                        <option value="createdAtDesc">Latest</option>
                        <option value="createdAtAsc">Oldest</option>
                    </select>
                </div>
                <button className='bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95'>Search</button>
            </form>
        </div>
        <div className=''>
           <h1 className='text-3xl font-semibold p-3 text-slate-700 mt-5'>
                Listing results:
            </h1>
        </div>
    </div>
  )
}

export default Search