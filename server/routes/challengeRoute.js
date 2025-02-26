const express=require('express');
const challengeController = require('../controllers/challengeController');
const router=express.Router();


router.post('/create', challengeController.createChallenge)
router.put('/update/:id', challengeController.updateChallenge)
router.delete('/delete/:id', challengeController.deleteChallenge)
router.get('/', challengeController.getAllChallenges)
router.get('/:id', challengeController.getChallengeById)
router.get('/:theme', challengeController.getChallengesByTheme )
router.get('/trending', challengeController.getPopularChallenges)
router.get('/user/:userId', challengeController.getUserChallenges)

module.exports=router;