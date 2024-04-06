const {CustomerService}=require('../../services');

module.exports=(app)=>{
app.use('/app-events',(req,res,next)=>{
    const {payload}=req.body;
    req.service.SubscribeEvents(payload);
    console.log("=============Customer Service Received Event ================");
    return res.status(200).json(payload);
})
}