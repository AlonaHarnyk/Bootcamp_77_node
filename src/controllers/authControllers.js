import createHttpError from "http-errors";
import bcrypt from "bcrypt";
import { User } from "../models/user.js";
import { createSession, setSessionCookies } from "../services/auth.js";
import { Session } from "../models/session.js";

export const register = async (req, res, next) => {
  const { name, email, password } = req.body;

  //   const existingUser = await User.exists({ email });
  const existingUser = await User.findOne({ email });

  if (existingUser) {
    // 409
    next(createHttpError(400, "User with such email already exists"));
    return;
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = await User.create({ name, email, password: hashedPassword });
  const newSession = await createSession(newUser._id);

  setSessionCookies(newSession, res);

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

  setSessionCookies(newSession, res);

  res.status(200).json(user);
};

export const logout = async (req, res) => {
  const { sessionId } = req.cookies;
  if (sessionId) {
    await Session.deleteOne({ _id: sessionId });
  }

  res.clearCookie("accessToken");
  res.clearCookie("refreshToken");
  res.clearCookie("sessionId");

  res.status(204).end();
};

export const refreshSession = async (req, res, next) => {
  const { sessionId, refreshToken } = req.cookies;
  const session = await Session.findOne({
    _id: sessionId,
    refreshToken,
  });

  if (!session) {
    next(createHttpError(401, "Session not found"));
    return;
  }

  const userId = session.userId;

  const isRefresheTokenExpired = new Date() > session.refreshTokenValidUntil;

  if (isRefresheTokenExpired) {
    next(createHttpError(401, "Refresh token expired"));
    return;
  }

  await Session.deleteOne({ _id: sessionId, refreshToken });

  const newSession = await createSession(userId);

  setSessionCookies(newSession, res);

  res.status(200).json({ message: "Session refreshed" });
};
