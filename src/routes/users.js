import { Router } from "express";
import User from "../../models/userModel.js";
import {
  validateUniqueUser,
  confirmPassword,
} from "../middleware/userValidation.js";
import { verifyJWTAdmin, verifyJWT } from "../middleware/verifyJWT.js";

const router = Router();

router.post(
  "/register",
  validateUniqueUser,
  confirmPassword,
  async (req, res) => {
    console.log(req.body);
    try {
      const newUser = {
        username: req.body.username,
        email: req.body.email,
        password: req.body.password,
        role: "user",
      };
      const users = await User.create(newUser);
      res.status(200).json(users);
    } catch (error) {
      console.log(error.message);
      res.status(500).json(error);
    }
  }
);

router.get("/", verifyJWTAdmin, async (req, res) => {
  const users = await User.find({});
  res.status(200).json(users);
});

router.get("/:id", verifyJWTAdmin, async (req, res) => {
  const { id } = req.params;

  try {
    const selectedUser = await User.findById(id);
    if (!selectedUser) {
      return res.status(400).json({ message: `cannot find id by ${id}` });
    }
    res.send(selectedUser);
  } catch (error) {
    console.log(error.message);
    res.status(500).json(error);
  }
});

router.put("/:id", verifyJWT, async (req, res) => {
  const { id } = req.params;
  try {
    const selectedUser = await User.findByIdAndUpdate(id, req.body);
    if (!selectedUser) {
      return res.status(404).json({ message: `cannot find ID by ${id}` });
    }
    const updatedUser = await User.findById(id);
    res.status(200).json(updatedUser);
  } catch (error) {
    res.status(500).json(error);
  }
});

router.delete("/:id", verifyJWT, async (req, res) => {
  const { id } = req.params;
  try {
    const selectedUser = await User.findByIdAndDelete(id);
    if (!selectedUser) {
      return res.status(400).json({ message: `cannot find id by ${id}` });
    }
    res.status(200).json(`DELETED: ${id}`);
  } catch (error) {
    res.status(500).json(error);
  }
});

export default router;
