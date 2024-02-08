const express=require('express')
const cors=require('cors')
const app=express()
const proxy=require('express-http-proxy')

const StartServer=()=>{
app.use(cors());
app.use(express.json());

app.use('/customer',proxy('http://localhost:8001'))
app.use('/shopping',proxy('http://localhost:8003'))
app.use('/',proxy('http://localhost:8002')) //products

app.listen(8000,()=>{
    console.log("Gateway is listening to port 8000");
})
}

StartServer()