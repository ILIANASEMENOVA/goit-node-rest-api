import { Schema, model } from "mongoose";

import Joi from "joi";
import { handleMongooseError } from "../helpers/handleMongooseError.js";

const emailRegaxp = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

const userSchema = new Schema({
  password: {
    type: String,
    required: [true, "Set password for user"],
    minlength: 6,
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: true,
    match: emailRegaxp,
  },
  subscription: {
    type: String,
    enum: ["starter", "pro", "business"],
    default: "starter",
  },
  token: String,
  avatarURL: String,
});

userSchema.post("save", handleMongooseError);

const registerSchema = Joi.object({
  password: Joi.string().min(6).required(),
  email: Joi.string().pattern(emailRegaxp).required(),
  subscription: Joi.string(),
});

const loginSchema = Joi.object({
  password: Joi.string().min(6).required(),
  email: Joi.string().pattern(emailRegaxp).required(),
});

export default {
  registerSchema,
  loginSchema,
};

export const User = model("user", userSchema);
