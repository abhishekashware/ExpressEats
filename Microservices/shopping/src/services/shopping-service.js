const { OrderModel } = require("../database/models");
const { ShoppingRepository } = require("../database/repository");
const { FormattedData } = require("../utils");
const { APIError } = require('../utils/app-errors');

class ShoppingService{
    constructor(){
        this.repository=new ShoppingRepository();
    }


    async GetCart({_id}){
        try{
            const cartItems=await this.repository.Cart(_id);
            return FormattedData(cartItems);
        }catch(err){
            throw new APIError('Data not found',err);
        }
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

    async FindById(id) {
        try {
          return await OrderModel.findById(id);
        } catch (err) {
          throw new APIError(
            "API Error",
            STATUS_CODES.INTERNAL_ERROR,
            "Unable to Find Product"
          );
        }
      }

    async GetOrderPayload(userId,{orderId,amt},event){
        const order=await this.repository.FindById(orderId);
        if(order){
            const payload={
                event,
                data:{userId,orderId,amt}
            }
            return FormattedData(payload)
        }else{
            return FormattedData({error:"No product Available"})
        }
    }

    async ManageCart(customerId,item,qty,isRemove){
        try{
            const cartResult=await this.repository.AddCartItem(customerId,item,qty,isRemove);
            return FormattedData(cartResult);
        }catch(err){
            throw err;
        }
    }


    async SubscribeEvents(payload){
        const {event,data}=payload;
        const {userId,orderId,amt}=data;
        switch(event){
            case 'Add_TO_CART':
                this.ManageCart(userId,{_id:orderId,amt},qty,false);
                break;
            case 'REMOVE_FROM_CART':
                    this.ManageCart(userId,{_id:orderId,amt},qty,true);
                    break;
            default:break;
        }
    }
}

module.exports=ShoppingService;