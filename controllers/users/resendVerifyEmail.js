import { User } from "../../models/users.js";
import HttpError from "../../helpers/HttpError.js";
import { sendEmail } from "../../helpers/sendEmail.js";

export const resendVerifyEmail = async (req, res, next) => {
  try {
    const { email } = req.body;
    const { BASE_URL } = process.env;

    const user = await User.findOne({ email });
    if (!user) {
      throw HttpError(401, "Email not found");
    }
    if (user.verify) {
      throw HttpError(401, "Email already verify");
    }

    const verifyEmail = {
      to: email,
      subject: "Verify email",
      html: `<a target="_blank" href="${BASE_URL}/users/verify/${user.verificationToken}">Click verify email</a>`,
    };

    await sendEmail(verifyEmail);

    res.json({
      message: "Verify email send success",
    });
  } catch (error) {
    next(error);
  }
};
