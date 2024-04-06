const ProductService=require('../../services');

module.exports=(app)=>{
const service=new ProductService();
app.use('/app-events',(req,res,next)=>{
    const {payload}=req.body;
    req.service.SubscribeEvents(payload);
    console.log("=============Product Service Received Event ================");
    return res.status(200).json(payload);
})
}