const express = require("express");
const userRouter = express.Router();

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const UserModel = require("../models/user.model");

userRouter.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const is_User = await UserModel.findOne({ email });

    if (is_User) {
      const hashed_password = is_User.password;

      // Use bcrypt.compareSync for synchronous comparison
      const result = bcrypt.compareSync(password, hashed_password);

      if (result) {
        const token = jwt.sign(
          {
            UserID: is_User._id,
          },
          "heyDev"
        );

        return res.json({ message: "Login Success", token });
      } else {
        return res.status(401).json({
          message: "Invalid credentials, Try Again!!",
        });
      }
    } else {
      return res.status(404).json({ message: "User not found!, Try Signing in again" });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
});

userRouter.post("/signup", async (req, res) => {
  const { username, email, password } = req.body;

  try {
    const existingUser = await UserModel.findOne({ email });

    if (existingUser) {
      return res.status(409).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new UserModel({
      username,
      email,
      password: hashedPassword,
    });

    await newUser.save();

    res.status(201).json({ message: "Signup successful" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = userRouter;
