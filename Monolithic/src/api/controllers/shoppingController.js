const { validationResult } = require("express-validator");
const {ShoppingService,CustomerService} = require("../../services");
const service = new ShoppingService();
const userService = new CustomerService();

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
            const { data } = await userService.GetCartItems(_id);
            return res.status(200).json(data);
        } catch (err) {
            next(err);
        }
}
