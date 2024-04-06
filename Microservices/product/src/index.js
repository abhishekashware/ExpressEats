const express=require('express');
const app=express();
const {PORT}=require('./config')
const expressApp=require('./express-app');
const dataBaseConnection=require('./database/connection');
const { CreateChannel } = require('./utils');
const { ProductService } = require('./services');
const StartServer=async()=>{
    await dataBaseConnection()
    const channel=await CreateChannel();
    const service=new ProductService();
    await expressApp(app,channel,service);
    app.listen(PORT||3000,()=>{
        console.log(`product server started at ${PORT}`);

    }).on('error',(err)=>{
        console.log(err);
        process.exit();
    })


}

StartServer()