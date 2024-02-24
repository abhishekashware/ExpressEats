const express=require('express');
const {productController}=require('../controllers');
const { ValidateProduct } = require('../validations/ProductValidations');
const UserAuth=require('../middlewares/auth')

const router=express.Router();

router.post('/create',ValidateProduct,productController.CreateProduct);
router.get('/category/:type',productController.SearchProductByCategory);
router.get('/:id',productController.SearchProductById);
router.get('/ids',productController.SearchProductsByIdList);
router.get('/',productController.GetAllProducts);
// add to cart
router.put('/cart',UserAuth,productController.AddToCart);
router.delete('/cart/:id',UserAuth,productController.DeleteFromCart);
router.put('/wishlist',UserAuth,productController.AddToWishList);
router.delete('/wishlist',UserAuth,productController.RemoveFromWishList);


module.exports=router;