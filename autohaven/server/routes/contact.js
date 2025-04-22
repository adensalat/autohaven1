const express = require('express');
const router = express.Router();

router.post('/', (req, res) => {
  // In a real application, you would handle email sending here
  // For simplicity, we're just returning a success message
  res.status(200).json({ success: true, message: 'Message sent successfully' });
});

module.exports = router;