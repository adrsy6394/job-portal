const User = require('../models/User');
const Job = require('../models/Job');
const Application = require('../models/Application');
const JobSeekerProfile = require('../models/JobSeekerProfile');
const RecruiterProfile = require('../models/RecruiterProfile');

// @desc    Get all users
// @route   GET /api/admin/users
// @access  Private (Admin)
const getUsers = async (req, res, next) => {
    try {
        const users = await User.find({ role: { $ne: 'admin' } });
        res.status(200).json({ success: true, count: users.length, data: users });
    } catch (error) {
        next(error);
    }
};

// @desc    Delete user
// @route   DELETE /api/admin/users/:id
// @access  Private (Admin)
const deleteUser = async (req, res, next) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) {
            res.status(404);
            return next(new Error('User not found'));
        }

        if (user.role === 'seeker') {
            await JobSeekerProfile.findOneAndDelete({ user: req.params.id });
            await Application.deleteMany({ seeker: req.params.id });
        } else if (user.role === 'recruiter') {
            await RecruiterProfile.findOneAndDelete({ user: req.params.id });
            const recruiterJobs = await Job.find({ recruiter: req.params.id });
            const jobIds = recruiterJobs.map(j => j._id);
            await Application.deleteMany({ job: { $in: jobIds } });
            await Job.deleteMany({ recruiter: req.params.id });
        }

        await User.findByIdAndDelete(req.params.id);
        res.status(200).json({ success: true, message: 'User deleted successfully' });
    } catch (error) {
        next(error);
    }
};

// @desc    Get all jobs
// @route   GET /api/admin/jobs
// @access  Private (Admin)
const getJobs = async (req, res, next) => {
    try {
        const jobs = await Job.find().populate('recruiter', 'name email');
        res.status(200).json({ success: true, count: jobs.length, data: jobs });
    } catch (error) {
        next(error);
    }
};

// @desc    Delete job
// @route   DELETE /api/admin/jobs/:id
// @access  Private (Admin)
const deleteJob = async (req, res, next) => {
    try {
        const job = await Job.findById(req.params.id);
        if (!job) {
            res.status(404);
            return next(new Error('Job not found'));
        }

        await Application.deleteMany({ job: req.params.id });
        await Job.findByIdAndDelete(req.params.id);

        res.status(200).json({ success: true, message: 'Job deleted successfully' });
    } catch (error) {
        next(error);
    }
};

// @desc    Get all applications
// @route   GET /api/admin/applications
// @access  Private (Admin)
const getApplications = async (req, res, next) => {
    try {
        const applications = await Application.find()
            .populate('seeker', 'name email')
            .populate('job', 'title category location');
        res.status(200).json({ success: true, count: applications.length, data: applications });
    } catch (error) {
        next(error);
    }
};

// @desc    Delete application
// @route   DELETE /api/admin/applications/:id
// @access  Private (Admin)
const deleteApplication = async (req, res, next) => {
    try {
        const application = await Application.findById(req.params.id);
        if (!application) {
            res.status(404);
            return next(new Error('Application not found'));
        }

        await Application.findByIdAndDelete(req.params.id);
        res.status(200).json({ success: true, message: 'Application deleted successfully' });
    } catch (error) {
        next(error);
    }
};

module.exports = {
    getUsers,
    deleteUser,
    getJobs,
    deleteJob,
    getApplications,
    deleteApplication
};
