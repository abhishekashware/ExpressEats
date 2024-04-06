const {CustomerRepository}=require('../database/repository');
const { FormattedData, ValidatePassword, GenerateSalt, GeneratePassword, GenerateSignature } = require('../utils');
const { APIError } = require('../utils/app-errors');
class CustomerService{
    constructor(){
        this.repository=new CustomerRepository();
    }
    async SignIn(userInputs){
        const {email,password}=userInputs;
        try{
            const existingCustomer=await this.repository.FindCustomerByEmail({email});
            if(existingCustomer){
                const validPassword=await ValidatePassword(password,existingCustomer.password);
                if(validPassword){
                const token=await GenerateSignature({email:existingCustomer.email,_id:existingCustomer._id})
                    return FormattedData({id:existingCustomer._id,token});
                }
                return FormattedData({
                    errors:[
                        {
                            msg:"Invalid Password!!"
                        }
                    ]
                })
            }
            return FormattedData({
                errors:[
                    {
                        msg:"User doesn't exist with this email"
                    }
                ]
            });

        }catch(err){
            throw new APIError('Data Not Found',err);
        }

    }

    async SignUp(userInputs){
        const {email,password,phone}=userInputs;
        try{
            //create salt
            let salt=await GenerateSalt();

            let userPassword=await GeneratePassword(password,salt);
            const existingCustomer=await this.repository.FindCustomerByEmail({email});
            if(existingCustomer){   
                return FormattedData({
                    errors:[{msg:"user already exists"}]
                });
            }
            const newCustomer=await this.repository.CreateCustomer({email,password:userPassword,phone});
            const token=await GenerateSignature({email:email,_id:newCustomer._id});
            return FormattedData({id:newCustomer._id,token})

        }catch(err){
            throw new APIError(err.message,err);
        }

    }

    async AddAddress(userInputs){
        const {_id,street,postalCode,city,country}=userInputs;
        try{
            const data=await this.repository.AddAddress({_id,street,postalCode,city,country});
            return FormattedData(data);
        }catch(err){
            throw new APIError('Data Not Found',err);
        }

    }

    async GetProfile({_id}){
        try{
            const result=await this.repository.FindCustomerById(_id);
            return FormattedData(result);
        }catch(err){
            throw new APIError('Data not found',err);
        }
    }


    async GetWishlist(id){
        try{
            const list=await this.repository.GetWishlistById(id);
            return FormattedData(list);
        }catch(err){
            throw new APIError('Data not found',err);
        }
    }

    async GetCartItems(_id){
        try{
            const data= await this.repository.GetCartItems(_id);
            return FormattedData(data);
        }catch(err){
            throw new APIError(err.message,err);
        }
    }


    async ManageCart(_id,product,qty,IsRemove){
        try{
            const data= await this.repository.AddCartItem(_id,product,qty,IsRemove);
            return FormattedData(data);
        }catch(err){
            throw new APIError(err.message,err);
        }
    }

    async ManageOrder(_id,order){
        try{
            const data= await this.repository.AddOrderToProfile(_id,order);
            return FormattedData(data);
        }catch(err){
            throw new APIError(err.message,err);
        }
    }


    async SubscribeEvents(payload){
        const {event,data}=payload;
        const {userId,product,order,qty}=data;
        switch(event){
            case 'ADD_TO_WISHLIST':
                break;
            case 'REMOVE_FROM_WISHLIST':
                // this.AddToWishlist(userid,product)
                break;
            case 'ADD_TO_CART':
                this.ManageCart(userId,product,qty,false);
                
                break;
            case 'REMOVE_FROM_CART':
                    this.ManageCart(userId,product,qty,true);
                    break;
            case 'CREATE_ORDER':
                this.ManageOrder(
                    userId,order
                )
                break;
            default:break;
        }
    }
}


module.exports=CustomerService;