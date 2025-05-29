import { Listing }  from '../models/listing.models.js';
import ApiResponse from '../utils/ApiResponse.js';
import ApiError from '../utils/ApiError.js';
const createListing = async (req, res,next) => {
    try{
        const { name,
            description,
            address,
            regularPrice,
            discountedPrice,
            bathrooms,
            bedrooms,
            furnished,
            parking,
            type,
            offer,
            imageUrls,
            userRef } = req.body;
        if(!name || !description || !address || !regularPrice || !bathrooms || !bedrooms || !furnished || !parking || !type || !imageUrls || !userRef) {
            throw new ApiError(400, "Please fill all the fields");
        }
        const listing = await Listing.create({ name,
            description,
            address,
            regularPrice,
            discountedPrice,
            bathrooms,
            bedrooms,
            furnished,
            parking,
            type,
            offer,
            imageUrls,
            userRef });
        if(!listing) {
            throw new ApiError(500, "Listing not created");
        }
        return res.status(201).json(new ApiResponse(201, listing, "Listing created successfully"));
    }
    catch(error) {
        next(error);
    }
};

export {createListing};