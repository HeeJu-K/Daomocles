import { diskStorage } from 'multer';
import { extname } from 'path';
import * as path from 'path';

export const multerConfig = {
  storage: diskStorage({
    destination: (req, file, cb) => {
      cb(null, 'tmp/');
    },
    filename: (req, file, cb) => {
      const randomName = Array(32)
        .fill(null)
        .map(() => Math.round(Math.random() * 16).toString(16))
        .join('');
      cb(null, `${randomName}${extname(file.originalname)}`);
    },
  }),
  fileFilter: (req, file, cb) => {
    const filetypes = /csv/;
    const mimetype = filetypes.test(file.mimetype);
    const extname = filetypes.test(
      path.extname(file.originalname).toLowerCase(),
    );
    if (mimetype && extname) {
      return cb(null, true);
    }
    cb(new Error('Only CSV files are allowed'));
  },
};
