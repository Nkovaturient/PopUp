const express=require('express');
const userController = require('../controllers/userControllers');
const router=express.Router();


router.post('/signup', userController.registerUser)
router.post('/login', userController.loginUser)
router.get('/:id/dashboard', userController.getUserDashboard)
router.post('/:id/update', userController.updateUser)
router.post('/:id/update/rewards', userController.updateUserRewards)
router.get('/leaderboard', userController.getLeaderboard)
router.get('/all', userController.getAllUsers)

module.exports=router;