import createHttpError from "http-errors";
import bcrypt from "bcrypt";
import { User } from "../models/user.js";
import { createSession } from "../services/auth.js";
import { Session } from "../models/session.js";

export const register = async (req, res, next) => {
  const { name, email, password } = req.body;

  //   const existingUser = await User.exists({ email });
  const existingUser = await User.findOne({ email });

  console.log(existingUser);

  if (existingUser) {
    // 409
    next(createHttpError(400, "User with such email already exists"));
    return;
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = await User.create({ name, email, password: hashedPassword });
  const newSession = await createSession(newUser._id);

  console.log(newSession);

  res.status(201).json(newUser);
};

export const login = async (req, res, next) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (!user) {
    next(createHttpError(401, "Invalid email or password"));
    return;
  }

  const isCorrectPassword = await bcrypt.compare(password, user.password);

  if (!isCorrectPassword) {
    next(createHttpError(401, "Invalid email or password"));
    return;
  }

  await Session.deleteOne({ userId: user._id });

  const newSession = await createSession(user._id);

  console.log(newSession);

  res.status(200).json(user);
};
