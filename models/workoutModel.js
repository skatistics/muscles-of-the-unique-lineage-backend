import mongoose from "mongoose";

const workoutSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, "TANG INA MO PROVIDE MO NAME"],
  },
  muscleGroup: {
    type: String,
    required: [true, "TANG INA MO PROVIDE MO MUSCLE GROUP"],
  },
  workoutType: {
    type: String,
    required: [true, "TANG INA MO PROVIDE MO UNG TYPE TANGA KA BA"],
  },
  intensity: {
    type: Number,
    required: [true, "TANG INA MO PROVIDE MO INTENSITY ... TANGA AMP"],
    min: [1, "TANGA ANG KONTI MASYADO"],
    max: [5, "TANGINA MO TAAS NAMAN MASYADO BOBO"],
  },
});

const Workout = mongoose.model("Workout", workoutSchema, "workouts");
export default Workout;
