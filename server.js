const dotenv = require('dotenv');
const app = require('./app');
const { makeConnection, closeConnection } = require('./DatabaseConnection');
const { default: mongoose } = require('mongoose');
dotenv.config({ path: './config.env' });
app.listen(process.env.PORT, () => {
  if(makeConnection()){
    console.log('Database connection established successfully');
  }else{
    console.log('Database connection failed');
  }
  console.log(`Express is listening on port ${process.env.PORT}.`);
} );