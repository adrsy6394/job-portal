const express = require('express');
const { getProfile, updateProfile, uploadResume } = require('../controllers/jobSeekerController');
const { protect, authorize } = require('../middleware/authMiddleware');
const upload = require('../middleware/uploadMiddleware');

const router = express.Router();

router.route('/profile')
    .get(protect, authorize('seeker'), getProfile)
    .put(protect, authorize('seeker'), updateProfile);

router.post('/upload-resume', protect, authorize('seeker'), upload.single('resume'), uploadResume);

module.exports = router;
