const express=require('express');
const app=express();
const {PORT}=require('./config')
const expressApp=require('./express-app');
const dataBaseConnection=require('./database/connection');
const StartServer=async()=>{
    await dataBaseConnection()
    await expressApp(app);
    app.listen(PORT||3000,()=>{
        console.log(`listening to the port ${PORT}`);
    }).on('error',(err)=>{
        console.log(err);
        process.exit();
    })


}

StartServer()