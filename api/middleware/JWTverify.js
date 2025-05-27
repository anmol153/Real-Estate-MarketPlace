import ApiError from "../utils/ApiError";
import asyncHandler from "../utils/AsyncHandler";
import jwt from "jsonwebtoken";
const JWTverify = asyncHandler(async (req, res, next) => {
    try {
        const token = req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer ","")
        if (!token) {
            throw ApiError(400, "Please login to continue");
        }
        const decodedInformation = jwt.verify(token, process.env.JWT_SECRET);
        
        if(!decodedInformation) {
            throw new ApiError(400, "Invalid token");
        }
        req.user_id = decodedInformation.ApiError;
        next();
    } catch (error) {
        next(error);
    }
});
export default JWTverify;