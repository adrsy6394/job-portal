const express = require('express');
const { getJobs, getJobById, applyToJob, getAppliedJobs } = require('../controllers/jobController');
const { protect, authorize } = require('../middleware/authMiddleware');

const router = express.Router();

router.get('/', getJobs);
router.get('/seeker/applied', protect, authorize('seeker'), getAppliedJobs);
router.get('/:id', getJobById);
router.post('/:id/apply', protect, authorize('seeker'), applyToJob);

module.exports = router;
