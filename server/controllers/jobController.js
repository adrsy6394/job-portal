const Job = require('../models/Job');
const Application = require('../models/Application');

// @desc    Get all jobs (with optional search query)
// @route   GET /api/jobs
// @access  Public
const getJobs = async (req, res, next) => {
    try {
        const { title, location, category } = req.query;
        let query = {};

        if (title) {
            query.title = { $regex: title, $options: 'i' };
        }
        if (location) {
            query.location = { $regex: location, $options: 'i' };
        }
        if (category && category !== 'All') {
            query.category = { $regex: category, $options: 'i' };
        }

        const jobs = await Job.find(query).populate('recruiter', 'name email');
        res.status(200).json({ success: true, count: jobs.length, data: jobs });
    } catch (error) {
        next(error);
    }
};

// @desc    Get single job by ID
// @route   GET /api/jobs/:id
// @access  Public
const getJobById = async (req, res, next) => {
    try {
        const job = await Job.findById(req.params.id).populate('recruiter', 'name email');
        if (!job) {
            res.status(404);
            return next(new Error('Job not found'));
        }
        res.status(200).json({ success: true, data: job });
    } catch (error) {
        next(error);
    }
};

// @desc    Apply to a job
// @route   POST /api/jobs/:id/apply
// @access  Private (Seeker)
const applyToJob = async (req, res, next) => {
    try {
        const job = await Job.findById(req.params.id);
        if (!job) {
            res.status(404);
            return next(new Error('Job not found'));
        }

        // Check if already applied
        const alreadyApplied = await Application.findOne({
            job: req.params.id,
            seeker: req.user.id
        });

        if (alreadyApplied) {
            res.status(400);
            return next(new Error('You have already applied for this job'));
        }

        // Create application
        const application = await Application.create({
            job: req.params.id,
            seeker: req.user.id
        });

        res.status(201).json({
            success: true,
            message: 'Successfully applied to job',
            data: application
        });
    } catch (error) {
        next(error);
    }
};

// @desc    Get seeker applied jobs
// @route   GET /api/jobs/seeker/applied
// @access  Private (Seeker)
const getAppliedJobs = async (req, res, next) => {
    try {
        const applications = await Application.find({ seeker: req.user.id })
            .populate({
                path: 'job',
                populate: { path: 'recruiter', select: 'name email' }
            });

        res.status(200).json({ success: true, count: applications.length, data: applications });
    } catch (error) {
        next(error);
    }
};

module.exports = {
    getJobs,
    getJobById,
    applyToJob,
    getAppliedJobs
};
