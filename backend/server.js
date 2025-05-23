const express = require("express");
const multer = require("multer");
const cors = require("cors");
const path = require("path");
const fs = require("fs");
const mongoose = require("mongoose");

const connectDB = require("./db");
const FormData = require("./models/FormData");

connectDB();

const app = express();
const PORT = process.env.PORT || 5000;

if (!fs.existsSync("uploads")) {
  fs.mkdirSync("uploads");
}

app.use(cors());
app.use(express.json());
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const fileFilter = (req, file, cb) => {
  const allowedFileTypes = /jpeg|jpg|png|gif|pdf/;
  const extname = allowedFileTypes.test(
    path.extname(file.originalname).toLowerCase()
  );
  const mimetype = allowedFileTypes.test(file.mimetype);

  if (extname && mimetype) {
    return cb(null, true);
  } else {
    cb("Error: Only JPEG, PNG, GIF and PDF files are allowed!");
  }
};

const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 },
  fileFilter,
});

app.post("/api/form-data", upload.single("file"), async (req, res) => {
  try {
    const { name, description } = req.body;

    if (!req.file) {
      return res.status(400).json({ error: "No file uploaded" });
    }

    const filePath = req.file.path;
    const newFormData = new FormData({
      name,
      description,
      filePath,
      originalFilename: req.file.originalname,
    });

    const savedData = await newFormData.save();

    res.status(201).json({
      message: "Form data saved successfully",
      data: savedData,
    });
  } catch (error) {
    console.error("Error saving form data:", error);
    res.status(500).json({ error: "Server error" });
  }
});

app.get("/api/form-data", async (req, res) => {
  try {
    const formData = await FormData.find().sort({ createdAt: -1 });

    res.status(200).json({
      data: formData,
    });
  } catch (error) {
    console.error("Error fetching form data:", error);
    res.status(500).json({ error: "Server error" });
  }
});

app.delete("/api/form-data/:id", async (req, res) => {
  try {
    const formData = await FormData.findById(req.params.id);

    if (!formData) {
      return res.status(404).json({ error: "Data not found" });
    }

    if (formData.filePath && fs.existsSync(formData.filePath)) {
      fs.unlinkSync(formData.filePath);
    }

    await FormData.findByIdAndDelete(req.params.id);

    res.status(200).json({ message: "Data deleted successfully" });
  } catch (error) {
    console.error("Error deleting form data:", error);
    res.status(500).json({ error: "Server error" });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
