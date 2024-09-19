const shortId=require('shortid');
const URL=require('../models/url');

async function handleGeneerateNewShortURL(req,res){
    const body=req.body;
    if(!body.url) return res.status(400).json({error : "URL is Required"});
    const shortid=shortId();
    await URL.create({
        shortId : shortid,
        redirectUrl: body.url,
        // visitedHistory : [],
        createdBy : req.user._id,
    })


    return res.render("home",{
        id : shortid,
    });
}


async function handleGetAnalytics(req,res){
    const shortId=req.params.shortId;
    const entry= await URL.findOne({shortId});
    return res.json({
        totalCounts : entry.visitedHistory.length,
        analytics : entry.visitedHistory
    })
}

module.exports={
    handleGeneerateNewShortURL,
    handleGetAnalytics
}