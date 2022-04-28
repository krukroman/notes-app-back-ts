const express = require('express');

const router = express.Router();

router.get('/');
router.post('/');
router.get('/stats');
router.get('/:id');
router.patch('/:id');
router.patch('/:id/archived');
router.delete('/:id');

module.exports = router;
