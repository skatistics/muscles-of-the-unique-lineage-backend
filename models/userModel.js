import mongoose from "mongoose";
import bcrypt from "bcrypt";

const userSchema = mongoose.Schema({
  username: {
    type: String,
    required: [true, "Please provide a valid username"],
  },
  email: {
    type: String,
    required: [true, "Please enter valid email"],
    validate: {
      validator: function (value) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
      },
      message: "Invalid email address format",
    },
  },
  password: {
    type: String,
    required: [true, "Please provide a valid password"],
    validate: {
      validator: function (value) {
        return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/.test(value);
      },
      message:
        "Password must have at least eight characters, at least one uppercase letter, one lowercase letter and one number",
    },
  },
  role: { type: String, enum: ["user", "admin"], required: [true] },
  token: {
    type: String,
  },
});

userSchema.pre("save", async function (next) {
  var user = this;

  // only hash the password if it has been modified (or is new)
  if (!user.isModified("password")) return next();

  try {
    const hashedPassword = await bcrypt.hash(user.password, 10);
    user.password = hashedPassword;
    next();
  } catch (err) {
    next(err);
  }
});

const User = mongoose.model("User", userSchema, "users");
export default User;
