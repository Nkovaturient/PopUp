const User = require('../models/User');
const Challenge = require('../models/Challenge');
const mongoose = require('mongoose');

const analyticsController = {
    // Get top users by score
    getTopUsers: async (req, res) => {
        try {
            const limit = parseInt(req.query.limit) || 5;
            const users = await User.find({}, 'username score tokens')
                .sort({ score: -1 })
                .limit(limit);
            
            res.json(users);
        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    },

    // Get most popular challenges
    getPopularChallenges: async (req, res) => {
        try {
            // This would ideally use a CompletedChallenge model or similar
            // For now, we'll use a simpler approach based on the existing model
            const challenges = await Challenge.aggregate([
                {
                    $lookup: {
                        from: 'users',
                        localField: '_id',
                        foreignField: 'completedChallenges',
                        as: 'completedBy'
                    }
                },
                {
                    $project: {
                        title: 1,
                        theme: 1,
                        description: 1,
                        reward: 1,
                        completionCount: { $size: '$completedBy' }
                    }
                },
                { $sort: { completionCount: -1 } },
                { $limit: 5 }
            ]);
            
            res.json(challenges);
        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    },

    // Get challenges by theme distribution
    getChallengesByTheme: async (req, res) => {
        try {
            const themeDistribution = await Challenge.aggregate([
                { $group: { _id: "$theme", count: { $sum: 1 } } },
                { $sort: { count: -1 } }
            ]);
            
            res.json(themeDistribution);
        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    },

    // Get user activity over time
    getUserActivityOverTime: async (req, res) => {
        try {
            // This would ideally use a UserActivity model that tracks when users complete challenges
            // For now, we'll use a simpler approach based on user creation dates
            const timeRange = req.query.range || 'week'; // 'day', 'week', 'month', 'year'
            
            let dateFormat;
            let daysToLookBack;
            
            switch(timeRange) {
                case 'day':
                    dateFormat = { $dateToString: { format: "%Y-%m-%d %H", date: "$createdAt" } };
                    daysToLookBack = 1;
                    break;
                case 'week':
                    dateFormat = { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } };
                    daysToLookBack = 7;
                    break;
                case 'month':
                    dateFormat = { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } };
                    daysToLookBack = 30;
                    break;
                case 'year':
                    dateFormat = { $dateToString: { format: "%Y-%m", date: "$createdAt" } };
                    daysToLookBack = 365;
                    break;
                default:
                    dateFormat = { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } };
                    daysToLookBack = 7;
            }
            
            const cutoffDate = new Date();
            cutoffDate.setDate(cutoffDate.getDate() - daysToLookBack);
            
            const userActivity = await User.aggregate([
                { $match: { createdAt: { $gte: cutoffDate } } },
                { $group: { _id: dateFormat, count: { $sum: 1 } } },
                { $sort: { _id: 1 } }
            ]);
            
            res.json(userActivity);
        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    },

    // Get platform summary statistics
    getPlatformStats: async (req, res) => {
        try {
            const totalUsers = await User.countDocuments();
            const totalChallenges = await Challenge.countDocuments();
            
            // Calculate total completions (this is an approximation)
            const completionsData = await User.aggregate([
                { $project: { completionCount: { $size: "$completedChallenges" } } },
                { $group: { _id: null, total: { $sum: "$completionCount" } } }
            ]);
            
            const totalCompletions = completionsData.length > 0 ? completionsData[0].total : 0;
            
            // Get average user score
            const scoreData = await User.aggregate([
                { $group: { _id: null, avgScore: { $avg: "$score" } } }
            ]);
            
            const avgUserScore = scoreData.length > 0 ? scoreData[0].avgScore : 0;
            
            res.json({
                totalUsers,
                totalChallenges,
                totalCompletions,
                avgUserScore,
                tokensDistributed: totalCompletions * 10 // Assuming 10 tokens per completion
            });
        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    },

    // Get user engagement metrics
    getUserEngagement: async (req, res) => {
        try {
            // Calculate average challenges completed per user
            const usersWithCompletions = await User.aggregate([
                { $project: { username: 1, completionCount: { $size: "$completedChallenges" } } },
                { $group: { _id: null, avgCompletions: { $avg: "$completionCount" } } }
            ]);
            
            const avgCompletionsPerUser = usersWithCompletions.length > 0 ? usersWithCompletions[0].avgCompletions : 0;
            
            // Calculate user retention (users who have completed at least one challenge)
            const totalUsers = await User.countDocuments();
            const activeUsers = await User.countDocuments({ completedChallenges: { $ne: [] } });
            const retentionRate = totalUsers > 0 ? (activeUsers / totalUsers) * 100 : 0;
            
            res.json({
                avgCompletionsPerUser,
                activeUsers,
                totalUsers,
                retentionRate
            });
        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    }
};

module.exports = analyticsController;