const express=require('express');
const analyticsController = require('../controllers/analyticsController');
const router=express.Router();


router.get('/stats', analyticsController.getPlatformStats )
router.get('/top', analyticsController.getTopUsers)
router.get('/challenges', analyticsController.getPopularChallenges)
router.get('/challenge/:theme', analyticsController.getChallengesByTheme)
router.get('/engagement', analyticsController.getUserEngagement)
router.get('/activity', analyticsController.getUserActivityOverTime)

module.exports=router;