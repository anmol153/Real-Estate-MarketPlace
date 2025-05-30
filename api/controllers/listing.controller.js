import { Listing }  from '../models/listing.models.js';
import ApiResponse from '../utils/ApiResponse.js';
import ApiError from '../utils/ApiError.js';
import asyncHandler from '../utils/AsyncHandler.js'; 
import { User } from '../models/user.models.js';
import { deleteOnCloudinary, uploadOnChoudinary } from '../db/cloudinary.js';
const createListing =  asyncHandler(async (req, res,next) => {
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
             } = req.body;
            {console.log("in the back",req.body)}
       if (
            !name ||
            !description ||
            !address ||
            regularPrice === undefined ||
            bathrooms === undefined ||
            bedrooms === undefined ||
            furnished === undefined ||
            parking === undefined ||
            !type ||
            !Array.isArray(imageUrls) || imageUrls.length === 0 ||
            !req.user_id
            ) {
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
            userRef:req.user_id });
        if(!listing) {
            throw new ApiError(500, "Listing not created");
        }
        return res.status(201).json(new ApiResponse(201, listing, "Listing created successfully"));
    }
    catch(error) {
        next(error);
    }
});

const uploadImage = asyncHandler(async (req,res,next)=>{
    try {
        let ImageUrl = [];
        for(let i = 0;i<req.files?.file.length;i++){
        const fileLocalPath = req.files?.file[i]?.path;
        {console.log(fileLocalPath);}
        if (!fileLocalPath) {
            throw new ApiError(400, "Files  are required");
        }
        const user = await User.findById(req.user_id);
        if (!user) {
            throw new ApiError(404, "User not found");
        }

        const ImageUrls = await uploadOnChoudinary(fileLocalPath);

        if(!ImageUrls) throw new ApiError(501,"Files are not uploaded");
        {console.log(ImageUrls)}
        ImageUrl.push(ImageUrls.secure_url);
    }
        return res.status(200).json(new ApiResponse(200, ImageUrl,"Files uploaded successfully"));
    } catch (error) {
        next(error);
    }
});

const deleteupload  = asyncHandler(async (req,res,next)=>{
        try {
            const {url} = req.body;
            if(!url) throw new ApiError(400,"Url is missing");
    
            const deleteurl = deleteOnCloudinary(url);
    
            if(!deleteurl) throw new ApiError(500,"Something went Wrong");
    
            return res.status(200)
            .json(new ApiResponse(200,deleteurl,"Image is successfully Deleted"));
        } catch (error) {
            next(error);
        }
})


const deletelisting = asyncHandler(async (req, res, next) => {
  const { listingId } = req.body;

  if (!listingId) {
    throw new ApiError(400, "Listing ID is required");
  }

  const listing = await Listing.findById(listingId);
  if (!listing) {
    throw new ApiError(404, "Listing not found");
  }

  for (let i = 0; i < listing.imageUrls.length; i++) {
    const deleted = await deleteOnCloudinary(listing.imageUrls[i]);
    if (!deleted) {
      throw new ApiError(500, "Failed to delete image from Cloudinary");
    }
  }

  const delete_listing = await Listing.findByIdAndDelete(listingId);
  if (!delete_listing) {
    throw new ApiError(500, "Listing could not be deleted from database");
  }

  return res.status(200).json(new ApiResponse(200, "", "Listing deleted successfully"));
});

export {createListing,uploadImage,deleteupload,deletelisting};