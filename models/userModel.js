import mongoose from "mongoose";

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please enter name"],
    },
    email: {
      type: String,
      required: [true, "Please enter valid email"],
    },
    type: {
      type: String,
      required: [true, "Please enter valid type"],
    },
    gender: {
      type: String,
      required: [true, "Please enter valid gender"],
    },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("User", userSchema);
export default User;
