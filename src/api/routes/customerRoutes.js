const express=require('express');
const {customerController}=require('../controllers');
const router=express.Router();
const UserAuth=require('../middlewares/auth');
const { ValidateLogin, ValidateSignUp, ValidateAddress } = require('../validations/CustomerValidatons');

router.post('/signup',ValidateSignUp,customerController.SignUp);
router.post('/login',ValidateLogin,customerController.SignIn);
router.post('/address',ValidateAddress,UserAuth,customerController.AddAddress);
router.get('/profile',UserAuth,customerController.GetProfile);
router.get('/wishlist',UserAuth,customerController.GetWishlist);

module.exports=router;