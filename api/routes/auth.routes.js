import { Router } from "express";
import { google, signIn, signUp, updateDetails, updatepassword } from "../controllers/auth.controller.js";
import JWTverify from "../middleware/JWTverify.js";

const AuthRouter = Router();

AuthRouter.post("/sign-up", signUp);
AuthRouter.post("/sign-in", signIn);
AuthRouter.post("/google", google);
AuthRouter.post("/update", JWTverify, updateDetails);
AuthRouter.post("/update-password", JWTverify, updatepassword);

export { AuthRouter };
