import express from "express";
import multer from "multer";

const router = express.Router();

const storage = multer.diskStorage({
    destination(req, file, cb) {
        cb(null, "uploads/");
    },
    filename(req, file, cb) {
        cb(null, file.originalname);
    },
});

function checkFileType(file, cb) {
    if (file.mimetype.startsWith("image")) {
        cb(null, true);
    } else {
        cb("Images only!", false);
    }
}

const upload = multer({
    storage,
    fileFilter: (req, file, cb) => {
        checkFileType(file, cb);
    },
});

router.post("/", upload.single("image"), (req, res) => {
    const filePath = req.file.path.replace(/\\/g, "/");
    res.json({ url: `/${filePath}` });
});

export default router;