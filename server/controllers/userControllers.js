const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const userController = {
    // Get all users
    getAllUsers: async (req, res) => {
        try {
            const users = await User.find({});
            res.json(users);
        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    },


    // Register a new user
    registerUser: async (req, res) => {
        
        const { username, email, password } = req.body;

        try {
            // Check if user already exists
            const existingUser = await User.findOne({ email });
            if (existingUser) {
                return res.status(400).json({ success: false, message: 'User with this email already exists' });
            }

            // Hash password
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(password, salt);

            // Create new user
            const user = new User({
                username,
                email,
                password: hashedPassword,
                score: 0,
                tokens: 0
            });

            await user.save();

            // Generate JWT token
            const token = jwt.sign(
                { id: user._id, email: user.email },
                process.env.JWT_SECRET,
                { expiresIn: '24h' }
            );

            res.status(201).json({
                success: true,
                data: {
                    id: user._id,
                    username: user.username,
                    email: user.email,
                    score: user.score,
                    tokens: user.tokens
                },
                token
            });
        } catch (err) {
            res.status(400).json({ success: false, message: err.message });
        }
    },

    // Login user
    loginUser: async (req, res) => {
        const { email, password } = req.body;

        try {
            // Check if user exists
            const user = await User.findOne({ email });
            if (!user) {
                return res.status(400).json({ success: false, message: 'Invalid credentials' });
            }

            // Validate password
            const isMatch = await bcrypt.compare(password, user.password);
            if (!isMatch) {
                return res.status(400).json({ success: false, message: 'Invalid credentials' });
            }

            // Generate JWT token
            const token = jwt.sign(
                { id: user._id, email: user.email },
                process.env.JWT_SECRET,
                { expiresIn: '24h' }
            );

            res.json({
                success: true,
                data: {
                    id: user._id,
                    username: user.username,
                    email: user.email,
                    score: user.score,
                    tokens: user.tokens
                },
                token
            });
        } catch (err) {
            res.status(500).json({ success: false, message: err.message });
        }
    },

    // Update user profile
    updateUser: async (req, res) => {
        const { username, email } = req.body;

        try {
            const user = await User.findById(req.params.id);
            if (!user) {
                return res.status(404).json({ message: "User not found" });
            }

            user.username = username || user.username;
            user.email = email || user.email;

            const updatedUser = await user.save();
            res.json({
                id: updatedUser._id,
                username: updatedUser.username,
                email: updatedUser.email,
                score: updatedUser.score,
                tokens: updatedUser.tokens
            });
        } catch (err) {
            res.status(400).json({ message: err.message });
        }
    },

    // Get user dashboard data
    getUserDashboard: async (req, res) => {
        try {
            const user = await User.findById(req.params.id, '-password')
                .populate('completedChallenges');
            
            if (!user) {
                return res.status(404).json({ message: "User not found" });
            }

            res.json({
                user: {
                    id: user._id,
                    username: user.username,
                    email: user.email,
                    score: user.score,
                    tokens: user.tokens,
                    completedChallenges: user.completedChallenges || []
                }
            });
        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    },

    // Get user leaderboard
    getLeaderboard: async (req, res) => {
        try {
            const users = await User.find({}, 'username score tokens')
                .sort({ score: -1 })
                .limit(10);
            
            res.json(users);
        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    },

    // Update user score and tokens
    updateUserRewards: async (req, res) => {
        const { userId, challengeId, scoreEarned, tokensEarned } = req.body;

        try {
            const user = await User.findById(userId);
            if (!user) {
                return res.status(404).json({ message: "User not found" });
            }

            // Update user score and tokens
            user.score += scoreEarned || 10;
            user.tokens += tokensEarned || 5;
            
            // Add challenge to completed challenges if not already completed
            if (challengeId && !user.completedChallenges.includes(challengeId)) {
                user.completedChallenges.push(challengeId);
            }

            await user.save();

            res.json({
                success: true,
                data: {
                    id: user._id,
                    username: user.username,
                    score: user.score,
                    tokens: user.tokens
                }
            });
        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    }
};

module.exports = userController;