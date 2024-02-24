const { ProductRepository } = require("../database/repository");
const { FormattedData } = require("../utils");
const { APIError } = require('../utils/app-errors');

// All Business logic will be here
class ProductService {

    constructor(){
        this.repository = new ProductRepository();
    }

    async CreateProduct(productInputs){
        try{
            const productResult = await this.repository.CreateProduct(productInputs)
            return FormattedData(productResult);
        }catch(err){
            throw new APIError(err.message)
        }
    }
    
    async GetProducts(){
        try{
            const products = await this.repository.Products();
    
            let categories = {};
    
            products.map(({ type }) => {
                categories[type] = type;
            });
            
            return FormattedData({
                products,
                categories:  Object.keys(categories) ,
            })

        }catch(err){
            throw new APIError(err.message)
        }
    }


    async GetProductDescription(productId){
        try {
            const product = await this.repository.FindById(productId);
            return FormattedData(product)
        } catch (err) {
            throw new APIError(err.message)
        }
    }

    async GetProductsByCategory(category){
        try {
            const products = await this.repository.FindByCategory(category);
            return FormattedData(products)
        } catch (err) {
            throw new APIError(err.message)
        }

    }

    async GetSelectedProducts(selectedIds){
        try {
            const products = await this.repository.FindSelectedProducts(selectedIds);
            return FormattedData(products);
        } catch (err) {
            throw new APIError(err.message)
        }
    }

    async GetProductById(productId){
        try {
            const data=await this.repository.FindById(productId);
            return FormattedData(data);
        } catch (err) {
            throw new APIError(err.message)
        }
    }


    async AddToCart({_id,product,qty}){
        try{
            const data=await this.repository.AddToCart(_id,product,qty);
            return FormattedData(data);
        }catch(err){
            throw new APIError(err.message,err);
        }
    }


    async DeleteFromCart({_id,product,qty}){
        try{
            const data=await this.repository.DeleteFromCart(_id,product,qty);
            return FormattedData(data);
        }catch(err){
            throw new APIError(err.message,err);
        }
    }


    async GetProductPayload(userId,{productId,qty},event){
        const product=await this.repository.FindById(productId);
        if(product){
            const payload={
                event,
                data:{userId,product,qty}
            }
            return FormattedData(payload)
        }else{
            return FormattedData({error:"No product Available"})
        }
    }
     
}

module.exports = ProductService;