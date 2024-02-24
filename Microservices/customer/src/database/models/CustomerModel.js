const mongoose = require('mongoose');
const { APIError } = require('../../utils/app-errors');
const Schema=mongoose.Schema;

const schema=new Schema({
email:{
    type:String,
    required:true
},
password:String,
salt: String,
phone: String,
address:[
    { type: Schema.Types.ObjectId, ref: 'address', required: true }
],
cart: [
    {
      product: { 
        _id:{type:String,required:true},
        banner:{type:String},
        name:{type:String},
        price:{type:Number}
      },
      unit: { type: Number, required: true}
    }
],
wishlist:[
    { 
        _id:{type:String,required:true},
        banner:{type:String},
        name:{type:String},
        description:{type:String},
        available:{type:String},
        price:{type:Number}
    }
],
orders: [ 
    { 
        _id:{type:String,required:true},
        amount:{type:String},
        date:{type:Date,default:Date.now()}
    }
]
},{
    toJSON: {
        transform(doc, ret){
            delete ret.password;
            delete ret.salt;
            delete ret.__v;
        }
    },
    timestamps: true
});

const CustomerModel=mongoose.model('customer',schema);

module.exports=CustomerModel;