import createHttpError from "http-errors";
import { saveToCloudinary } from "../utils/saveFileToCloudinary.js";
import { User } from "../models/user.js";

export const updateAvatar = async (req, res, next) => {
  if (!req.file) {
    next(createHttpError(400, "No file uploaded!"));
    return;
  }

  const result = await saveToCloudinary(req.file.buffer);

  const user = await User.findByIdAndUpdate(
    req.user._id,
    { photo: result.secure_url },
    { new: true }
  );

  res.status(200).json(user);
};
