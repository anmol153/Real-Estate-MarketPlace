import { Router } from "express"
import { signUp } from "../controllers/auth.controller.js"

const AuthRouter = Router()
AuthRouter.route("/sign-up").post(signUp);

export { AuthRouter };