const express=require('express');
const app=express();
const {PORT, CUSTOMER_BINDING_KEY}=require('./config')
const expressApp=require('./express-app');
const dataBaseConnection=require('./database/connection');
const { CreateChannel, SubscribeMessage } = require('./utils');
const { CustomerService } = require('./services');
const StartServer=async()=>{
    await dataBaseConnection()
    const channel=await CreateChannel();
    const service=new CustomerService();
    await expressApp(app,channel,service);
    SubscribeMessage(channel,service,CUSTOMER_BINDING_KEY);
    app.listen(PORT||3000,()=>{
        console.log(`customer server started at ${PORT}`);
    }).on('error',(err)=>{
        console.log(err);
        process.exit();
    })


}

StartServer()