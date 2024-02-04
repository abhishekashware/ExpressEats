const { ProductModel, CustomerModel } = require("../models");
const { APIError, BadRequestError,STATUS_CODES } = require("../../utils/app-errors");

//Dealing with data base operations
class ProductRepository {
  async CreateProduct({
    name,
    desc,
    type,
    unit,
    price,
    available,
    suplier,
    banner,
  }) {
    try {
      const product = new ProductModel({
        name,
        desc,
        type,
        unit,
        price,
        available,
        suplier,
        banner,
      });

      const productResult = await product.save();
      return productResult;
    } catch (err) {
      throw new APIError(
        "API Error",
        STATUS_CODES.INTERNAL_ERROR,
        "Unable to Create Product"
      );
    }
  }

  async Products() {
    try {
      return await ProductModel.find();
    } catch (err) {
      throw new APIError(
        "API Error",
        STATUS_CODES.INTERNAL_ERROR,
        "Unable to Get Products"
      );
    }
  }

  async FindById(id) {
    try {
      return await ProductModel.findById(id);
    } catch (err) {
      throw new APIError(
        "API Error",
        STATUS_CODES.INTERNAL_ERROR,
        "Unable to Find Product"
      );
    }
  }

  async FindByCategory(category) {
    try {
      const products = await ProductModel.find({ type: category });
      return products;
    } catch (err) {
      throw new APIError(
        "API Error",
        STATUS_CODES.INTERNAL_ERROR,
        "Unable to Find Category"
      );
    }
  }

  async FindSelectedProducts(selectedIds) {
    try {
      const products = await ProductModel.find()
        .where("_id")
        .in(selectedIds.map((_id) => _id))
        .exec();
      return products;
    } catch (err) {
      throw new APIError(
        "API Error",
        STATUS_CODES.INTERNAL_ERROR,
        "Unable to Find Product"
      );
    }
  }

  async AddToCart(customerId,product,qty){
    try{
        const profile = await CustomerModel.findById(customerId)
        .populate('cart.product');
        if(profile){
            const cartItem={
                product:product,
                unit:qty
            };

            let cartItems=profile.cart;
            
            if(cartItems.length>0){
              
                let isExist=false;
                               
                cartItems.map((item)=>{

                    if(item.product._id.toString()===product._id.toString()){
                        item.unit=qty;
                        isExist=true;
                    }
                })
                if(!isExist){
                    cartItems.push(cartItem);
                }
            }else{
                cartItems.push(cartItem);
            }

            profile.cart=cartItems;
   
            const cartSaveResult=await profile.save();
  
            return cartSaveResult.cart;
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


async DeleteFromCart(customerId,product,qty){
  try{
      const profile = await CustomerModel.findById(customerId)
      .populate('cart.product');

      if(profile){
          let cartItems=profile.cart;
          
          if(cartItems.length>0){
            cartItems.map((item)=>{
                  if(item.product._id.toString()===product._id.toString()){
                      
                        if(qty>=item.unit){
                        cartItems.splice(cartItems.indexOf(item),1);
                        console.log(cartItems);
                        }else{
                          item.unit=item.unit-qty;
                        }
                      
                  }
                  
              })

          }

          profile.cart=cartItems;
          const cartSaveResult=await profile.save();

          return cartSaveResult.cart;
      }

      return {"msg":"unable to delete item to cart"}
  }
  catch(err){
      throw new APIError(
          "API Error",
          STATUS_CODES.INTERNAL_ERROR,
          "Unable to Create Customer"
        );
  }
}

}

module.exports = ProductRepository;