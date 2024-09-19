const express=require('express');
const path=require('path');
const cookieParser=require('cookie-parser');
const { restrictToLoggedinUserOnly, checkAuth }=require('./middleware/auth')

const urlRoute=require('./routes/url');
const staticRouter=require('./routes/staticRouter');
const userRoute=require('./routes/user');

const URL=require("./models/url");
const { connectToMongoDB }=require('./connection');

const app = express();
const PORT = 8001;

connectToMongoDB('mongodb://localhost:27017/short-url').then(()=> console.log("MongoDb Connected"));

app.set('view engine', 'ejs');
app.set("views",path.resolve('./views'));
app.use(express.json());
app.use(express.urlencoded({ extended : false }));
app.use(cookieParser());

app.use('/url',restrictToLoggedinUserOnly,urlRoute);
app.use('/',checkAuth,staticRouter);
app.use('/user',userRoute);

app.get('/url/:shortId',async (req,res)=>{
    const shortId=req.params.shortId;
    const entry=await URL.findOneAndUpdate({
        shortId,
    },{
        $push : {
            visitedHistory : {
                timestamp : Date.now() 
            }
        }
    })

    return res.redirect(entry.redirectUrl);
})

app.listen(PORT,()=> console.log(`Server Started at Port : ${PORT} `));