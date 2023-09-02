import multer, { FileFilterCallback } from "multer";
import path from "path";
import { Request } from "express";

const upload = multer({
  storage: multer.diskStorage({}),
  fileFilter: (req: Request, file: Express.Multer.File, cb: FileFilterCallback) => {
    let extension = path.extname(file.originalname).toLowerCase();

    if (extension !== ".jpg" && extension !== ".jpeg" && extension !== ".png") {
    } else {
      cb(null, true);
    }
  },
});

export default upload;
