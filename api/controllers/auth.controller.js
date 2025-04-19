
import { User } from "../models/user.models.js";
import asyncHandler from "../utils/AsyncHandler.js";
import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";

const signUp = asyncHandler(async (req, res, next) => {
       try {
         const{ username, email, password, fullname } = req.body;
         if (!username || !email || !password || !fullname) {
             throw new ApiError(400, "Please fill all the fields");
         }
         const existingUser = await User.findOne({
             $or: [{ email }, { username }]
         });
         if(existingUser) {
             throw new ApiError(400, "User already exists");
         }
         const user = await User.create({
             username,
             email,
             password,
             fullname,
         });
         if (!user) {
             throw new ApiError(500, "User not created");
         }
         const userid = await User.findById(user._id).select("-password ");
     
         if(!userid) {
             throw new ApiError(500, "User not found");
         }
         
         res.status(201)
         .json(new ApiResponse(200, userid, "User created successfully"));
       } catch (error) {
            next(error);
        }
}); 

export { signUp };