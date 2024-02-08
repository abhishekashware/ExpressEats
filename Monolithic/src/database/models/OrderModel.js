const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const OrderSchema = new Schema({
  orderId:{type:String,required:true},
  customerId:{type:String,required:true},
  amount:{type:Number,required:true},
  status:{type:String,required:true},
  txnId:{type:String,required:true},
  items: [
    {   
        product: {type: Schema.Types.ObjectId, ref: 'product', required: true} ,
        unit: { type: Number, required: true} 
    }
]
},
{
    toJSON: {
        transform(doc, ret){
            delete ret.__v;
        }
    },
    timestamps: true
});

module.exports =  mongoose.model('order', OrderSchema);