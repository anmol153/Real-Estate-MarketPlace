import { Router } from "express"
import { google, signIn, signUp } from "../controllers/auth.controller.js"

const AuthRouter = Router()
AuthRouter.route("/sign-up").post(signUp);
AuthRouter.route("/sign-in").post(signIn);
AuthRouter.route("/google").post(google);

export { AuthRouter };