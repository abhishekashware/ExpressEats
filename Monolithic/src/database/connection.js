const mongoose = require('mongoose');
const { DB_URL } = require('../config');

module.exports = async() => {
    try{
        await mongoose.connect(DB_URL);
        console.log('DB Connected');
    }catch(err){
        console.log(err);
        process.exit(1);
    }
 
};
