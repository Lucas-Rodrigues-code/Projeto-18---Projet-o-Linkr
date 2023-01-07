import joi from "joi";

export const userSchema = joi.object({
  email: joi.string().email().required(),
  password: joi.string().required().min(3),
  name: joi.string().required().min(3),
  pictureUrl: joi.string().required(),
});

export const userSchemaLogin = joi.object({
  email: joi.string().email().required(),
  password: joi.string().required().min(3),
});