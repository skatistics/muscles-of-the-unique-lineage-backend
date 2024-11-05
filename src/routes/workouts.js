import { Router } from "express";

const router = Router();

const workouts = [
  {
    id: 1,
    name: "push up",
    muscleGroup: "chest",
    workoutType: "upper",
    intensity: 1,
  },
  {
    id: 2,
    name: "pull ups",
    muscleGroup: "chest",
    workoutType: "upper",
    intensity: 1,
  },
  {
    id: 3,
    name: "sit ups",
    muscleGroup: "core",
    workoutType: "core",
    intensity: 3,
  },
  {
    id: 4,
    name: "squats",
    muscleGroup: "hamstrings",
    workoutType: "lower",
    intensity: 1,
  },
  {
    id: 5,
    name: "plank",
    muscleGroup: "core",
    workoutType: "upper",
    intensity: 4,
  },
];

router.get("/", (req, res) => {
  res.send(workouts);
});

router.get("/:id", (req, res) => {
  const parsedId = parseInt(req.params.id);

  if (isNaN(parsedId)) {
    return res.sendStatus(400);
  }

  const foundWorkout = workouts.find((workout) => workout.id === parsedId);

  if (!foundWorkout) {
    return res.sendStatus(404);
  }

  res.status(200).send(foundWorkout);
});

router.post("/", (req, res) => {
  console.log(req.body);
  const newWorkout = { id: workouts.length + 1, ...req.body };
  workouts.push(newWorkout);
  res.status(200).send("success");
});

router.put("/:id", (req, res) => {
  const parsedId = parseInt(req.params.id);
  if (isNaN(parsedId)) {
    return res.sendStatus(400);
  }
  const foundIndex = workouts.findIndex((workout) => workout.id === parsedId);

  if (foundIndex === -1) {
    return res.sendStatus(404);
  }

  workouts[foundIndex] = {
    id: parsedId,
    name: req.body.name,
    muscleGroup: req.body.muscleGroup,
    workoutType: req.body.workoutType,
    intensity: req.body.intensity,
  };

  res.status(200).send("success");
});

router.patch("/:id", (req, res) => {
  const parsedId = parseInt(req.params.id);
  if (isNaN(parsedId)) {
    return res.sendStatus(400);
  }
  const foundIndex = workouts.findIndex((workout) => workout.id === parsedId);

  if (foundIndex === -1) {
    return res.sendStatus(404);
  }

  workouts[foundIndex] = {
    ...workouts[foundIndex],
    ...req.body,
  };

  res.status(200).send("OK");
});

router.delete("/:id", (req, res) => {
  const parsedId = parseInt(req.params.id);
  if (isNaN(parsedId)) {
    return res.sendStatus(400);
  }
  const foundIndex = workouts.findIndex((workout) => workout.id === parsedId);

  if (foundIndex === -1) {
    return res.sendStatus(404);
  }
  workouts.splice(foundIndex, 2);
  res.status(200).send("deleted");
});

export default router;
