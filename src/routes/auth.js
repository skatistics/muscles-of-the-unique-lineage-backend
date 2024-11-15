import { Router } from "express";
import {
  generateAccessToken,
  generateRefreshToken,
} from "../helpers/generateToken.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../../models/userModel.js";

const router = Router();

router.post("/login", async (req, res) => {
  let user = null;

  try {
    if (req.body.email) {
      user = await User.findOne({
        email: req.body.email,
      }).exec();
    }
    if (req.body.username) {
      user = await User.findOne({
        username: req.body.username,
      }).exec();
    }

    if (!user) {
      return res
        .status(404)
        .json({ message: "Invalid username, email or password" });
    }

    const isValidPassword = await bcrypt.compare(
      req.body.password,
      user.password
    );

    if (!isValidPassword) {
      return res
        .status(404)
        .json({ message: "Invalid username, email or password" });
    }

    const accessToken = generateAccessToken(user.id);
    const refreshToken = generateRefreshToken(user.id);

    //save refreshToken to Database
    const updatedUser = await User.findByIdAndUpdate(user.id, {
      token: refreshToken,
    });

    res.cookie("jwt", refreshToken, {
      httpOnly: true,
      sameSite: "None",
      secure: true,
      maxAge: 24 * 60 * 60 * 1000, //1day
    });
    res.json({ accessToken: accessToken });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
router.get("/refresh", async (req, res) => {
  try {
    const cookies = req.cookies;

    if (!cookies?.jwt) return res.sendStatus(401);

    const refreshToken = cookies.jwt;

    console.log(`ref: ${refreshToken}`);
    const foundUser = await User.findOne({
      token: refreshToken,
    }).exec();

    console.log(`user: ${foundUser}`);
    if (!foundUser) return res.sendStatus(403);

    jwt.verify(
      refreshToken,
      process.env.REFRESH_TOKEN_SECRET,
      (error, payload) => {
        if (error || foundUser.id !== payload.id) return res.sendStatus(403);
        const accessToken = generateAccessToken(payload.id);
        res.json({ accessToken: accessToken });
      }
    );
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
router.get("/logout", async (req, res) => {
  //ON CLIENT ALSO DELETE THE ACCESS TOKEN

  const cookies = req.cookies;
  if (!cookies?.jwt) return res.sendStatus(204);

  const refreshToken = cookies.jwt;
  const foundUser = await User.findOne({
    token: refreshToken,
  }).exec();

  if (!foundUser) {
    res.clearCookie("jwt", { httpOnly: true });
    return res.sendStatus(204);
  }

  const updatedUser = await User.findByIdAndUpdate(foundUser.id, {
    $unset: { token: true },
  });

  res.clearCookie("jwt", { httpOnly: true, sameSite: "None", secure: true });
  return res.sendStatus(204);
});

export default router;
