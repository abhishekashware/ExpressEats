const {body,check,validationResult} = require('express-validator');

module.exports={
    ValidateLogin: [
        body('email').notEmpty().withMessage("Email is Required").bail().isEmail().withMessage("Enter a valid E-mail"),
        body('password').notEmpty().withMessage("Password is required")
         ],
    ValidateSignUp: [
       body('email').notEmpty().withMessage("Email is Required").bail().isEmail().withMessage("Enter a valid E-mail"),
       body('password').notEmpty().withMessage("Password is required")
        ],
        ValidateAddress:[
            body('street').notEmpty().withMessage("Street is Required"),
            body('postalcode').notEmpty().withMessage("PostalCode is required").bail().isLength({min:6,max:6}).withMessage("PostalCode should be of 6 digits"),
            body('city').notEmpty().withMessage("city is required"),
            body('country').notEmpty().withMessage("country is required")

        ]
}