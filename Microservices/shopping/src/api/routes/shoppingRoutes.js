const express=require('express');
const {shoppingController}=require('../controllers');
const UserAuth=require('../middlewares/auth')

const router=express.Router();

//orders

router.get('/orders',UserAuth,shoppingController.GetOrders);


//place order

router.post('/order',UserAuth,shoppingController.PlaceOrder);


//get cart items

router.get('/cart',UserAuth,shoppingController.GetCartItems);



module.exports=router;