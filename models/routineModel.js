import mongoose from "mongoose";

const routineSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true],
  },
  days: {
    type: String,
    required: [true],
  },
  time: {
    type: String,
    required: [true],
  },
  intensity: {
    type: String,
    required: [true],
    min: [1],
    max: [5],
  },
});
