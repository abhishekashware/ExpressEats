const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const ProductSchema = new Schema({
    name: {type:String,required:true,unique:true},
    desc: {type:String,required:true},
    banner: {type:String,required:true},
    type: {type:String,required:true},
    unit: {type:Number,required:true},
    price: {type:Number,required:true},
    available: {type:Boolean,required:true},
    suplier: {type:String,required:true}
});

module.exports =  mongoose.model('product', ProductSchema);