import { Router } from "express";

import { asyncHandler } from "../utils/async-handler";
import { loginController } from "../controllers/auth.controller";

const authLoginRouter = Router();

authLoginRouter.post("/login", asyncHandler(loginController));

export default authLoginRouter;
