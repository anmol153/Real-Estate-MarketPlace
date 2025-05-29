import { model } from 'mongoose';
import React from 'react'
import { useState } from 'react';
import { useCallback } from 'react';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function CreateListing() {
  const [sale,setSale] = useState(true);
  const [data,setData] = useState({
    parking:false,
    furnished:false,
    offer:false
  });
  const [imageURL,setimageURL]  = useState([]);
  const [Message,setMessage] = useState('');
  const [file,setfiles] = useState([]);
  const [loading,setLoading] = useState('');
  const [offer,setoffer] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
  console.log(imageURL);
  }, [imageURL]);


  const changeHandler = useCallback((e) => {
  const { id, type, checked, value } = e.target;
      setData(prev => ({
        ...prev,
        [id]: type === 'checkbox' ? checked : value
      }));
    }, []);


  const deleteUpload = async (urlToDelete) => {
  setLoading('Deleting');
  console.log("Required to delete:", urlToDelete);

        try {
          const req = await fetch("/api/v1/listings/delete_Image", {
            method: 'POST',
            credentials: 'include',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({ url: urlToDelete }),
          });

            const result = await req.json();
            if (result.success) {
              setimageURL(prev => prev.filter(item => item !== urlToDelete));
              setMessage("Image Deleted Successfully");
            } else {
              setMessage(result.message || "Delete failed");
            }
          } catch (error) {
            console.error("Delete error:", error);
            setMessage("Delete error");
          } finally {
            setLoading('');
          }
        };


      const changeFiles = useCallback((e) => {
        setMessage('');
        e.preventDefault();
        const selectedFiles = Array.from(e.target.files); 
        setfiles(selectedFiles); 
      }, []);


const uploadHandler = async (e) => {
  e.preventDefault();
  setMessage('');
  if (!file || file.length === 0) {
    setMessage("No files selected");
    return;
  }

  const formData = new FormData();
  file.forEach((f) => {
    formData.append('file', f); 
  });

  try {
    setLoading("Uploading");
    const res = await fetch('/api/v1/listings/upload_Image', {
      method: 'POST',
      credentials: 'include',
      body: formData,
    });

    const result = await res.json();
    if (result.success) {
      setLoading('');
      console.log(result);
      setMessage("Image Uploaded Successfully");
      setimageURL(prev => [...prev, ...result.data]);
    } else {
      setLoading('');
      setMessage(result.message || "Upload failed");
    }
  } catch (error) {
    setLoading('');
    console.error("Upload error:", error);
    setMessage("Upload error");
  }
};


  const formSubmit = async(e)=>{
    e.preventDefault();
    data.type = sale===true ? "sale" : "rent";
    data.imageUrls = imageURL;
    console.log(data);
    setLoading("Creating");
      try {
         const res = await fetch('/api/v1/listings/create_listing', {
           method: 'POST',
           headers: {
             'Content-Type': 'application/json',
           },
           body: JSON.stringify(data),
         });
         const result = await res.json();
         setLoading('');
         if (result.success) {
           alert("Listing created Successfully");
           console.log(result);
           navigate(`/listing/${result.data._id}`)
         } else {
           console.log(result.message);
           setMessage(result.message);
         }
       } catch (error) {
         console.log("Eror in creating of listing", error);
         setMessage(result.message);
       }
     };
  return (
    <main >
      <div className= "md:max-w-10/12 mx-auto p-4 bg-white shadow-md rounded-lg mt-5">
        <h1 className='text-3xl font-semibold text-center '>Create a Listing</h1>
        {Message && <h3 className='test-5xl text-center '>{Message}</h3>}
          <form className='mt-6 space-y-4' onSubmit={formSubmit}>
            <div className='flex flex-col sm:flex-row gap-4'>
              <div className='gap-4 flex flex-col flex-1'>
                <input  type = "text" placeholder='Name' id = "name" onChange={changeHandler} className='w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500' maxLength={62} minLength={10} required />
                <textarea id="description" onChange={changeHandler}
                  placeholder='Description'
                  className="w-full p-2 border h-20 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 mt-2 resize-none"
                />
                <input type = "text" placeholder ='Address' id="address" onChange={changeHandler} className='w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 mt-2' />
              <div className='flex flex-row flex-wrap gap-4 mt-4'>
                <div className="flex gap-2">
                    <input type = "checkbox" id= 'sale'  onChange={()=>setSale(prev=>(!prev))}  checked={sale === true}  className="w-5 h-5  accent-blue-600 rounded"/>
                    <span className='text-sm'>Sale</span>
                </div>
                <div className="flex gap-2">
                  <input type = "checkbox" id= 'rent' onChange={()=>setSale(prev=>(!prev))}  checked={sale === false} className='w-5 h-5  accent-blue-600 rounded'/>
                  <span className='text-sm'>Rent</span>
              </div>
              <div className="flex gap-2">
                  <input type = "checkbox" id= 'parking' className='w-5 h-5  accent-blue-600 rounded'
                  onChange = {changeHandler}/>
                  <span className='text-sm'>Parking spot</span>
              </div>
              <div className="flex gap-2">
                  <input type = "checkbox" id= 'furnished' className='w-5 h-5  accent-blue-600 rounded'
                  onChange = {changeHandler}/>
                  <span className='text-sm'>Furnished</span>
              </div>
              <div className="flex gap-2">
                  <input type = "checkbox" id= 'offer' className='w-5 h-5  accent-blue-600 rounded'
                  onChange = {changeHandler}
                  onClick=  {()=>setoffer(prev=>!prev)}/>
                  <span className='text-sm'>Offer</span>
              </div>
              </div>
              <div>
                <div className='flex flex-row flex-wrap gap-6 mt-4 '>
                  <div className='flex gap-2 items-center'>
                      <input type="number"  id ="bedrooms" className='w-15 border p-3 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 '
                      onChange = {changeHandler} min={0} max={10} required />
                      <p>Beds</p>
                  </div>
                
                  <div className='flex gap-2 items-center'>
                      <input type="number"  onChange = {changeHandler} id ="bathrooms" className='w-15 border p-3 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ' min={0} max={10} required />
                      <p>Baths</p>
                  </div>
                  <div className='flex gap-2 items-center'>
                      <input type="number"  id ="regularPrice" onChange = {changeHandler} className='w-35 border p-3 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ' min={0}  required />
                      <p>Regular Price </p>
                      {/* <p>(INR/Month)</p> */}
                  </div>
                  <div className='flex gap-2 items-center'>
                      <input type="number"  id ="discountedPrice" onChange = {changeHandler} className={`w-35 border p-3 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${offer === false ? "hidden" : ""}`} min={0}   />
                      {offer && <p>Discounted Price </p>}
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
                    <input onChange = {changeFiles} className="p-3 border border-gray-300 rounded w-full " type = "file" id="imageUrls" accept='image/*' multiple/>
                    <button disabled={loading==='Uploading'} className='p-3 text-green-700 border border-green-700 rounded uppercase hover:shadow-lg disabled:opacity-80' onClick={uploadHandler}>{loading==='Uploading' ? "Uploading..." : "Upload"}</button>
                </div>
                    {imageURL.map((url, index) => (
                    <div key={index} className="relative">
                      <img src={url} alt={`upload-${index}`} className="w-32 h-32 object-cover rounded" />
                      <button
                        onClick={() => deleteUpload(url)}
                        className="absolute top-1 right-1 bg-red-500 text-white rounded-full px-2 py-1 text-xs"
                      >
                        Delete
                      </button>
                      </div>
                    ))}
                <button  disabled={loading === "Creating"|| loading =='Uploading'} className = {`p-3 bg-slate-700 text-white rounded-lg uppercase hover:opacity-95 disabled:opacity-80 text-center`}>{loading==="Creating" ? "Creating" : "Create Listing"}</button>
              </div>
            </div>
          </form>
      </div>
    </main>
  )
}
export { CreateListing };