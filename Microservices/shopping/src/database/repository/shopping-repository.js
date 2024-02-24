const { CustomerModel, OrderModel,CartModel } = require('../models');
const { v4: uuidv4 } = require('uuid');
const { APIError, BadRequestError,STATUS_CODES } = require('../../utils/app-errors')


//Dealing with data base operations
class ShoppingRepository {

    // payment

    async GetOrders(customerId){
        try{
            const orders = await OrderModel.find({customerId});   
            return orders;
        }catch(err){
            throw new APIError('API Error', STATUS_CODES.INTERNAL_ERROR, err.message)
        }
    }

    async Cart(customerId){
        try{
        const cartItems=await CartModel.find({
            customerId
        })
        if(cartItems){
            return cartItems;
        }
        return {
            msg:"No Data Found"
        }
    }catch(err){
        throw new APIError('API Error',STATUS_CODES.INTERNAL_ERROR,err.message);
    }
    }
 

    async AddCartItem(customerId,item,qty,IsRemove){
        try{
            const cart = await CartModel.findById({customerId});
            // const {_id}=item;
            if(cart){
    
                 let cartItems=cart.items;
                
                 let isExist=false;

                 
                if(cartItems.length>0){
                  
                                   
                    cartItems.map((item)=>{
    
                        if(item.product._id.toString()===product._id.toString()){
                            item.unit=qty;
                            isExist=true;
                        }
                    })
                   
                }

                if(!isExist && !IsRemove){
                    cartItems.push({product:{...item},unit:qty});
                }

                cart.items=cartItems;
                return await cart.save();
            }
    
            return {"msg":"unable to add item to cart"}
        }
        catch(err){
            throw new APIError(
                "API Error",
                STATUS_CODES.INTERNAL_ERROR,
                err.message
              );
        }
    }

 
    async CreateNewOrder(customerId, txnId){

        //check transaction for payment Status
        try{
            const cart = await CartModel.findById({customerId});
    
            if(cart){
                
                let amount = 0;   
    
                let cartItems = cart.items;
    
                if(cartItems.length > 0){
                    //process Order
                    cartItems.map(item => {
                        amount += parseInt(item.product.price) *  parseInt(item.unit);   
                    });
        
                    const orderId = uuidv4();
        
                    const order = new OrderModel({
                        orderId,
                        customerId,
                        amount,
                        txnId,
                        status: 'received',
                        items: cartItems
                    })
        
                    cart.items = [];
                    const orderResult = await order.save();
                   
    
                    await cart.save();
    
                    return orderResult;
                }else{
                    return {
                        "msg":"Cart has no items to order"
                      }
                }
            }else{
          return {
            "msg":"Unable to find Customer"
          }
        }
        }catch(err){
            throw new APIError('API Error', STATUS_CODES.INTERNAL_ERROR, err.message)
        }
        

    }
}

module.exports = ShoppingRepository;