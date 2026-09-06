import { Router } from "express";

import { createUserController } from "../controllers/user.controller";
import { asyncHandler } from "../utils/async-handler";

const authRouter = Router();

/*
  GET /api/users
*/
// router.get("/", asyncHandler(UserController.getUsers));

/*
  POST /api/users
*/
authRouter.post("/signup", asyncHandler(createUserController));

export default authRouter;
