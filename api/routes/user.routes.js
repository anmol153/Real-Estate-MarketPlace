import { Router } from "express";
import JWTverify from "../middleware/JWTverify.js";
import { getUser, getUserListings } from "../controllers/user.controllser.js";
const UserRouter  = Router();

UserRouter.get("/listing/:id",JWTverify,getUserListings);
UserRouter.get("/listing/get/:id", JWTverify, getUser);
export { UserRouter };