import express from "express";
import multer from "multer";
import path from "path";

const app = express();

// Multer setup
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./uploads"); // folder where files will be saved
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage });

// Create uploads folder if not exists
import fs from "fs";
if (!fs.existsSync("./uploads")) {
  fs.mkdirSync("./uploads");
}

// Test route
app.post("/upload", upload.fields([
  { name: "avatar", maxCount: 1 },
  { name: "coverImage", maxCount: 1 },
]), (req, res) => {
  console.log("Files received:", req.files);
  console.log("Body fields:", req.body);
  res.json({ message: "Files uploaded successfully", files: req.files });
});

// Start server
const PORT = 8000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
