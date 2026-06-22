import User from "../models/userSchema.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";


export const register = async (req, res, next) => {
  try {
    const { name, email, password, age } = req.body;
    const emailExist = await User.findOne({ email });
    if (emailExist) {
      return res.status(409).json({
        message: "User already exists",
      });
    }

    const hashPass = await bcrypt.hash(password, 10);

    const user = await User.create({ name, email, password: hashPass, age});

    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET,
      {
        expiresIn: "7d",
      }
    );

    return res.status(201).json({
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    next(error);
  }
};

export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({
        message: "User does not exist",
      });
    }

    const compPass = await bcrypt.compare(
      password,
      user.password
    );

    if (!compPass) {
      return res.status(401).json({
        message: "Invalid password",
      });
    }

    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET,
      {
        expiresIn: "7d",
      }
    );

    return res.status(200).json({
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    next(error);
  }
};