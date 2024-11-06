import { Router } from "express";
import Group from "../../models/groupModel.js";

const router = Router();

router.post("/", async (req, res) => {
  try {
    const group = await Group.create(req.body);
    res.status(200).json(group);
  } catch (error) {
    res.status(500).json(error);
  }
});

router.get("/", async (req, res) => {
  try {
    const groups = await Group.find({});
    res.status(200).json(groups);
  } catch (error) {
    res.status(500).json(error);
  }
});

router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const group = await Group.findById(req.body);
    if (!group) {
      return res.status(404).json({ message: `cannot find ID: ${id}` });
    }
    res.status(200).json(group);
  } catch (error) {
    res.status(500).json(error);
  }
});

router.put("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const selectedGroup = await Group.findByAndUpdate(id, req.body);
    if (!selectedGroup) {
      return res.status(404).json({ message: `cannot find ID: ${id}` });
    }
    const updatedGroup = await Group.findById(id);
    res.status(200).json({ original: selectedGroup, updated: updatedGroup });
  } catch (error) {
    res.status(500).json(error);
  }
});

router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const deletedGroup = await Group.findByIdAndDelete(id);
    if (!deletedGroup) {
      return res.status(404).json({ message: `cannot find ID: ${id}` });
    }
    res.status(200).json(deletedGroup);
  } catch (error) {
    res.status(500).json(error);
  }
});

export default router;
