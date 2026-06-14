const Offer = require("../models/Offer");

// ✅ List all offers
exports.listOffer = async (req, res) => {
  try {
    const offers = await Offer.find().sort({ createdAt: -1 });
    res.status(200).json(offers);
  } catch (error) {
    res.status(500).json({ message: "Error listing offers", error: error.message });
  }
};

// ✅ Create new offer
exports.createOffer = async (req, res) => {
  try {
    const { title, offer_name } = req.body;
    const offer_image = req.file ? `/uploads/${req.file.filename}` : null;

    const newOffer = new Offer({ title, offer_name, offer_image });
    await newOffer.save();

    res.status(201).json({ success: true, offer: newOffer });
  } catch (error) {
    res.status(500).json({ message: "Error creating offer", error: error.message });
  }
};

// ✅ Get offer by ID
exports.getOfferById = async (req, res) => {
  try {
    const offer = await Offer.findById(req.params.id);
    if (!offer) return res.status(404).json({ message: "Offer not found" });
    res.status(200).json(offer);
  } catch (error) {
    res.status(500).json({ message: "Error fetching offer", error: error.message });
  }
};

// ✅ Update offer
exports.updateOffer = async (req, res) => {
  try {
    const { title, offer_name } = req.body;
    const updateData = { title, offer_name };

    if (req.file) updateData.offer_image = `/uploads/${req.file.filename}`;

    const offer = await Offer.findByIdAndUpdate(req.params.id, updateData, { new: true });
    if (!offer) return res.status(404).json({ message: "Offer not found" });

    res.status(200).json({ success: true, offer });
  } catch (error) {
    res.status(500).json({ message: "Error updating offer", error: error.message });
  }
};

// ✅ Delete offer
exports.deleteOffer = async (req, res) => {
  try {
    const offer = await Offer.findByIdAndDelete(req.params.id);
    if (!offer) return res.status(404).json({ message: "Offer not found" });

    res.status(200).json({ success: true, message: "Offer deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting offer", error: error.message });
  }
};
