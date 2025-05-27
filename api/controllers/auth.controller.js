
import { User } from "../models/user.models.js";
import asyncHandler from "../utils/AsyncHandler.js";
import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";
const generate = async (id) => {
    const user = await User.findById(id);
    if(!user) {
        throw new ApiError(500, "User not found");
    }
    const token  =  user.generateToken();
    return token;
}
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
         
        return res.status(201)
         .json(new ApiResponse(200, userid, "User created successfully"));
       } catch (error) {
            next(error);
        }
}); 

const signIn = asyncHandler(async (req, res, next) => {
    try {
        const {email, password} = req.body;
        if(!email) {
            throw new ApiError(400, "Please provide email");
        }
        if(!password) {
            throw new ApiError(400, "Please provide password");
        }
        const user = await User.findOne({
            email
        }).select("+password");
        if(!user) {
            throw new ApiError(400, "User not found");
        }
        const isPasswordMatched = await user.isPasswordMatched(password);

        if(!isPasswordMatched) {
            throw new ApiError(400, "Invalid credentials");
        }

        const userId = await User.findById(user._id).select("-password ");

        if(!userId) {
            throw new ApiError(500, "User not found");
        }

        const token = generate(user._id);

        return res.status(200)
        .cookie("token", token, {
            httpOnly: true,
        })
        .json(new ApiResponse(200, userId, "User signed in successfully"));

    } catch (error) {
        next(error);
    }
});
const google = asyncHandler(async (req, res, next) => {
    try {
        const { email, fullName, username, photourl } = req.body;

        if (!email || !fullName) throw new ApiError(500, "Something went wrong");

        let user = await User.findOne({ email }).select("-password");

        if (user) {
            const token = await generate(user._id);

            return res.status(200)
                .cookie("token", token, { httpOnly: true })
                .json(new ApiResponse(200, user, "User signed in successfully"));
        }

        const existusername = await User.findOne({ username });
        if (existusername) throw new ApiError(500, "Username already taken");

        const generatePassword =
            Math.random().toString(36).slice(-8) + Math.random().toString(36).slice(-8);

        const newUser = await User.create({
            username,
            email,
            password: generatePassword,
            fullname: fullName,
            avatar: photourl,
        });

        if (!newUser) throw new ApiError(500, "User not created");

        const userid = await User.findById(newUser._id).select("-password");
        if (!userid) throw new ApiError(500, "User not found");

        const token = await generate(userid._id);

        return res.status(201)
            .cookie("token", token, { httpOnly: true })
            .json(new ApiResponse(200, userid, "User created successfully"));

    } catch (error) {
        next(error);
    }
});
const updateDetails = asyncHandler(async (req, res, next) => {
    try {
        const { email, fullname, username } = req.body;

        if (!email && !fullname && !username) {
            throw new ApiError(400, "All fields are empty");
        }

        if( email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            throw new ApiError(400, "Invalid email format");
        }

        const usernameIsAlreadyTaken = await User.findOne({ username });
        
        if(usernameIsAlreadyTaken) throw new ApiError(505,"Username is already exist");


        const user = await User.findById(req.user_id);
        if (!user) {
            throw new ApiError(404, "User not found");
        }

        {email && (user.email = email)};
        {fullname && (user.fullname = fullname)};
        {username && (user.username = username)};

        await user.save();

        return res.status(200).json(new ApiResponse(200, user, "User details updated successfully"));
    } catch (error) {
        next(error);
    }
})
export { signUp, signIn,google,updateDetails };