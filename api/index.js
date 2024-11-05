import express from "express";
import mongoose from "mongoose";
import workoutRouter from "../src/routes/workouts.js";
import usersRouter from "../src/routes/users.js";

const port = process.env.PORT || 3500;

const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use("/api/workouts", workoutRouter);
app.use("/api/users", usersRouter);

mongoose.set("strictQuery", false);
mongoose
  .connect(
    "mongodb+srv://admin:admin@motuldb.gfy6s.mongodb.net/?retryWrites=true&w=majority&appName=motulDB"
  )
  .then(() => {
    app.listen(port, () => {
      console.log(`Server running on port ${port}`);
    });
  })
  .catch((err) => {
    console.log(err);
  });
