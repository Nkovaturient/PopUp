const Challenge = require('../models/Challenge');
const User = require('../models/User');

const challengeController = {
    // Get all challenges
    getAllChallenges: async (req, res) => {
        try {
            const challenges = await Challenge.find({})
                .populate('creator', 'username email')
                .sort({ createdAt: -1 });
            res.json(challenges);
        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    },

    // Get challenge by ID
    getChallengeById: async (req, res) => {
        try {
            const challenge = await Challenge.findById(req.params.id)
                .populate('creator', 'username email');
            
            if (!challenge) {
                return res.status(404).json({ message: "Challenge not found" });
            }
            
            res.json(challenge);
        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    },

    // Create a new challenge
    createChallenge: async (req, res) => {
        const { title, description, theme, reward, creator } = req.body;
        
        try {
            // Validate creator exists
            const userExists = await User.findById(creator);
            if (!userExists) {
                return res.status(404).json({ message: "Creator user not found" });
            }

            const challenge = new Challenge({ 
                title, 
                description, 
                theme, 
                reward, 
                creator 
            });
            
            await challenge.save();
            
            res.status(201).json(challenge);
        } catch (err) {
            res.status(400).json({ message: err.message });
        }
    },

    // Update a challenge
    updateChallenge: async (req, res) => {
        try {
            const { title, description, theme, reward } = req.body;
            const challenge = await Challenge.findById(req.params.id);
            
            if (!challenge) {
                return res.status(404).json({ message: "Challenge not found" });
            }
            
            challenge.title = title || challenge.title;
            challenge.description = description || challenge.description;
            challenge.theme = theme || challenge.theme;
            challenge.reward = reward || challenge.reward;
            
            const updatedChallenge = await challenge.save();
            res.json(updatedChallenge);
        } catch (err) {
            res.status(400).json({ message: err.message });
        }
    },

    // Delete a challenge
    deleteChallenge: async (req, res) => {
        try {
            const challenge = await Challenge.findById(req.params.id);
            
            if (!challenge) {
                return res.status(404).json({ message: "Challenge not found" });
            }
            
            await Challenge.deleteOne({ _id: req.params.id });
            res.json({ message: "Challenge deleted successfully" });
        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    },

    // Complete a challenge and reward the user
    completeChallenge: async (req, res) => {
        const { userId, challengeId } = req.body;

        try {
            // Find the user
            const user = await User.findById(userId);
            if (!user) {
                return res.status(404).json({ message: "User not found" });
            }

            // Find the challenge
            const challenge = await Challenge.findById(challengeId);
            if (!challenge) {
                return res.status(404).json({ message: "Challenge not found" });
            }

            // Check if user has already completed this challenge
            if (user.completedChallenges && user.completedChallenges.includes(challengeId)) {
                return res.status(400).json({ message: "Challenge already completed by this user" });
            }

            // Update user score, tokens, and completed challenges
            user.score += 10;
            user.tokens += 5;
            
            // Initialize completedChallenges array if it doesn't exist
            if (!user.completedChallenges) {
                user.completedChallenges = [];
            }
            
            user.completedChallenges.push(challengeId);
            await user.save();

            res.status(200).json({ 
                message: "Challenge completed, rewards added!", 
                user: {
                    id: user._id,
                    score: user.score,
                    tokens: user.tokens
                }
            });
        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    },

    // Get challenges by theme
    getChallengesByTheme: async (req, res) => {
        try {
            const { theme } = req.params;
            const challenges = await Challenge.find({ theme })
                .populate('creator', 'username email')
                .sort({ createdAt: -1 });
            
            res.json(challenges);
        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    },

    // Get challenges created by a specific user
    getUserChallenges: async (req, res) => {
        try {
            const { userId } = req.params;
            const challenges = await Challenge.find({ creator: userId })
                .sort({ createdAt: -1 });
            
            res.json(challenges);
        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    },

    // Get popular challenges
    getPopularChallenges: async (req, res) => {
        try {
            // This is a simplified approach - in a real app, you'd track completions in a separate collection
            const users = await User.find({}, 'completedChallenges');
            
            // Count challenge completions
            const challengeCompletions = {};
            users.forEach(user => {
                if (user.completedChallenges) {
                    user.completedChallenges.forEach(challengeId => {
                        const id = challengeId.toString();
                        challengeCompletions[id] = (challengeCompletions[id] || 0) + 1;
                    });
                }
            });
            
            // Convert to array and sort
            const popularChallengeIds = Object.keys(challengeCompletions)
                .sort((a, b) => challengeCompletions[b] - challengeCompletions[a])
                .slice(0, 5);
            
            // Fetch challenge details
            const popularChallenges = await Challenge.find({
                _id: { $in: popularChallengeIds }
            }).populate('creator', 'username');
            
            // Sort by popularity
            popularChallenges.sort((a, b) => {
                return challengeCompletions[b._id.toString()] - challengeCompletions[a._id.toString()];
            });
            
            res.json(popularChallenges);
        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    }
};

module.exports = challengeController;