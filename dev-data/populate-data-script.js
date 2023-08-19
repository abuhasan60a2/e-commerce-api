const fs = require("fs");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const Products = require("../models/Products");
dotenv.config({ path: "../config.env" });
const db_url = process.env.MONGO_URI.replace(
    "<password>",
    process.env.DATABASE_PASSWORD
  );
mongoose.connect(db_url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  console.log("Database connection established successfully");
const products = JSON.parse(fs.readFileSync(`${__dirname}/products.json`, "utf-8"));
const importdata = async ()=>{
    try{
        const newProducts = await Products.create(products);
        console.log(newProducts);
        console.log("Data successfully loaded");
        
    }
    catch(err){
        console.log(err);
    }
    process.exit();

 }
const deleteAlldata = async () =>{
    try{
        await Products.deleteMany();
        console.log("Data successfully deleted");
       

    }
    catch(err){
        console.log(err.message);
    }
    process.exit();
}
console.log(process.argv[2])
if(process.argv[2] === '--import'){
    importdata();
}
else if(process.argv[2]=== '--delete'){
    deleteAlldata();
}
 
