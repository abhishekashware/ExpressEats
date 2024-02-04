const { APIError, STATUS_CODES } = require('../../utils/app-errors');
const {CustomerModel, AddressModel} =require('../models')
class CustomerRepository{

    async CreateCustomer({email,password,phone,salt}){
        try{
            const customer=new CustomerModel({
                email,
                password,
                phone,
                salt,
                address:[]
            });

            const customerResult=await customer.save();
            return customerResult;

        }catch(err){
            throw new APIError('API Error',
            STATUS_CODES.INTERNAL_ERROR,
            "Unable to Create Customer"        
            );
        }
    }


    async AddAddress({_id,street,postalCode,city,country}){
        try{
            const profile = await CustomerModel.findById(_id);
            if(profile){
                const newAddress=new AddressModel({
                    street,
                    postalCode,
                    city,
                    country
                });
                await newAddress.save();
                profile.address.push(newAddress);
                return await profile.save();
            }else{
                return {
                    "msg":"Customer doesn't exist"
                }
            }
        }
        catch(err){
            throw new APIError("API Error",STATUS_CODES.INTERNAL_ERROR,"Error on Create Address")
        }
    }

    async FindCustomer({email}){
        try{
            const existingCustomer=await CustomerModel.findOne({
                email
            });
            return existingCustomer;
        }
        catch(err){
            throw new APIError("API Error",STATUS_CODES.INTERNAL_ERROR,"Unable to Find Customer");
        }
    }

    async FindCustomerById(
        _id
    ){
        try{

            const existingCustomer=await CustomerModel.findById(_id)
            .populate('address')
            .populate('wishlist')
            .populate('orders')
            .populate('cart.product');
   
            return existingCustomer;

        }
        catch(err){
            throw new APIError(
                "API Error",
                STATUS_CODES.INTERNAL_ERROR,
                err.message
              );
        }
    }

    


    async GetWishlistById(id){
        try{
            
            const existingCustomer=await CustomerModel.findById(id)
            .populate('wishlist');
            return existingCustomer.wishlist;

        }
        catch(err){
            throw new APIError(
                "API Error",
                STATUS_CODES.INTERNAL_ERROR,
                err.message
              );
        }
    }


    async GetCartItems(_id){
        try{
            const customer=await CustomerModel.findById(_id);
            return customer.cart;
        }catch(err){
            throw new APIError(
                "API Error",
                STATUS_CODES.INTERNAL_ERROR,
                err.message
            )
        }
    }
}

module.exports=CustomerRepository;