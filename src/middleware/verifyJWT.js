import jwt from "jsonwebtoken";
import User from "../../models/userModel.js";

export function verifyJWT(req, res, next) {
  const authHeader = req.headers["authorization"];
  if (!authHeader) return res.sendStatus(401);

  const token = authHeader && authHeader.split(" ")[1];

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, async (error, payload) => {
    if (error) return res.sendStatus(401);

    const user = await User.findById(payload.id);

    if (!user) return res.sendStatus(401);

    req.user = user;
    next();
  });
}

export function verifyJWTAdmin(req, res, next) {
  const authHeader = req.headers["authorization"];
  if (!authHeader) return res.sendStatus(401);

  const token = authHeader && authHeader.split(" ")[1];

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, async (error, payload) => {
    if (error) return res.sendStatus(401);

    const user = await User.findById(payload.id);

    if (!user) return res.sendStatus(401);

    if (user.role !== "admin") return res.sendStatus(403);
    req.user = user;
    next();
  });
}
