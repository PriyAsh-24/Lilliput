const express=require('express');
const router=express.Router();
const {handleGeneerateNewShortURL , handleGetAnalytics}=require('../controllers/url');

router
.post('/',handleGeneerateNewShortURL);

router.get('/analytics/:shortId',handleGetAnalytics);

module.exports= router;