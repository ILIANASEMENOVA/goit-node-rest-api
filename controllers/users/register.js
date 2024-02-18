import bcrypt from "bcrypt";
import HttpError from "../../helpers/HttpError.js";
import { sendEmail } from "../../helpers/sendEmail.js";
import { User } from "../../models/users.js";
import gravatar from "gravatar";
import { nanoid } from "nanoid";

export const register = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const { BASE_URL } = process.env;
    console.log(process.env.BASE_URL);

    const user = await User.findOne({ email });

    if (user) {
      throw HttpError(409, "Email already in use");
    }

    const hashPassword = await bcrypt.hash(password, 10);
    const avatarURL = gravatar.url(email);
    const verificationToken = nanoid();

    const newUser = await User.create({
      ...req.body,
      password: hashPassword,
      avatarURL,
      verificationToken,
    });

    const verifyEmail = {
      to: email,
      subject: " verify email",
      html: `<a target='_blank' href='${BASE_URL}/users/verify/${verificationToken}'>click verify email</a>`,
    };
    await sendEmail(verifyEmail);

    res.status(201).json({
      email: newUser.email,
      name: newUser.name,
    });
  } catch (error) {
    next(error);
  }
};
