const express=require('express');
const cors=require('cors');
const { customerRoutes } = require('./api/routes');
const HandleErrors = require('./utils/error-handler');
const { appEvents } = require('./api/controllers');
const { SubscribeMessage } = require('./utils');
const expressApp=async(app,channel,service)=>{
    //middlewares
app.use(express.json({limit:'1mb'}));
app.use(express.urlencoded({extended:true,limit:'1mb'}));
app.use(cors());
app.use(express.static(__dirname+'/public'));



//appEvents(app)
app.use(async(req,res,next)=>{
    try {
        req.rabbitMQChannel = channel;
        next();
    } catch (err) {
        next(err);
    }
});

app.use(async(req,res,next)=>{
    try {
        req.service = service;
        next();
    } catch (err) {
        next(err);
    }
});

//APIs
app.use('/',customerRoutes);


app.use((req,res,next)=>{
    return res.status(404).json({
        message:"Invalid Request"
    })
})

app.use(HandleErrors);
}
module.exports=expressApp;