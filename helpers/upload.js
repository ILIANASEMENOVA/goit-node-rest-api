import multer from "multer";
import path from "path";

import { dirname } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const tempDir = path.join(__dirname, "../", "temp");

const multerConfig = multer.diskStorage({ destination: tempDir });
export const upload = multer({ storage: multerConfig });
