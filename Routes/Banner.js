const express = require('express');
const router = express.Router();
const Banner = require('../Models/Banner');
const { body, validationResult } = require('express-validator');

// POST a new banner
router.post('/api/updatebanner', [
  body('description', 'Description must be atleast 5 characters').isLength({ min: 5 }),
  body('link', 'Link must be atleast 8 characters').isLength({ min: 8 }),
], async (req, res) => {
  const errors = validationResult(req);
  console.log(errors);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { description, timer, link, isVisible } = req.body;

  try {
    const banner = new Banner({ description, timer, link, isVisible });
    const updatedBanner = await Banner.findOneAndUpdate(
      {}, 
      { description, timer, link, isVisible }, 
      { new: true, upsert: true } 
    );

    res.status(200).json(updatedBanner);
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
});

// Get all banners (or only the latest banner if needed)
router.get('/api/getbanner', async (req, res) => {
    try {
      const banners = await Banner.findOne().sort({ _id: -1 });

      res.json(banners);

    } catch (error) {
      console.error(error.message);
      res.status(500).send("Internal Server Error");
    }
  });

module.exports = router;