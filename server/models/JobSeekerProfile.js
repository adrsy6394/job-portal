const mongoose = require('mongoose');

const JobSeekerProfileSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
        unique: true
    },
    name: {
        type: String,
        required: true
    },
    education: {
        type: String,
        default: ''
    },
    skills: {
        type: [String],
        default: []
    },
    resumeUrl: {
        type: String,
        default: ''
    }
});

module.exports = mongoose.model('JobSeekerProfile', JobSeekerProfileSchema);
