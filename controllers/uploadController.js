const multer = require('multer');
const path = require('path');

// Configure multer storage
const storage = multer.diskStorage({
	destination: (req, file, cb) => {
		cb(null, 'uploads/');
	},
	filename: (req, file, cb) => {
		cb(null, `${Date.now()}-${file.originalname}`);
	}
});

// Initialize upload middleware
const upload = multer({ storage });

// Controller to handle file upload
const uploadFile = (req, res) => {
	if (!req.file) {
		return res.status(400).json({ message: 'No file uploaded.' });
	}
	res.status(200).json({
		message: 'File uploaded successfully.',
		fileUrl: `/uploads/${req.file.filename}`
	});
};

module.exports = { upload, uploadFile };
