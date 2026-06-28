const JobSeekerProfile = require('../models/JobSeekerProfile');

// @desc    Get current job seeker profile
// @route   GET /api/job-seeker/profile
// @access  Private (Seeker)
const getProfile = async (req, res, next) => {
    try {
        let profile = await JobSeekerProfile.findOne({ user: req.user.id });
        if (!profile) {
            // Create default profile matching user
            profile = await JobSeekerProfile.create({
                user: req.user.id,
                name: req.user.name,
                education: '',
                skills: [],
                resumeUrl: ''
            });
        }
        res.status(200).json({ success: true, data: profile });
    } catch (error) {
        next(error);
    }
};

// @desc    Update job seeker profile
// @route   PUT /api/job-seeker/profile
// @access  Private (Seeker)
const updateProfile = async (req, res, next) => {
    try {
        const { name, education, skills } = req.body;
        let profile = await JobSeekerProfile.findOne({ user: req.user.id });

        const processedSkills = typeof skills === 'string' 
            ? skills.split(',').map(s => s.trim()).filter(s => s.length > 0)
            : skills;

        if (!profile) {
            profile = await JobSeekerProfile.create({
                user: req.user.id,
                name: name || req.user.name,
                education,
                skills: processedSkills || []
            });
        } else {
            profile.name = name || profile.name;
            profile.education = education !== undefined ? education : profile.education;
            profile.skills = processedSkills !== undefined ? processedSkills : profile.skills;
            await profile.save();
        }

        res.status(200).json({ success: true, data: profile });
    } catch (error) {
        next(error);
    }
};

// @desc    Upload resume
// @route   POST /api/job-seeker/upload-resume
// @access  Private (Seeker)
const uploadResume = async (req, res, next) => {
    try {
        if (!req.file) {
            res.status(400);
            return next(new Error('Please upload a file'));
        }

        let profile = await JobSeekerProfile.findOne({ user: req.user.id });
        const resumeUrl = `/uploads/${req.file.filename}`;

        if (!profile) {
            profile = await JobSeekerProfile.create({
                user: req.user.id,
                name: req.user.name,
                resumeUrl
            });
        } else {
            profile.resumeUrl = resumeUrl;
            await profile.save();
        }

        res.status(200).json({ success: true, data: profile });
    } catch (error) {
        next(error);
    }
};

module.exports = {
    getProfile,
    updateProfile,
    uploadResume
};
