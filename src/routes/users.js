import { Router } from "express";
import User from "../../models/userModel.js";

const router = Router();

router.post("/", async (req, res) => {
  console.log(req.body);
  try {
    const users = await User.create(req.body);
    res.status(200).json(users);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: error.message });
  }
});

router.get("/", async (req, res) => {
  const users = await User.find({});
  res.status(200).json(users);
});

router.get("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const selectedUser = await User.findById(id);
    res.send(selectedUser);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: error.message });
  }
});

router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  const selectedUser = await User.findByIdAndDelete(id);
  if (!selectedUser) {
    return res.status(400).json({ message: `cannot find id by ${id}` });
  }
  res.status(200).json(`DELETED: ${id}`);
});

router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const selectedUser = await User.findByIdAndUpdate(id, req.body);
  if (!selectedUser) {
    return res.status(404).json({ message: `cannot find ID by ${id}` });
  }
  const updatedUser = await User.findById(id);
  res.status(200).json(updatedUser);
});

export default router;
