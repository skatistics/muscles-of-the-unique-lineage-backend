import { Router } from "express";
import Workout from "../../models/workoutModel.js";

const router = Router();

router.post("/", async (req, res) => {
  try {
    const workout = await Workout.create(req.body);
    res.status(200).json(workout);
  } catch (error) {
    res.status(500).json(error);
  }
});

router.get("/", async (req, res) => {
  try {
    const workoutRes = await Workout.find({});
    res.status(200).json(workoutRes);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
});

router.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const workout = await Workout.findById(id);
    if (!workout) {
      return res.status(404).json({ message: `Cannot find id: ${id}` });
    }
    res.status(200).json(workout);
  } catch (error) {
    res.status(500).json({ message: `Please enter valid ${id}` });
  }
});

router.put("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const selectedWorkout = await Workout.findByIdAndUpdate(id, req.body);
    if (!selectedWorkout) {
      return res.status(404).json({ message: `cannot find ID: ${id}` });
    }
    const updatedWorkout = await Workout.findById(id);
    res
      .status(200)
      .json({ original: selectedWorkout, updated: updatedWorkout });
  } catch (error) {
    res.status(500).json(error);
  }
});

router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const workout = await Workout.findByIdAndDelete(id);
    if (!workout) {
      return res.status(404).json({ message: `Cannot find id: ${id}` });
    }
    res.status(200).json(workout);
  } catch (error) {
    res.status(500).json(error);
  }
});

export default router;
