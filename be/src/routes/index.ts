import { Router } from "express";
import authRouter from "./user.routes";
import authLoginRouter from "./auth.routes";

const router = Router();

// auth routes
router.use("/auth", authRouter);
router.use("/auth", authLoginRouter);

export default router;
