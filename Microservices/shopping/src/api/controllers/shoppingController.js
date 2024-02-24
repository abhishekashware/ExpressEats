const { validationResult } = require("express-validator");
const {ShoppingService} = require("../../services");
const { PublishCustomerEvent } = require("../../../../product/src/utils");
const service = new ShoppingService();

module.exports.PlaceOrder=async (req,res,next) => {
    const { _id } = req.user;
    const { txnNumber } = req.body;
    try {
        const errors=validationResult(req)
        if(!errors.isEmpty()){
            return res.status(400).json({
                errors:errors.array()
            })
        }
        const { data } = await service.PlaceOrder({_id, txnNumber});
        const payloadData= await service.GetOrderPayload(_id,{orderId:data.orderId,amt:data.amt},'CREATE_ORDER');
        if(payloadData.data.error){
            return res.status(400).json({
                msg:"Failed to place order"
            })
        }
        PublishCustomerEvent(payloadData.data);
        return res.status(200).json(data);
        
    } catch (err) {
        next(err)
    }
}

module.exports.GetOrders=async (req,res,next) => {

        const { _id } = req.user;

        try {
            const errors=validationResult(req)
            if(!errors.isEmpty()){
                return res.status(400).json({
                    errors:errors.array()
                })
            }
            const { data } = await service.GetOrders(_id);
            return res.status(200).json(data);
        } catch (err) {
            next(err);
        }

}
       
    
module.exports.GetCartItems=async (req,res,next) => {

        const { _id } = req.user;
        try {
            const errors=validationResult(req)
            if(!errors.isEmpty()){
                return res.status(400).json({
                    errors:errors.array()
                })
            }
            const { data } = await service.GetCart({_id});
            return res.status(200).json(data);
        } catch (err) {
            next(err);
        }
}
