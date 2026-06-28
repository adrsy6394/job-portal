require('dotenv').config({ path: require('path').join(__dirname, '.env') });
const mongoose = require('mongoose');
const User = require('./models/User');

const email = process.argv[2];

if (!email) {
    console.log('Usage: node create-admin.js <email>');
    process.exit(1);
}

mongoose.connect(process.env.MONGODB_URI)
    .then(async () => {
        const user = await User.findOne({ email });
        if (!user) {
            console.log(`User with email "${email}" not found. Please register this email in the UI first, then run this script.`);
            process.exit(1);
        }
        user.role = 'admin';
        await user.save();
        console.log(`[SUCCESS] User "${user.name}" (${email}) is now configured as an Admin.`);
        mongoose.connection.close();
        process.exit(0);
    })
    .catch(err => {
        console.error(err);
        process.exit(1);
    });
