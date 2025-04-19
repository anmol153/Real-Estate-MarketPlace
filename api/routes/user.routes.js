import { Router } from "express";
import { test } from "../controllers/user.controllser.js";

const UserRouter  = Router();

UserRouter.route("/test").get(test);

export { UserRouter };