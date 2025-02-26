const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    score: { type: Number, default: 0 },
    tokens: { type: Number, default: 0 },
    completedChallenges: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Challenge' }],
    createdAt: { type: Date, default: Date.now },
});

const User = mongoose.model('User', UserSchema);
module.exports= User;
