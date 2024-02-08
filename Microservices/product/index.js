const express=require('express')
const cors=require('cors')
const app=express()

const StartServer=()=>{
app.use(cors());
app.use(express.json());

app.get('/',(req,res,next)=>{
    res.json("hello product");
})
app.listen(8002,()=>{
    console.log("Gateway is listening to port 8002");
})
}

StartServer()