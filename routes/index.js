import express from "express";
import authRouter from "./auth.js";
import contactRouter from "./contact.js";

const router = express.Router();

router.use("/auth", authRouter);

router.use("/contacts", contactRouter);

export default router;
