const express=require('express')
const cors=require('cors')
const app=express()

const StartServer=()=>{
app.use(cors());
app.use(express.json());

app.get('/',(req,res,next)=>{
    res.json("hello shopping");
})
app.listen(8003,()=>{
    console.log("Gateway is listening to port 8003");
})
}

StartServer()