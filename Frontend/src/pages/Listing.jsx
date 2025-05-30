import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { Swiper, SwiperSlide } from 'swiper/react'
import SwiperCore from 'swiper'
import { Navigation } from 'swiper/modules'
import 'swiper/css/bundle'
import 'ldrs/react/TailChase.css'
import { TailChase } from 'ldrs/react'
import { FaShare, FaMapMarkerAlt, FaBed, FaBath, FaParking, FaChair } from 'react-icons/fa'
import { useSelector } from 'react-redux'
import Contact from './Contact'
function Listing() {
  const param = useParams()
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)
  const [copied, setCopied] = useState(false)
  const currentUser = useSelector((state) => state.user.currentUser)
  const [contact, setContact] = useState(false)
  SwiperCore.use([Navigation])

  useEffect(() => {
    const fetchListing = async () => {
      try {
        const req = await fetch(`/api/v1/listings/getListing/${param.id}`, {
          method: 'GET',
          credentials: 'include',
        })
        const result = await req.json()
        setLoading(false)
        if (result.success) {
          setData(result.data)
        } else {
          console.log("Error in fetching data")
          setError(true)
        }
      } catch (error) {
        setLoading(false)
        setError(true)
        console.log("error in fetching listing", error.message)
      }
    }

    fetchListing()
  }, [param.id])

  if (loading) {
    return (
      <div className='flex flex-row items-center justify-center mt-[20rem]'>
        <TailChase size="40" speed="1.75" color="black" />
      </div>
    )
  }

  if (error || !data) {
    return (
      <p className='text-3xl flex flex-row items-center justify-center mt-[10rem]'>
        Error in fetching listing...
      </p>
    )
  }

  return (
    <div>
      {/* Swiper Carousel */}
      <Swiper navigation>
        {data.imageUrls?.map((url) => (
          <SwiperSlide key={url}>
            <div
              className='h-[550px]'
              style={{
                background: `url(${url}) center no-repeat`,
                backgroundSize: 'cover',
              }}
            ></div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Share Button */}
      <div className='fixed top-[13%] right-[3%] z-10 border rounded-full w-12 h-12 flex justify-center items-center bg-slate-100 cursor-pointer'>
        <FaShare
          className='text-slate-500'
          onClick={() => {
            navigator.clipboard.writeText(window.location.href)
            setCopied(true)
            setTimeout(() => setCopied(false), 2000)
          }}
        />
      </div>

      {copied && (
        <p className='fixed top-[23%] right-[5%] z-10 rounded-md bg-slate-100 p-2'>
          Link copied!
        </p>
      )}

      {/* Listing Details */}
      <div className='flex flex-col max-w-4xl mx-auto p-3 my-7 gap-4'>
        <p className='text-2xl font-semibold'>
          {data.name} - $
          {data.offer
            ? data.discountedPrice.toLocaleString('en-US')
            : data.regularPrice.toLocaleString('en-US')}
          {data.type === 'rent' && ' / month'}
        </p>

        <p className='flex items-center mt-6 gap-2 text-slate-600 text-sm'>
          <FaMapMarkerAlt className='text-green-700' />
          {data.address}
        </p>

        <div className='flex gap-4'>
          <p className='bg-red-900 w-full max-w-[200px] text-white text-center p-1 rounded-md'>
            {data.type === 'rent' ? 'For Rent' : 'For Sale'}
          </p>
          {data.offer && (
            <p className='bg-green-900 w-full max-w-[200px] text-white text-center p-1 rounded-md'>
              ${+data.regularPrice - +data.discountedPrice} OFF
            </p>
          )}
        </div>

        <p className='text-slate-800'>
          <span className='font-semibold text-black'>Description - </span>
          {data.description}
        </p>

        <ul className='text-green-900 font-semibold text-sm flex flex-wrap items-center gap-4 sm:gap-6'>
          <li className='flex items-center gap-1 whitespace-nowrap '>
            <FaBed className='text-lg' />
            {data.bedrooms > 1 ? `${data.bedrooms} beds` : `${data.bedrooms} bed`}
          </li>
          <li className='flex items-center gap-1 whitespace-nowrap '>
            <FaBath className='text-lg' />
            {data.bathrooms > 1 ? `${data.bathrooms} baths` : `${data.bathrooms} bath`}
          </li>
          <li className='flex items-center gap-1 whitespace-nowrap '>
            <FaParking className='text-lg' />
            {data.parking ? 'Parking spot' : 'No Parking'}
          </li>
          <li className='flex items-center gap-1 whitespace-nowrap '>
            <FaChair className='text-lg' />
            {data.furnished ? 'Furnished' : 'Unfurnished'}
          </li>
        </ul>
        {currentUser && currentUser._id !== data.userRef && contact===false && (
          <button onClick={()=>setContact(true)}className='bg-slate-700 text-white text-center p-3 rounded-lg uppercase hover:opacity-95'>
            Contact Landlord
          </button>
        )}
        {contact && <Contact listing={data} />}
      </div>
    </div>
  )
}

export default Listing
