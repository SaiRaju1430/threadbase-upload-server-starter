import express from "express";
import upload from "../config/upload.js";
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();

// verifyToken runs first, then multer parses the file
router.post("/upload", verifyToken, upload.single("avatar"), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: "No file uploaded" });
  }

  // build the public URL the client can use as an <img src>
  const url = `/uploads/${req.file.filename}`;
  res.status(201).json({ url, filename: req.file.filename });
});

// Error handling middleware for upload errors (file filter rejection, file size limit)
router.use((err, req, res, next) => {
  if (err) {
    return res.status(400).json({ error: err.message });
  }
  next(err);
});

export default router;
