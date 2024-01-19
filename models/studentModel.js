const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: true
    },
    stack: {
        type: String,
        enum: ['Backend', 'Frontend'],
        required: true
    },
    profileImage: {
        type: String,
        required: true
    }
}, {timestamps: true})


const User = mongoose.model('User', userSchema);

module.exports = User
