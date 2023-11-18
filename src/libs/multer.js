import multer from "multer";
import { fileURLToPath } from 'url';
import path from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


export const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(__dirname, "../upload"));

    },
    filename: function (req, file, cb) {
        console.log(file)
        cb(null, `${file.originalname}-${Date.now()}.${file.mimetype.split("/")[1]}`);
    }

});

