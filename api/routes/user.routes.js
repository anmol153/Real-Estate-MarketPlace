import { Router } from "express";
import JWTverify from "../middleware/JWTverify.js";
import { getUserListings } from "../controllers/user.controllser.js";
const UserRouter  = Router();

UserRouter.get("/listing/:id",JWTverify,getUserListings);
export { UserRouter };