const mongoose = require('mongoose');

const ChallengeSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String },
    theme: { type: String, required: true },
    reward: { type: String, required: true },
    creator: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    createdAt: { type: Date, default: Date.now },
}, { toJSON: { getters: true } });

const Challenge= mongoose.model('Challenge', ChallengeSchema);
module.exports= Challenge;
