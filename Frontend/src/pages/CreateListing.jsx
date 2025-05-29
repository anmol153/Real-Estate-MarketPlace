import React from 'react'

function CreateListing() {
  return (
    <main >
      <div className= "md:max-w-10/12 mx-auto p-4 bg-white shadow-md rounded-lg mt-5">
        <h1 className='text-3xl font-semibold text-center '>Create a Listing</h1>
          <form className='mt-6 space-y-4'>
            <div className='flex flex-col sm:flex-row gap-4'>
              <div className='gap-4 flex flex-col flex-1'>
                <input  type = "text" placeholder='Name' className='w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500' maxLength={62} minLength={10} required />
                <textarea
                  placeholder='Description'
                  className="w-full p-2 border h-20 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 mt-2 resize-none"
                />
                <input type = "text" placeholder ='Address' className='w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 mt-2' />
              <div className='flex flex-row flex-wrap gap-4 mt-4'>
                <div className="flex gap-2">
                    <input type = "checkbox" id= 'sale'  className="w-5 h-5  accent-blue-600 rounded"/>
                    <span className='text-sm'>Sale</span>
                </div>
                <div className="flex gap-2">
                  <input type = "checkbox" id= 'rent' className='w-5 h-5  accent-blue-600 rounded'/>
                  <span className='text-sm'>Rent</span>
              </div>
              <div className="flex gap-2">
                  <input type = "checkbox" id= 'Parking spot' className='w-5 h-5  accent-blue-600 rounded'/>
                  <span className='text-sm'>Parking spot</span>
              </div>
              <div className="flex gap-2">
                  <input type = "checkbox" id= 'Furnished' className='w-5 h-5  accent-blue-600 rounded'/>
                  <span className='text-sm'>Furnished</span>
              </div>
              <div className="flex gap-2">
                  <input type = "checkbox" id= 'Offer' className='w-5 h-5  accent-blue-600 rounded'/>
                  <span className='text-sm'>Offer</span>
              </div>
              </div>
              <div>
                <div className='flex flex-row flex-wrap gap-6 mt-4 '>
                  <div className='flex gap-2 items-center'>
                      <input type="number"  id ="Beds" className='w-15 border p-3 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ' min={0} max={10} required />
                      <p>Beds</p>
                  </div>
                
                  <div className='flex gap-2 items-center'>
                      <input type="number"  id ="Baths" className='w-15 border p-3 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ' min={0} max={10} required />
                      <p>Baths</p>
                  </div>
                  <div className='flex gap-2 items-center'>
                      <input type="number"  id ="RegularPrice" className='w-35 border p-3 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ' min={0}  required />
                      <p>Regular Price </p>
                      {/* <p>(INR/Month)</p> */}
                  </div>
                  <div className='flex gap-2 items-center'>
                      <input type="number"  id ="Discounted Price" className='w-35 border p-3 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ' min={0}  required />
                      <p>Discounted Price </p>
                      {/* <p>(INR/Month)</p> */}
                  
                  </div>
                </div>
              </div>
              </div>
              <div className='flex flex-col gap-4 flex-1'>
                <p className='font-semibold'>Images:
                <span className= 'font-normal text-gray-600 ml-2'>The First Image will be cover (max 6)</span>
                </p>
                <div className="flex gap-4 ">
                    <input className="p-3 border border-gray-300 rounded w-full " type = "file" id="image" accept='image/*' multiple/>
                    <button className='p-3 text-green-700 border border-green-700 rounded uppercase hover:shadow-lg disabled:opacity-80'>Upload</button>
                </div>
            <button className = "p-3 bg-slate-700 text-white rounded-lg uppercase hover:opacity-95 disabled:opacity-80 text-center">Create Listing</button>
              </div>
            </div>
          </form>
      </div>
    </main>
  )
}

export { CreateListing };