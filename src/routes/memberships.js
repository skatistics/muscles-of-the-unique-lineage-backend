import { response, Router } from "express";
import Membership from "../../models/membershipModel.js";

const router = Router();

router.post("/", async (req, res) => {
  try {
    const membership = await Membership.create(req.body);
    res.status(200).json({ message: "OK" });
  } catch (error) {
    res.status(500).json(error);
  }
});

router.get("/", async (req, res) => {
  try {
    const memberships = await Membership.find({});
    res.status(200).json(memberships);
  } catch (error) {
    res.status(500).json({ message: "r u stpd?" });
  }
});

router.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const membership = await Membership.findById(id);
    if (!membership) {
      return res.status(404).json({ message: "Nonexistent" });
    }
    res.status(200).json(membership);
  } catch (error) {
    res.status(500).json(error);
  }
});

router.put("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const membership = await Membership.findByIdAndUpdate(id);
    if (!membership) {
      return res.status(404).json({ message: "Nonexistent" });
    }
    res.status(200).json(membership);
  } catch (error) {
    res.status(500).json(error);
  }
});

router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const membership = await Membership.findByIdAndDelete(id);
    if (!membership) {
      return res.status(404).json({ message: "Nonexistent" });
    }
    res.status(200).json(membership);
  } catch (error) {
    res.status(500).json(error);
  }
});

export default router;
