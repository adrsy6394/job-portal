const express = require('express');
const { getCompanyProfile, updateCompanyProfile, createJob, getRecruiterJobs, getJobApplicants } = require('../controllers/recruiterController');
const { protect, authorize } = require('../middleware/authMiddleware');

const router = express.Router();

router.route('/profile')
    .get(protect, authorize('recruiter'), getCompanyProfile)
    .put(protect, authorize('recruiter'), updateCompanyProfile);

router.post('/jobs', protect, authorize('recruiter'), createJob);
router.get('/my-jobs', protect, authorize('recruiter'), getRecruiterJobs);
router.get('/jobs/:id/applicants', protect, authorize('recruiter'), getJobApplicants);

module.exports = router;
