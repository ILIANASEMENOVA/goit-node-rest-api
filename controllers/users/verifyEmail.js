import { User } from "../../models/users.js";
import HttpError from "../../helpers/HttpError.js";

export const verifyEmail = async (req, res, next) => {
  try {
    const { verificationToken } = req.params;
    const user = await User.findOne({ verificationToken });
    if (!user) {
      throw HttpError(401, "Email not found");
    }
    await User.findByIdAndUpdate(user._id, {
      verify: true,
      verificationToken: "",
    });

    res.json({
      message: "Email verify success",
    });
  } catch (error) {
    next(error);
  }
};
