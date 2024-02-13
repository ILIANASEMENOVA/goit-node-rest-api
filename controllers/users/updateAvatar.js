import path from "path";
import { promises as fs } from "fs";
import { dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { User } from "../../models/users.js";
import Jimp from "jimp";

export const updateAvatar = async (req, res, next) => {
  try {
    const __dirname = dirname(fileURLToPath(import.meta.url));
    const avatarsDir = path.join(__dirname, "..", "..", "public", "avatars");

    const { _id } = req.user;
    const { path: tempUpload, originalname } = req.file;
    const avatar = await Jimp.read(tempUpload);
    await avatar.autocrop().cover(250, 250).writeAsync(tempUpload);
    const filename = `${_id}_${originalname}`;
    const resultUpload = path.join(avatarsDir, filename);
    await fs.rename(tempUpload, resultUpload);
    const avatarURL = path.join("avatars", filename);
    await User.findByIdAndUpdate(_id, { avatarURL });

    res.json({
      avatarURL,
    });
  } catch (error) {
    next(error);
  }
};
