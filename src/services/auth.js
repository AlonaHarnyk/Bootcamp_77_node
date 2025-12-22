import crypto from "node:crypto";
import { Session } from "../models/session.js";
import { FIFTEEN_MINUTES, ONE_DAY } from "../constants/constants.js";

export const createSession = (userId) => {
  const accessToken = crypto.randomBytes(30).toString("base64");
  const refreshToken = crypto.randomBytes(30).toString("base64");

  return Session.create({
    userId,
    accessToken,
    refreshToken,
    accessTokenValidUntil: Date.now() + FIFTEEN_MINUTES,
    refreshTokenValidUntil: Date.now() + ONE_DAY,
  });
};
