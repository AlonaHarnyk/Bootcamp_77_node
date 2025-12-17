import { Joi, Segments } from "celebrate";
import { isValidObjectId } from "mongoose";

import { GENDERS } from "../constants/constants.js";

export const createStudentBodySchema = {
  [Segments.BODY]: Joi.object({
    name: Joi.string().min(2).max(50).required().messages({
      "string.base": `name should be a type of string`,
      "any.required": `name is a required field`,
    }),
    age: Joi.number().min(16).max(100).required(),
    gender: Joi.string()
      .valid(...GENDERS)
      .required(),
    avgMark: Joi.number().min(1).max(12).required(),
    onDuty: Joi.boolean(),
  }),
};

const mongoIdValidator = (value, helpers) => {
  const isValidId = isValidObjectId(value);
  return isValidId ? value : helpers.message("Invalid id");
};

export const idSchema = {
  [Segments.PARAMS]: Joi.object({
    studentId: Joi.string().custom(mongoIdValidator).required(),
  }),
};

export const updateStudentSchema = {
  [Segments.PARAMS]: Joi.object({
    studentId: Joi.string().custom(mongoIdValidator).required(),
  }),
  [Segments.BODY]: Joi.object({
    name: Joi.string().min(2).max(50).messages({
      "string.base": `name should be a type of string`,
    }),
    age: Joi.number().min(16).max(100),
    gender: Joi.string().valid(...GENDERS),
    avgMark: Joi.number().min(1).max(12),
    onDuty: Joi.boolean(),
  })
    .min(1)
    .messages({ "object.min": `body should contain at least one field` }),
};
