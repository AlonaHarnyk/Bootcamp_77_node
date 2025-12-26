import createHttpError from "http-errors";
import { Session } from "../models/session.js";
import { User } from "../models/user.js";

export const authenticate = async (req, res, next) => {
  const { accessToken } = req.cookies;

  if (!accessToken) {
    next(createHttpError(401, "Access token missing"));
    return;
  }

  const session = await Session.findOne({ accessToken });

  if (!session) {
    next(createHttpError(401, "Session not found"));
    return;
  }

  const isAccessTokenExpired = new Date() > session.accessTokenValidUntil;

  if (isAccessTokenExpired) {
    next(createHttpError(401, "Access token expired"));
    return;
  }

  const user = await User.findById(session.userId);

  if (!user) {
    next(createHttpError(401, "User not found"));
    return;
  }

  req.user = user;

  next();
};
