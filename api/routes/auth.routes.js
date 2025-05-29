import { Router } from "express";
import { deleteAccount, google, signIn, signOut, signUp, updateDetails, updatepassword, uploadAvatar } from "../controllers/auth.controller.js";
import JWTverify from "../middleware/JWTverify.js";
import { upload } from "../middleware/multer.js";

const AuthRouter = Router();

AuthRouter.post("/sign-up", signUp);
AuthRouter.post("/sign-in", signIn);
AuthRouter.post("/google", google);
AuthRouter.post("/update", JWTverify, updateDetails);
AuthRouter.post("/update-password", JWTverify, updatepassword);
AuthRouter.post("/sign-out", JWTverify, signOut);
AuthRouter.post("/delete-account", JWTverify, deleteAccount);
AuthRouter.post("/upload-avatar", JWTverify,
    upload.fields([
        {
            name:"avatar",
            maxCount:1,
        }]),
        uploadAvatar
    );  
export { AuthRouter };
