const { validationResult } = require('express-validator');
const {CustomerService}=require('../../services');
const { SubscribeMessage } = require('../../utils');
//SignUp
module.exports.SignUp=async(req,res,next)=>{
    try{
        const {email,password,phone}=req.body;
        const errors=validationResult(req)
        if(!errors.isEmpty()){
            return res.status(401).json({
                errors:errors.array()
            })
        }
        const {data}=await req.service.SignUp({email,password,phone});
        return res.json(data);
    }catch(err){
        next(err)
    }
}
//LogIn
module.exports.SignIn=async(req,res,next)=>{
    try{
        const {email,password}=req.body;
        const errors=validationResult(req)
        if(!errors.isEmpty()){
            return res.status(401).json({
                errors:errors.array()
            })
        }
        const {data}=await req.service.SignIn({email,password});
        return res.json(data);
    }catch(err){
        next(err)
    }
}

//Address
module.exports.AddAddress=async(req,res,next)=>{
    try{
        const {_id}=req.user;
        const {street,postalcode,city,country}=req.body;
        const errors=validationResult(req)
        if(!errors.isEmpty()){
            return res.status(401).json({
                errors:errors.array()
            })
        }
        const {data}=await req.service.AddAddress({_id,street,postalcode,city,country});
        return res.json(data);
    }catch(err){
        next(err)
    }
}

//get Profile
module.exports.GetProfile=async(req,res,next)=>{
    try{
        const {_id}=req.user;
        const errors=validationResult(req)
        if(!errors.isEmpty()){
            return res.status(401).json({
                errors:errors.array()
            })
        }
        const {data}=await req.service.GetProfile({_id});
        return res.json(data);
    }catch(err){
        next(err)
    }
}

//get Profile
module.exports.GetWishlist=async(req,res,next)=>{
    try{
        const {_id}=req.user;
        const errors=validationResult(req)
        if(!errors.isEmpty()){
            return res.status(401).json({
                errors:errors.array()
            })
        }
        const {data}=await req.service.GetWishlist({_id});
        return res.json(data);
    }catch(err){
        next(err)
    }
}