import ApiError from "../utils/ApiError.js";
import asyncHandler from "../utils/AsyncHandler.js";
import { Listing } from "../models/listing.models.js";
import ApiResponse from "../utils/ApiResponse.js";
import { User } from "../models/user.models.js";


const getUserListings = asyncHandler( async(req,res,next) =>{
   try {
     const user = req.user_id;
 
     if(!user) throw new ApiError(400,"User is not valid");
 
     if(req.user_id != req.params.id) throw new ApiError(400, "You only view  your own lisiting ");
     
     const listing = await Listing.find( { userRef: req.params.id})
    
     return res.status(200)
     .json(new ApiResponse(200,listing,"Listings fetched Successfully"));
    } 
    catch (error) {
    next(error);
   }
});
const getUser = asyncHandler(async(req, res, next) =>{
  try {
    const user = await User.findById(req.params.id);
    if(!user) throw new ApiError(400, "User not found");
    
    const {password: pass, ...rest} = user._doc;

    return res.status(200)
    .json(new ApiResponse(200, rest, "User fetched Successfully"));
  }
  catch (error) {
    next(error);
  }
})
export {getUserListings,getUser};