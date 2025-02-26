import axios from 'axios';

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
});

// Challenge endpoints
export const challengeApi = {
    createChallenge: (data) => api.post('/api/challenges/create', data),
    updateChallenge: (id, data) => api.put(`/api/challenges/update/${id}`, data),
    deleteChallenge: (id) => api.delete(`/api/challenges/delete/${id}`),
    getAllChallenges: () => api.get('/api/challenges'),
    getChallengeById: (id) => api.get(`/api/challenges/${id}`),
    getChallengesByTheme: (theme) => api.get(`/api/challenges/${theme}`),
    getTrendingChallenges: () => api.get('/api/challenges/trending'),
    getUserChallenges: (userId) => api.get(`/api/challenges/user/${userId}`)
};

// User endpoints
export const userApi = {
    signup: (data) => api.post('/api/users/signup', data),
    login: (data) => api.post('/api/users/login', data),
    getDashboard: (id) => api.get(`/api/users/${id}/dashboard`),
    updateUser: (id, data) => api.post(`/api/users/${id}/update`, data),
    updateRewards: (id, data) => api.post(`/api/users/${id}/update/rewards`, data),
    getLeaderboard: () => api.get('/api/users/leaderboard'),
    getAllUsers: () => api.get('/api/users/all')
};

// Analytics endpoints
export const analyticsApi = {
    getPlatformStats: () => api.get('/api/analytics/stats'),
    getTopUsers: () => api.get('/api/analytics/top'),
    getPopularChallenges: () => api.get('/api/analytics/challenges'),
    getChallengesByTheme: (theme) => api.get(`/api/analytics/challenge/${theme}`),
    getEngagement: () => api.get('/api/analytics/engagement'),
    getActivityOverTime: () => api.get('/api/analytics/activity')
};


export default api;