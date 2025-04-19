import { Router } from "express"
import { signIn, signUp } from "../controllers/auth.controller.js"

const AuthRouter = Router()
AuthRouter.route("/sign-up").post(signUp);
AuthRouter.route("/sign-in").post(signIn);

export { AuthRouter };