const { validationResult } = require("express-validator");
const { ProductService } = require("../../services");

const service=new ProductService();
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
        const {data}=await service.CreateProduct({ name, desc, type, unit,price, available, suplier, banner });
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
        const {data}=await service.GetProductsByCategory(type);
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
        const {data}=await service.GetProductById(productId);
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
        const {data}=await service.GetProductsByIdList(productId);
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
        const product= await service.GetProductById(productId);
        const {data}=await service.AddToCart({_id,product:product.data,qty});
        return res.status(200).json(data);
    }catch(err){
        next(err)
    }
}


module.exports.DeleteFromCart=async(req,res,next)=>{
    const {qty,productId}=req.body;
    const {_id}=req.user;
    
    try{
        const errors=validationResult(req)
    if(!errors.isEmpty()){
        return res.status(400).json({
            errors:errors.array()
        })
    }
        const product= await service.GetProductById(productId);
        const {data}=await service.DeleteFromCart({_id,product:product.data,qty});
        return res.status(200).json(data);
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
        const {data}=await service.GetProducts();
        return res.status(200).json(data); 
    }catch(err){
        next(err)
    }
}