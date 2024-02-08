const {body,check,validationResult} = require('express-validator');

module.exports={
    ValidateProduct: [
        body('name').notEmpty().withMessage("name is Required"),
        body('desc').notEmpty().withMessage("description is required"),
        body('type').notEmpty().withMessage("type is required")
         ]  
}