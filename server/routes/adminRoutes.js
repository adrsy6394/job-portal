const express = require('express');
const { 
    getUsers, 
    deleteUser, 
    getJobs, 
    deleteJob, 
    getApplications, 
    deleteApplication 
} = require('../controllers/adminController');
const { protect, authorize } = require('../middleware/authMiddleware');

const router = express.Router();

// Apply protect & authorize('admin') to all routes in this file
router.use(protect);
router.use(authorize('admin'));

router.route('/users')
    .get(getUsers);

router.route('/users/:id')
    .delete(deleteUser);

router.route('/jobs')
    .get(getJobs);

router.route('/jobs/:id')
    .delete(deleteJob);

router.route('/applications')
    .get(getApplications);

router.route('/applications/:id')
    .delete(deleteApplication);

module.exports = router;
