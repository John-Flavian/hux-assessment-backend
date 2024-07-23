import express from "express";
import Auth from "../controllers/Auth.js";
import authProtect from "../middlewares/authProtect.js";

const router = express.Router();

// @desc      register user
// @route     POST /api/auth/register
// @access    Public
router.post("/signup", Auth.signup);

// @desc      register user
// @route     POST /api/auth/signup
// @access    Publick (users)
router.post("/login", Auth.login);

// @desc      register user
// @route     GET /api/auth/me
// @access    Private (users)
router.get("/me", authProtect, Auth.getProfile);

export default router;
