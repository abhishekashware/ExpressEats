const jwt=require("jsonwebtoken");
const bcrypt=require('bcrypt');
const {validationResult}=require('express-validator');
const {APP_SECRET,EXCHANGE_NAME}=require('../config');
const axios=require('axios');
const amqplib=require('amqplib');

module.exports.ValidateSignature = async (req) => {
    try {
      const signature = req.get("Authorization");
      const payload = jwt.verify(signature.split(" ")[1], APP_SECRET);
      req.user = payload;
      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
};

module.exports.ValidatePassword = async (
    enteredPassword,
    savedPassword
) => {
  
  return bcrypt.compareSync(enteredPassword,savedPassword)
};

module.exports.GenerateSalt = async () => {
    return await bcrypt.genSalt();
};
  
module.exports.GeneratePassword = async (password, salt) => {
  return await bcrypt.hash(password, salt);
};

module.exports.FormattedData = (data) => {
  if (data) {
    return { data };
  } else {
    return {};
  }
};

module.exports.GenerateSignature = async (payload) => {
    try {
      return await jwt.sign(payload, APP_SECRET, { expiresIn: "30d" });
    } catch (error) {
      console.log(error);
      return error;
    }
};

module.exports.PublishCustomerEvent= async(payload)=>{
  axios.post('http://localhost:8000/customer/app-events',{
    payload
  })
}

module.exports.PublishShoppingEvent= async(payload)=>{
  axios.post('http://localhost:8000/shopping/app-events',{
    payload
  })
}


module.exports.CreateChannel=async()=>{
  try{
    const connection=await amqplib.connect('amqp://localhost');
    const channel=await connection.createChannel();
    console.log("channel created");
    await channel.assertExchange(EXCHANGE_NAME,'direct',{durable:false});
    return channel;
  }catch(err){
    throw err
  }
}

module.exports.PublishMessage=async(channel,bindingKey,message)=>{
  try{
   channel.publish(EXCHANGE_NAME,bindingKey,Buffer.from(message))
   console.log("published",message);
  }catch(err){
    throw err
  }
}
