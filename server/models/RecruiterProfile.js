const mongoose = require('mongoose');

const RecruiterProfileSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
        unique: true
    },
    companyName: {
        type: String,
        required: [true, 'Please add a company name']
    },
    companyDetails: {
        type: String,
        default: ''
    }
});

module.exports = mongoose.model('RecruiterProfile', RecruiterProfileSchema);
