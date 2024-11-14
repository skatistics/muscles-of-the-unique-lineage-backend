import mongoose from "mongoose";

const routineSchema = mongoose.Schema({
  userId: {
    type: String,
    required: [true],
  },
  name: {
    type: String,
    required: [true],
  },
  frequency: {
    type: String,
    required: [true],
  },
  sets: {
    type: String,
    required: [true],
  },
  intensity: {
    type: String,
    required: [true],
    min: [1],
    max: [5],
  },
  workoutList: {
    type: String,
    required: [true],
  },
});
