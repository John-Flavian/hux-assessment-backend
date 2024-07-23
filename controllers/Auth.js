import User from "../models/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

class Auth {
  static async _generateToken(payload) {
    // Create and sign a JWT token
    const token = await jwt.sign(payload, process.env.TOKEN_SECRET, {
      expiresIn: "3d",
    });

    return token;
  }

  static async signup(req, res, next) {
    try {
      const { firstName, lastName, email, password } = req.body;

      // Check if the user already exists
      let user = await User.findOne({ email });
      if (user) {
        return res
          .status(400)
          .json({ success: false, message: "User already exists" });
      }

      // Create a new user instance
      user = new User({
        firstName,
        lastName,
        email,
      });

      // Hash the password
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, salt);

      // Save the user to the database
      await user.save();

      const payload = {
        user: {
          _id: user._id,
          email: user.email,
        },
      };

      const token = await Auth._generateToken(payload);

      delete user._doc.password;

      return res.status(200).json({
        success: true,
        message: "User registration successful.",
        data: {
          ...user._doc,
          token,
        },
      });
    } catch (error) {
      return next(error);
    }
  }

  static async login(req, res, next) {
    try {
      const { email, password } = req.body;

      let user = await User.findOne({ email }).select("+password");

      if (!user) {
        return res
          .status(400)
          .json({ success: false, message: "User account not found." });
      }

      const validPassword = await bcrypt.compare(password, user.password);

      if (!validPassword) {
        return res.status(400).json({
          success: false,
          message: "Password Incorrect.",
        });
      }

      const token = await Auth._generateToken({
        user: {
          _id: user._id,
          email: user.email,
        },
      });

      delete user._doc.password;

      return res.status(200).json({
        success: true,
        message: "User login successful.",
        data: {
          ...user._doc,
          token,
        },
      });
    } catch (error) {
      next(error);
    }
  }

  static async getProfile(req, res, next) {
    try {
      const user = await User.findById(req.user._id);

      if (!user) {
        return res.status(404).json({
          success: false,
          message: "User Account not found.",
        });
      }

      return res.status(200).json({
        success: true,
        message: "User Data Found.",
        data: user,
      });
    } catch (error) {
      next(error);
    }
  }
}

export default Auth;
