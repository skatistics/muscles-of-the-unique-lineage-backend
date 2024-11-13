import mongoose from "mongoose";

const workoutSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, "PROVIDE MO NAME"],
  },
  muscleGroup: {
    type: String,
    required: [true, "PROVIDE MO MUSCLE GROUP"],
  },
  workoutType: {
    type: String,
    required: [true, "PROVIDE MO UNG TYPE "],
  },
  intensity: {
    type: Number,
    required: [true, "PROVIDE MO INTENSITY ... "],
    min: [1, "ANG KONTI MASYADO"],
    max: [5, "TAAS NAMAN MASYADO"],
  },
});

const Workout = mongoose.model("Workout", workoutSchema, "workouts");
export default Workout;
