const jwt=require("jsonwebtoken");
const bcrypt=require('bcrypt');
const {validationResult}=require('express-validator');
const {APP_SECRET}=require('../config');

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

