const { validationResult } = require("express-validator");
const { ProductService } = require("../../services");
const { PublishCustomerEvent, PublishShoppingEvent, PublishMessage, CreateChannel } = require("../../utils");
const {CUSTOMER_BINDING_KEY,SHOPPING_BINDING_KEY}=require('../../config');
//Create Product
module.exports.CreateProduct=async(req,res,next)=>{
    try{
        const { name, desc, type, unit,price, available, suplier, banner }=req.body;
        const errors=validationResult(req)
        if(!errors.isEmpty()){
            return res.status(400).json({
                errors:errors.array()
            })
        }
        const {data}=await req.service.CreateProduct({ name, desc, type, unit,price, available, suplier, banner });
        return res.json(data);
    }catch(err){
        next(err)
    }
}
//Search products of specific Category
module.exports.SearchProductByCategory=async(req,res,next)=>{
    try{
        const type=req.params.type;
        const errors=validationResult(req)
        if(!errors.isEmpty()){
            return res.status(400).json({
                errors:errors.array()
            })
        }
        const {data}=await req.service.GetProductsByCategory(type);
        return res.status(200).json(data);
    }catch(err){
        next(err)
    }
}

//Search Product By Id
module.exports.SearchProductById=async(req,res,next)=>{
    try{
        const productId=req.params.id;
        const errors=validationResult(req)
        if(!errors.isEmpty()){
            return res.status(400).json({
                errors:errors.array()
            })
        }
        const {data}=await req.service.GetProductById(productId);
        return res.status(200).json(data);
    }catch(err){
        next(err)
    }
}


//Search Products By Id List
module.exports.SearchProductsByIdList=async(req,res,next)=>{
    try{
        
        const productId=req.params.id;
        const errors=validationResult(req)
        if(!errors.isEmpty()){
            return res.status(400).json({
                errors:errors.array()
            })
        }
        const {data}=await req.service.GetProductsByIdList(productId);
        return res.status(200).json(data);
    }catch(err){
        next(err)
    }
}

//Cart Details
module.exports.AddToCart=async(req,res,next)=>{
    const {qty,productId}=req.body;
    const {_id}=req.user;
    
    try{
        const errors=validationResult(req)
    if(!errors.isEmpty()){
        return res.status(400).json({
            errors:errors.array()
        })
    }

    const {data}=  await req.service.GetProductPayload(_id,{productId,qty},'ADD_TO_CART')


    if(data.error){
        return res.status(400).json({
            msg:"Invalid product"
        })
     }
    // PublishCustomerEvent(data);
    // PublishShoppingEvent(data);

    PublishMessage(req.rabbitMQChannel,CUSTOMER_BINDING_KEY,JSON.stringify(data));
    PublishMessage(req.rabbitMQChannel,SHOPPING_BINDING_KEY,JSON.stringify(data));

    return res.status(200).json({
        "msg":"Added Successfully"
    })

    }catch(err){
        next(err)
    }
}


module.exports.DeleteFromCart=async(req,res,next)=>{
    const {productId}=req.params;
    const {_id}=req.user;
    
    try{
        const errors=validationResult(req)
        if(!errors.isEmpty()){
            return res.status(400).json({
                errors:errors.array()
            })
        }

        const {data}= req.service.GetProductPayload(_id,{productId},'REMOVE_FROM_CART')
        if(data.error){
            return res.status(400).json({
                msg:"Invalid product"
            })
        }
        // PublishCustomerEvent(data);
        // PublishShoppingEvent(data);

        PublishMessage(req.rabbitMQChannel,CUSTOMER_BINDING_KEY,JSON.stringify(data));
        PublishMessage(req.rabbitMQChannel,SHOPPING_BINDING_KEY,JSON.stringify(data));
    
        return res.status(200).json({
            "msg":"Removed Successfully"
        })
    
    }catch(err){
        next(err)
    }
}


//get all products
module.exports.GetAllProducts=async(req,res,next)=>{
    try{
        const errors=validationResult(req)
        if(!errors.isEmpty()){
            return res.status(400).json({
                errors:errors.array()
            })
        }
        const {data}=await req.service.GetProducts();
        return res.status(200).json(data); 
    }catch(err){
        next(err)
    }
}

module.exports.AddToWishList=async(req,res,next)=>{
    try{

        const {_id}=req.user;
        const {data}=  await req.service.GetProductPayload(_id,{productId:req.body._id},'ADD_TO_WISHLIST')


        if(data.error){
            return res.status(400).json({
                msg:"Invalid product"
            })
        }
        // PublishCustomerEvent(data);
        PublishMessage(req.rabbitMQChannel,CUSTOMER_BINDING_KEY,JSON.stringify(data));

        return res.status(200).json({
            "msg":"Added Successfully"
        })
    }catch(err){
        next(err)
    }
}

module.exports.RemoveFromWishList=async(req,res,next)=>{
    try{
        const {_id}=req.user;
        const {productId}=req.params.id;
        const {data}=await req.service.GetProductPayload(_id,{productId},'REMOVE_FROM_WISHLIST')
        if(data.error){
            return res.json(400).json({
                msg:"Can't remove"
            })
        }
        // PublishCustomerEvent(data);
        PublishMessage(req.rabbitMQChannel,CUSTOMER_BINDING_KEY,JSON.stringify(data));

        return res.status(200).json({
            msg:"Removed Successfully"
        })
    }catch(err){
        next(err)
    }
}