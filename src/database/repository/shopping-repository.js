const { CustomerModel, ProductModel, OrderModel } = require('../models');
const { v4: uuidv4 } = require('uuid');
const { APIError, BadRequestError,STATUS_CODES } = require('../../utils/app-errors')


//Dealing with data base operations
class ShoppingRepository {

    // payment

    async GetOrders(customerId){
        try{
            const orders = await OrderModel.find({customerId}).populate('items.product');        
            return orders;
        }catch(err){
            throw new APIError('API Error', STATUS_CODES.INTERNAL_ERROR, err.message)
        }
    }
 
 
    async CreateNewOrder(customerId, txnId){

        //check transaction for payment Status
        try{
            const profile = await CustomerModel.findById(customerId).populate('cart.product');
    
            if(profile){
                
                let amount = 0;   
    
                let cartItems = profile.cart;
    
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
        
                    profile.cart = [];
                    
                    await order.populate('items.product');
                    const orderResult = await order.save();
                   
                    profile.orders.push(orderResult);
    
                    await profile.save();
    
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