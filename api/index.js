import express from "express";
import mongoose from "mongoose";
import workoutsRouter from "../src/routes/workouts.js";
import usersRouter from "../src/routes/users.js";
import groupsRouter from "../src/routes/groups.js";
import membershipRouter from "../src/routes/memberships.js";

const PORT = process.env.PORT || 3500;
const DBUSERNAME = process.env.DB_USERNAME;
const DBPASSWORD = process.env.DB_PASSWORD;
const CLUSTERNAME = process.env.CLUSTER_NAME;
const APPNAME = process.env.APP_NAME;
const DBNAME = process.env.DB_NAME;

const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use("/api/workouts", workoutsRouter);
app.use("/api/users", usersRouter);
app.use("/api/groups", groupsRouter);
app.use("/api/memberships", membershipRouter);

mongoose.set("strictQuery", false);
mongoose
  .connect(
    `mongodb+srv://${DBUSERNAME}:${DBPASSWORD}@${CLUSTERNAME}.gfy6s.mongodb.net/${DBNAME}?retryWrites=true&w=majority&appName=${APPNAME}`
  )
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.log(err);
  });
