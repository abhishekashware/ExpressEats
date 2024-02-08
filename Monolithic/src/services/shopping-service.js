const { ShoppingRepository } = require("../database/repository");
const { FormattedData } = require("../utils");
const { APIError } = require('../utils/app-errors');

class ShoppingService{
    constructor(){
        this.repository=new ShoppingRepository();
    }

    async PlaceOrder(userInput){
        const {_id,txnNumber}=userInput;
        try{
            
            const orderResult=await this.repository.CreateNewOrder(_id,txnNumber);
            return FormattedData(orderResult);
        }catch(err){
            throw new APIError('Data Not Found',err);
        }
    }

    async GetOrders(_id){
        try{
            
            const orderResult=await this.repository.GetOrders(_id);
            return FormattedData(orderResult);
        }catch(err){
            throw new APIError('Data Not Found',err);
        }
    }
}

module.exports=ShoppingService;