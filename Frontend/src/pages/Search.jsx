import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ListingItem from '../Components/ListingItem';

function Search() {
    const [sidebardata, setSidebardata] = useState({
        searchTerm: '',
        type: 'all',
        parking: false,
        furnished: false,
        offer: false,
        sort: 'created_at',
        order: 'desc'
    });

    const [loading, setLoading] = useState(false);
    const [listing, setListing] = useState([]);
    const [showMore, setShowMore] = useState(false);
    const navigate = useNavigate();

    // Load listings based on URL query params
    useEffect(() => {
        const urlParams = new URLSearchParams(location.search);
        const searchTermFromUrl = urlParams.get('searchTerm');
        const typeFromUrl = urlParams.get('type');
        const parkingFromUrl = urlParams.get('parking');
        const furnishedFromUrl = urlParams.get('furnished');
        const offerFromUrl = urlParams.get('offer');
        const sortFromUrl = urlParams.get('sort');
        const orderFromUrl = urlParams.get('order');

        if (searchTermFromUrl || typeFromUrl || parkingFromUrl || furnishedFromUrl || offerFromUrl || sortFromUrl || orderFromUrl) {
            setSidebardata({
                searchTerm: searchTermFromUrl || '',
                type: typeFromUrl || 'all',
                parking: parkingFromUrl === 'true',
                furnished: furnishedFromUrl === 'true',
                offer: offerFromUrl === 'true',
                sort: sortFromUrl || 'created_at',
                order: orderFromUrl || 'desc'
            });
        }

        const fetchListing = async () => {
            setLoading(true);
            const searchQuery = urlParams.toString();
            const res = await fetch(`/api/v1/listings/get?${searchQuery}`);
            const data = await res.json();
            if (data.data.length > 8) {
                setShowMore(true);
            } else {
                setShowMore(false);
            }
            setListing(data.data);
            setLoading(false);
        };

        fetchListing();
    }, [location.search]);

    // Load more listings on "Show More"
    const onMoreHandler = async (e) => {
        e.preventDefault();
        const numberOfListings = listing.length;
        const startIndex = numberOfListings;
        const urlParams = new URLSearchParams(location.search);
        urlParams.set('startIndex', startIndex);
        const searchQuery = urlParams.toString();
        const res = await fetch(`/api/v1/listings/get?${searchQuery}`);
        const data = await res.json();
        if (data.data.length < 9) {
            setShowMore(false);
        }
        setListing([...listing, ...data.data]);
    };

    // Handle form submit
    const handleSumbit = (e) => {
        e.preventDefault();
        const urlParams = new URLSearchParams();
        urlParams.set('searchTerm', sidebardata.searchTerm);
        urlParams.set('type', sidebardata.type);
        urlParams.set('parking', sidebardata.parking);
        urlParams.set('furnished', sidebardata.furnished);
        urlParams.set('offer', sidebardata.offer);
        urlParams.set('sort', sidebardata.sort);
        urlParams.set('order', sidebardata.order);
        const searchQuery = urlParams.toString();
        navigate(`/search?${searchQuery}`);
    };

    // Handle input changes
    const handleChange = (e) => {
        const { id, value, checked } = e.target;
        if (id === 'all' || id === 'rent' || id === 'sale') {
            setSidebardata({ ...sidebardata, type: id });
        }
        if (id === 'searchTerm') {
            setSidebardata({ ...sidebardata, searchTerm: value });
        }
        if (id === 'parking' || id === 'furnished' || id === 'offer') {
            setSidebardata({ ...sidebardata, [id]: checked });
        }
        if (id === 'sort_order') {
            const [sort, order] = value.split('_');
            setSidebardata({ ...sidebardata, sort, order });
        }
    };

    return (
        <div className='flex flex-col md:flex-row'>
            <div className='p-7 border-b-2 md:border-r-2 border-slate-200 md:min-h-screen'>
                <form className='flex flex-col gap-8' onSubmit={handleSumbit}>
                    <div className='flex item-center gap-2'>
                        <label className='whitespace-nowrap mt-3 font-semibold'>Search Term:</label>
                        <input
                            type="text"
                            id="searchTerm"
                            placeholder='Search...'
                            className='border-0 rounded-lg p-3 w-full bg-white'
                            value={sidebardata.searchTerm}
                            onChange={handleChange}
                        />
                    </div>
                    <div className='flex gap-2 flex-wrap items-center'>
                        <label className='font-semibold'>Type:</label>
                        <div className='flex gap-2'>
                            <input type="checkbox" id="all" className='w-5 h-5 accent-blue-600' checked={sidebardata.type === 'all'} onChange={handleChange} />
                            <span>Rent & Sale</span>
                        </div>
                        <div className='flex gap-2'>
                            <input type="checkbox" id="rent" className='w-5 h-5 accent-blue-600' checked={sidebardata.type === 'rent'} onChange={handleChange} />
                            <span>Rent</span>
                        </div>
                        <div className='flex gap-2'>
                            <input type="checkbox" id="sale" className='w-5 h-5 accent-blue-600' checked={sidebardata.type === 'sale'} onChange={handleChange} />
                            <span>Sale</span>
                        </div>
                        <div className='flex gap-2'>
                            <input type="checkbox" id="offer" className='w-5 h-5 accent-blue-600' checked={sidebardata.offer} onChange={handleChange} />
                            <span>Offer</span>
                        </div>
                    </div>
                    <div className='flex gap-2 flex-wrap items-center'>
                        <label className='font-semibold'>Amenities:</label>
                        <div className='flex gap-2'>
                            <input type="checkbox" id="parking" className='w-5 h-5 accent-blue-600' checked={sidebardata.parking} onChange={handleChange} />
                            <span>Parking</span>
                        </div>
                        <div className='flex gap-2'>
                            <input type="checkbox" id="furnished" className='w-5 h-5 accent-blue-600' checked={sidebardata.furnished} onChange={handleChange} />
                            <span>Furnished</span>
                        </div>
                    </div>
                    <div className='flex items-center gap-2'>
                        <label className='font-semibold'>Sort:</label>
                        <select defaultValue="created_at_desc" id="sort_order" className='border-0 rounded-lg p-3 bg-white' onChange={handleChange}>
                            <option value="regularPrice_desc">Price high to low</option>
                            <option value="regularPrice_asc">Price low to high</option>
                            <option value="created_at_desc">Latest</option>
                            <option value="created_at_asc">Oldest</option>
                        </select>
                    </div>
                    <button disabled={loading} className='bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80'>Search</button>
                </form>
            </div>
            <div className='flex-1'>
                <h1 className='text-3xl font-semibold p-5 text-slate-600 mt-5'>Listing results:</h1>
                <div className='p-5 flex flex-wrap gap-4'>
                    {!loading && listing.length === 0 && (
                        <p className='text-xl text-slate-700 font-semibold'>No listing found!</p>
                    )}
                    {loading && (
                        <p className='text-xl text-slate-700 font-semibold'>Loading...</p>
                    )}
                    {!loading &&
                        listing &&
                        listing.map((listinga) => (
                            <ListingItem key={listinga._id} listing={listinga} />
                        ))}
                    {showMore && (
                        <button onClick={onMoreHandler} className='text-green-700 text-center w-full'>Show More</button>
                    )}
                </div>
            </div>
        </div>
    );
}

export default Search;
