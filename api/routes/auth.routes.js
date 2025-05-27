import { Router } from "express"
import { google, signIn, signUp, updateDetails } from "../controllers/auth.controller.js"
import JWTverify from "../middleware/JWTverify.js";

const AuthRouter = Router()
AuthRouter.route("/sign-up").post(signUp);
AuthRouter.route("/sign-in").post(signIn);
AuthRouter.route("/google").post(google);
AuthRouter.route("/update").use(JWTverify).post(updateDetails);
export { AuthRouter };