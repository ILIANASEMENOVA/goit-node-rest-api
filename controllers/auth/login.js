import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import HttpError from "../../helpers/HttpError.js";
import { User } from "../../models/user.js";

export const login = async (req, res, next) => {
  try {
    const { SECRET_KEY } = process.env;
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      throw HttpError(401, "Email or password invalid");
    }
    const passwordCompare = await bcrypt.compare(password, user.password);
    if (!passwordCompare) {
      throw HttpError(401, "Email or password invalid");
    }

    const payload = {
      id: user._id,
    };
    console.log(process.env);
    console.log(SECRET_KEY);
    const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "23h" });
    await User.findByIdAndUpdate(user._id, { token });

    res.json({
      token,
    });
  } catch (error) {
    next(error);
  }
};
