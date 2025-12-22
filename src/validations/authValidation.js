import { Joi, Segments } from "celebrate";

export const createUserBodySchema = {
  [Segments.BODY]: Joi.object({
    name: Joi.string().min(2).max(50).messages({
      "string.base": `name should be a type of string`,
    }),
    email: Joi.string().email().required(),
    password: Joi.string().min(8).max(30).required(),
  }),
};

export const loginUserBodySchema = {
  [Segments.BODY]: Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  }),
};
