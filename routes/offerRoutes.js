const express = require("express");
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const Offer = require("../models/Offer");

const router = express.Router();

// ✅ Ensure uploads folder exists
const uploadDir = path.join(process.cwd(), "uploads");
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// ✅ Multer storage config
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, uploadDir),
  filename: (req, file, cb) => cb(null, Date.now() + path.extname(file.originalname)),
});

const upload = multer({ storage });

// ✅ Create Offer
router.post("/", upload.single("offer_image"), async (req, res) => {
  try {
    const { title, offer_name } = req.body;
    const image = req.file ? `/uploads/${req.file.filename}` : null;

    const offer = new Offer({ title, offer_name, offer_image: image });
    await offer.save();
    res.status(201).json(offer);
  } catch (err) {
    console.error("Offer upload error:", err);
    res.status(500).json({ error: "Server error" });
  }
});

// ✅ Get all offers
router.get("/", async (req, res) => {
  try {
    const offers = await Offer.find().sort({ createdAt: -1 });
    res.json(offers);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

// ✅ Get single offer by ID
router.get("/:id", async (req, res) => {
  try {
    const offer = await Offer.findById(req.params.id);
    if (!offer) return res.status(404).json({ error: "Offer not found" });
    res.json(offer);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

// ✅ Update offer
router.put("/:id", upload.single("offer_image"), async (req, res) => {
  try {
    const { title, offer_name } = req.body;
    const updateData = { title, offer_name };
    if (req.file) updateData.offer_image = `/uploads/${req.file.filename}`;

    const offer = await Offer.findByIdAndUpdate(req.params.id, updateData, { new: true });
    if (!offer) return res.status(404).json({ error: "Offer not found" });

    res.json(offer);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

// ✅ Delete offer
router.delete("/:id", async (req, res) => {
  try {
    const offer = await Offer.findByIdAndDelete(req.params.id);
    if (!offer) return res.status(404).json({ error: "Offer not found" });
    res.json({ message: "Offer deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;
