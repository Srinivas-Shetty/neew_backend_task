const fs = require('fs');
const path = require('path');
const multer = require('multer');

// Define the directory path relative to the backend directory
// const imageDir = path.join(__dirname, '../../frontend-react/src/imagesBackend');
const imageDir = path.join(__dirname, '../images');


// Ensure the directory exists
if (!fs.existsSync(imageDir)) {
    fs.mkdirSync(imageDir, { recursive: true });
}

// Set up the storage destination and filename
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, imageDir);
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
    }
});

// Set up the upload middleware with file size limit
const fileSizeLimit = 5 * 1024 * 1024; // 1MB
const upload = multer({
    storage: storage,
    limits: {
        fileSize: fileSizeLimit
    }
});

module.exports = upload;
