const dotEnv=require('dotenv');

// if(process.env.NODE_ENV && process.env.NODE_ENV!=="prod"){
//     const configFile = `../.env.${process.env.NODE_ENV}`;
//     dotEnv.config({ path: configFile });
// }else{
//     dotEnv.config({ path: '../.env' });
// }

// module.exports={
//     PORT:process.env.PORT,
//     DB_URL:process.env.MONGO_URI,
//     APP_SECRET:process.env.APP_SECRET
// };


module.exports={
    PORT:8001,
    DB_URL:'mongodb://localhost:27017/shopping_ms_customer',
    APP_SECRET:'abhishek_node_project',
    CUSTOMER_QUEUE:'CUSTOMER_QUEUE',
    EXCHANGE_NAME:'EXCHANGE_NAME',
    SHOPPING_BINDING_KEY:'SHOPPING_BINDING_KEY',
    CUSTOMER_BINDING_KEY:'CUSTOMER_BINDING_KEY'
};