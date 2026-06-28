const RecruiterProfile = require('../models/RecruiterProfile');
const Job = require('../models/Job');

// @desc    Get company profile
// @route   GET /api/recruiter/profile
// @access  Private (Recruiter)
const getCompanyProfile = async (req, res, next) => {
    try {
        let profile = await RecruiterProfile.findOne({ user: req.user.id });
        if (!profile) {
            profile = await RecruiterProfile.create({
                user: req.user.id,
                companyName: `${req.user.name}'s Company`,
                companyDetails: ''
            });
        }
        res.status(200).json({ success: true, data: profile });
    } catch (error) {
        next(error);
    }
};

// @desc    Update company profile
// @route   PUT /api/recruiter/profile
// @access  Private (Recruiter)
const updateCompanyProfile = async (req, res, next) => {
    try {
        const { companyName, companyDetails } = req.body;
        let profile = await RecruiterProfile.findOne({ user: req.user.id });

        if (!profile) {
            profile = await RecruiterProfile.create({
                user: req.user.id,
                companyName: companyName || `${req.user.name}'s Company`,
                companyDetails
            });
        } else {
            profile.companyName = companyName || profile.companyName;
            profile.companyDetails = companyDetails !== undefined ? companyDetails : profile.companyDetails;
            await profile.save();
        }

        res.status(200).json({ success: true, data: profile });
    } catch (error) {
        next(error);
    }
};

// @desc    Post a new job
// @route   POST /api/recruiter/jobs
// @access  Private (Recruiter)
const createJob = async (req, res, next) => {
    try {
        const { title, category, location, description } = req.body;

        if (!title || !category || !location || !description) {
            res.status(400);
            return next(new Error('Please add all fields to post a job'));
        }

        const job = await Job.create({
            title,
            category,
            location,
            description,
            recruiter: req.user.id
        });

        res.status(201).json({ success: true, data: job });
    } catch (error) {
        next(error);
    }
};

// @desc    Get jobs posted by the logged-in recruiter
// @route   GET /api/recruiter/my-jobs
// @access  Private (Recruiter)
const getRecruiterJobs = async (req, res, next) => {
    try {
        const jobs = await Job.find({ recruiter: req.user.id });
        res.status(200).json({ success: true, count: jobs.length, data: jobs });
    } catch (error) {
        next(error);
    }
};

// @desc    Get applicants for a specific job
// @route   GET /api/recruiter/jobs/:id/applicants
// @access  Private (Recruiter)
const getJobApplicants = async (req, res, next) => {
    try {
        const job = await Job.findById(req.params.id);
        if (!job) {
            res.status(404);
            return next(new Error('Job not found'));
        }

        // Check if job belongs to recruiter
        if (job.recruiter.toString() !== req.user.id) {
            res.status(403);
            return next(new Error('Not authorized to view applicants for this job'));
        }

        // Find applications for this job and populate seeker details
        const Application = require('../models/Application');
        const applications = await Application.find({ job: req.params.id })
            .populate('seeker', 'name email');

        // Fetch seeker profile for details like resume, education, skills
        const JobSeekerProfile = require('../models/JobSeekerProfile');
        
        const applicantsWithProfiles = await Promise.all(
            applications.map(async (app) => {
                const profile = await JobSeekerProfile.findOne({ user: app.seeker._id });
                return {
                    applicationId: app._id,
                    appliedDate: app.appliedDate,
                    seeker: {
                        _id: app.seeker._id,
                        name: app.seeker.name,
                        email: app.seeker.email,
                        education: profile ? profile.education : '',
                        skills: profile ? profile.skills : [],
                        resumeUrl: profile ? profile.resumeUrl : ''
                    }
                };
            })
        );

        res.status(200).json({ success: true, count: applicantsWithProfiles.length, data: applicantsWithProfiles });
    } catch (error) {
        next(error);
    }
};

module.exports = {
    getCompanyProfile,
    updateCompanyProfile,
    createJob,
    getRecruiterJobs,
    getJobApplicants
};
